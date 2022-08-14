/*
    实现目标
*   1.让Vue只能通过new创建
*   2.需要能接收2个关键参数 (data,el)

     3.实现一个 observe 函数，确保可以对 data 进行拦截，可以在get、set时做一些事情
* **/

class Vue {

    constructor(options) {
        this.init(options)
    }

    init(options) {
        this.$options = options
        this.$el = document.querySelector(options.el)
        this.$data = options.data;

        observe(this.$data)
        console.log(this)
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
    let value = data[key];
    observe(data[key]); // 解决值为对象时，无法监听对象变化的问题
    Reflect.defineProperty(data, key, {
        get() {
            return value;
        },
        set(newValue) {
            if (newValue === value) {
                return
            }
            console.log(`old value: [${value}], new value: [${newValue}]`)
            value = newValue;
            observe(newValue)   // 解决设置新对象时，无法监听变化的问题
        }
    })
}
