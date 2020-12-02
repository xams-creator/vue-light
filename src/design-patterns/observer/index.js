/**
 *  观察者模式
 *
 *  描述： 在观察者模式中，如果一个对象被修改，它的依赖对象将被自动通知。 观察者模式属于行为模式类别。
 *
 * **/

// 1.创建一个主题类，主题类中包含具体观察者。同时提供了 修改值，获取值，等方法
class Topic {

    constructor() {
        this.observers = [];
        this.value = 0;
    }

    add(observer) {
        this.observers.push(observer)
    }

    notify() {
        this.observers.forEach((observer) => {
            observer.update();
        })
    }

    getValue() {
        return this.value;
    }

    setValue(value) {
        this.value = value;
        this.notify()
    }

}


class Observer {

    constructor(topic) {
        this.topic = topic;
        topic.add(this)
    }

    update() {
        console.log('提供必须要实现的方法...')
    }

}

class Page1Observer extends Observer {

    update() {
        console.log(`页面1: 执行+100，${this.topic.getValue() + 100}`)
    }

}

class Page2Observer extends Observer {

    update() {
        console.log(`页面2: 执行-100，${this.topic.getValue() - 100}`)
    }

}

// 1.创建主题类
const topic = new Topic();

// 2.实现Observer
const page1Observer = new Page1Observer(topic);
const page2Observer = new Page2Observer(topic);

// 3.触发更新
