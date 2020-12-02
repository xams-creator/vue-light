/**
 *  Object.defineProperty
 *
 *
 * */

// writable: 不可写
function demo1() {

    a = {foo: 1};
    Object.defineProperty(a, 'foo', {
        writable: false
    });
    a.foo = function () {
        console.log(123)
    };

    return a;   // {foo:1}
}


// configurable: 不可删除
function demo2() {

    a = {foo: 1};
    Object.defineProperty(a, 'foo', {
        configurable: false
    });
    a.foo = 2;
    console.log(a); // {foo: 2}
    delete a.foo;
    return a;   // {foo: 2}
}

// enumerable：不可枚举

function demo3() {
    a = {foo: 1};
    console.log(Object.keys(a)); // ['foo']
    Object.defineProperty(a, 'foo', {
        enumerable: false
    });
    console.log(Object.keys(a));  // []
}

// get: 重写函数
function demo4() {
    a = {
        firstName: '三',
        lastName: '张',
    };

    Object.defineProperty(a, 'fullName', {
        configurable: false,
        enumerable: false,
        get() {
            return this.lastName + this.firstName;
        }
    });
}
