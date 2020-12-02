/**
 *  测试 typeof 和 Object.prototype.toString.call
 *
 * ***/

var toString = Object.prototype.toString;


function demo1() {
    var a = null;
    console.log(typeof a); // object
    console.log(toString.call(a));   // [Object Null]
}

function demo2() {
    var a = {};
    console.log(typeof a); // object
    console.log(toString.call(a));   // [Object Object]
}

/**
 *  使用 opts 检测对象类型。
 *   可以通过 toString() 来获取每个对象的类型。
 *   为了每个对象都能通过 Object.prototype.toString() 来检测，
 *   需要以 Function.prototype.call() 或者 Function.prototype.apply() 的形式来调用，
 *
 * */
function demo3(){
    toString.call(new Date); // [object Date]
    toString.call(new String); // [object String]
    toString.call(Math); // [object Math]

    toString.call(undefined); // [object Undefined]
    toString.call(null); // [object Null]
}




