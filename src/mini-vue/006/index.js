/*
    实现目标
*   1.让Vue只能通过new创建
*   2.需要能接收2个关键参数 (data,el)

    3.实现一个 observe 函数，确保可以对 data 进行拦截，可以在get、set时做一些事情
    4.在字段被更新后，实现发布-订阅者模式，通知变更。
* **/

class Vue {

    constructor(options) {
        this.init(options)
    }

    init(options) {
        this.$options = options
        this.$el = document.querySelector(options.el)
        this.initData()
        console.log(this)
    }

    initData() {
        this.$data = this.$options.data || {};
        observe(this.$data)
        for (const key in this.$data) {
            proxy(this, '$data', key)
        }
    }

    $watch(expOrFn, cb) {
        const watcher = new Watcher(this, expOrFn, cb);
    }

}


function observe(data) {
    if (!isObject(data)) {
        return;
    }
    return new Observer(data);
}

function isObject(obj) {
    return obj !== null && typeof obj === 'object'
}

function isArray(data) {
    return Array.isArray(data)
}

class Observer {

    constructor(data) {
        this.value = data;

        if (isArray(data)) {
            this.observeArray(data);
        } else {
            this.walk(data);
        }
    }

    walk(obj) {
        for (const key in obj) {
            defineReactive(obj, key)
        }
    }

    observeArray(items) {
        items.forEach((item) => {
            observe(item);
        })
    }
}

function defineReactive(data, key) {
    const dep = new Dep()
    let value = data[key];
    let ob = observe(data[key]); // 解决值为对象时，无法监听对象变化的问题

    Reflect.defineProperty(data, key, {
        get() {
            // 这里通过 `读一下` 建立字段发布者和订阅者们的关联关系
            if (Dep.target) {
                dep.addSub(Dep.target)
            }
            return value;
        },
        set(newValue) {
            if (newValue === value) {
                return
            }
            console.log(`old value: [${value}], new value: [${newValue}]`)
            value = newValue;
            ob = observe(newValue)   // 解决设置新对象时，无法监听变化的问题
            dep.notify()
        }
    })
}

/***************************************/
class Dep {
    static target;

    constructor() {
        this.subs = new Set();
    }

    addSub(sub) {
        this.subs.add(sub)
    }

    notify() {
        this.subs.forEach((sub) => {
            sub.update();
        })
    }

}

var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));

/**
 *
 *  根据以 '.' 分隔的字符串路径，从对象中获取值。和 dojo 中的 lang.getObject 作用一致
 *
 *  parsePath('a.b')({
 *    a:{
 *      b:'hello'
 *    }
 *  })  // 'hello'
 *  1.检查是否包含特殊字符，包含特殊字符就不处理
 *  2.根据 . 符号分割获取对象的路径
 *  3.提供对象获取值
 *
 */
function parsePath(path) {
    if (bailRE.test(path)) {
        return
    }
    var segments = path.split('.');
    return function (obj) {
        for (var i = 0; i < segments.length; i++) {
            if (!obj) {
                return
            }
            obj = obj[segments[i]];
        }
        return obj
    }
}

class Watcher {
    constructor(vm, expOrFn, cb) {
        this.vm = vm;
        this.cb = cb;
        this.expression = expOrFn.toString();
        this.getter = typeof expOrFn === 'function' ? expOrFn : parsePath(expOrFn);
        this.value = this.get();
    }

    get() {
        const vm = this.vm;
        // 这里让 watcher 和 defineReactive 的字段建立关系。 1个field => 1个dep实例 => 多个watcher实例
        Dep.target = this;
        const value = this.getter.call(vm, vm)
        Dep.target = null;
        return value;
    }

    update() {
        this.run();
    }

    run() {
        const value = this.get();
        // 执行更新后，检查值是否发生改变，如果发生改变，那么触发回调事件
        if (value !== this.value) {
            const oldValue = this.value;
            this.value = value;

            // 执行 $watch 对应的回调
            this.cb.call(this, value, oldValue)
        }

    }

}

/***********************/
const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: () => {
    },
    set: () => {
    }
};

function proxy(target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter() {
        return this[sourceKey][key]
    };
    sharedPropertyDefinition.set = function proxySetter(val) {
        this[sourceKey][key] = val;
    };
    Object.defineProperty(target, key, sharedPropertyDefinition);
}
