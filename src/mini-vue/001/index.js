/*
    实现目标
*   1.让Vue只能通过new创建
*   2.需要能接收2个关键参数 (data,el)
* **/

class Vue {

    constructor(options) {
        this.init(options)
    }

    init(options) {
        this.$options = options
        this.$el = document.querySelector(options.el)
        this.$data = options.data
        console.log(this)
    }

}
