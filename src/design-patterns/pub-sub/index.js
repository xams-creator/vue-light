/**
 *  发布订阅模式
 *  描述： 发布订阅模式属于广义上的观察者模式，从解耦和重用角度来看，优于典型的观察者模式。
 *
 *  1.订阅者 通过 事件中心 订阅某个主题
 *  2.发布者 通过 事件中心 发布某个主题
 *
 * 在此模式中，避免了发布者和订阅者的直接依赖，让它们都通过事件中心来订阅/发布消息，降低了耦合，提高了代码可读性。
 * 常见的场景有消息队列。
 *
 * **/


/*
*  全局订阅事件列表，按照主题topic分发
*   {
*       [index: string]: Array[Function]
*   }
*
* */
const events = {};

// 订阅函数
const subscribe = (topic, fn) => {
    if (!(topic in events)) {
        events[topic] = [];
    }
    events[topic].push(fn);

    return unSubscribe = () => {
        console.log(topic, fn);
        remove(events[topic], fn)
    };
};

// 发布函数
const publish = (topic, ctx, ...args) => {
    if (topic in events) {
        const subs = events[topic];
        subs.forEach((sub) => {
            sub.apply(ctx ? ctx : this, args);
        })
    }
};


function remove(arr, item) {
    if (arr.length) {
        var index = arr.indexOf(item);
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}


function demo() {

    class Component {


    }

    class PageA extends Component {

        constructor(props) {
            super(props);
            this.unSubscribe = subscribe("topic.value.updated", (oldValue, newValue) => {
                console.log(`A页面: ${oldValue} => ${newValue} , 相减: ${oldValue - newValue}`)
            });
        }

        componentWillUnmount() {
            this.unSubscribe();
        }
    }

    class PageB extends Component {

        constructor(props) {
            super(props);
            this.unSubscribe = subscribe("topic.value.updated", (oldValue, newValue) => {
                console.log(`B页面: ${oldValue} => ${newValue} , 相加: ${oldValue + newValue}`)
            });
        }

        componentWillUnmount() {
            this.unSubscribe();
        }
    }

    class PageC extends Component {

        constructor(props) {
            super(props);
            this.unSubscribe = subscribe("topic.page.alert", (item) => {
                console.log(JSON.stringify(item))
            });
        }

        componentWillUnmount() {
            this.unSubscribe();
        }
    }

    pa = new PageA({});
    pb = new PageB({});
    pc = new PageC({});

}

demo();
publish("topic.value.updated", null, 12, 24);
publish("topic.page.alert", null, {
    hello: "world"
});

