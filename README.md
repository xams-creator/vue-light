# vue-light

> ##### 记录读 Vue2.x 源码时的笔记，希望可以总结的通俗易懂。由于是一人完成，并且水平精力有限，不能保证完全正确，如有问题希望可以得到大家的反馈。

- #### [Vue初始化源码分析流程图](https://www.processon.com/diagraming/5f8411a763768906e66a8352)

## 目录结构
```
vue-light
    dist
        vue.js          //  完整版未修改的源码
    src
        example         //  阅读源码过程中，写的一些代码例子
        fragment        //  从源码中抽离的一些代码碎片，记录相对详细的笔记
    index.html          //  目录首页
    vue.js              //  增加注释的源码。针对一些函数，会给出 input 和 output
```

## 提出问题

- vue是怎样进行初始化的?

    > 精简版主要为初始化流程，省略了部分细节内容，详情请见流程图
    ```
     入口： Vue.prototype._init = function (options)
    
     1.处理入参的options对象（这里分处理组件options和处理非组件options两种情况,这里只记录非组件场景）
     
        mergeOptions(resolveConstructorOptions(vm.constructor),options || {},vm);
        
        详情： 
        - 1.检查使用的局部组件 options.components 名称是否合法
        - 2.把提供的非标准 options.props、options.inject、options.directives 结构标准化为vue定义的对象标准结构
        - 3.处理 options.extends、options.mixins、options.data 合并，产生 merge 函数，执行后会返回合并的数据
    
     2.初始化用于处理渲染的vue代理对象 vue._renderProxy = vm; 渲染捕捉器代理
     
        initProxy(vm);
        
        如果浏览器支持 Proxy 特性，
        详情： 
        - 1.当使用 hasHandler 时，使用 key in vm._renderProxy 语法时，会被拦截
        - 2.当使用 getHandler 时, vm._rederProxy 获取值的时候会被拦截
        
        是否说明: 在渲染时 JSON，Number，这种全局方法或者函数是不被接受，无法使用的?
    
     3.初始化vue实例相关的基础属性和生命周期钩子状态标识
        
        initLifecycle(vm);
      
        详情： 
        - 1.使用 while 循环获取当前vue实例的 $parent 实例。使当前实例可以通过 this.$parent 获取父实例 
        - 2.确定 $root 根实例，为 this.$parent.$root 或 this 当前实例
        - 3.建立 $parent 实例和当前实例的关联 ， $parent.$children.push(vm)
        - 4.定义生命周期钩子标识 _isMounted，_isDestroyed，_isBeingDestroyed
    
     4.初始化事件列表 initEvents(vm)
     
        initEvents(vm);
     
        详情： 
        - 1.如果 options 中存在 parentListeners，那么将更新|合并这些listeners
        - 2.listeners和 v-on 存在关联关系
      
     5.初始化渲染函数
     
        initRender(vm);
        
        详情： 
        - 1.循环子节点解析插槽,过滤并收集插槽,最终结构本质上是VNode。灵感来源于 https://developer.mozilla.org/zh-CN/docs/Web/Web_Components
        - 2.定义render核心方法，比如 vm._c 和 createElment 。它是后续 页面模板template 经过 ast 分析后，组装 渲染页面函数 时必不可少的内容
        - 3.最后使用 defineProperty 让$attrs，$listeners 内容变更时可以通知订阅者，提供 customSetter 可以做日志打印
    
     6.调用生命周期钩子函数 beforeCreate
     
        callHook(vm, 'beforeCreate');
        
        详情： 
        - 1.在处理 $options 的 mixins 时，已经把钩子函数合并为了数组结构，现在直接循环执行，此时会被 try catch 包裹
    
     7.初始化options.inject的值到当前vue实例上 
     
        initInjections(vm);
        
        详情： 
        - 1.通过 while 循环，从下到上，找到父节点中可以被使用的 _provide 对象，并从此对象中获取值，最终写入到当前 vue 实例中
        - 2.最后使用 defineProperty 让inject结果变更时可以通知订阅者
    
     8.初始化用于后续页面挂载的有状态数据 
        
        initState(vm);
        
        详情： 
        - 1.初始化观察者列表
        - 2.循环校验 $options.props，并且把获取到的默认值赋值到 vue 实例 ,当最终的props值被改变时通知订阅者。类型检查类似于 react 的 props-type
        - 3.初始化 methods，会把 options.methods 写入 vue 实例 ，方法执行的上下文是当前实例  bind(methods[key], vm);
        - 4.初始化 data, 会把 data 处理为可观察的数据，当值发生改变时，会通知订阅者。
            - 4.1 vue.$data.value 被修改
            - 4.2 value 对应的 Dep 实例执行 notify
            - 4.3 Dep实例对应的 subscribes 订阅者循环执行 update(), 也即 watcher.update()
            - 4.4 watcher.update() 执行页面渲染逻辑
        
        - 5.初始化 computed 计算函数
        - 6.初始化 watch 观察函数，当值发生改变时，执行回调
        
    
     9.初始化当前实例的 _provide 属性
     
        详情： 
        - 1.如果是 options.provide 是对象，直接写入实例，如果是函数，执行并写入
    
     10.调用生命周期钩子函数 created
     
        详情： 
        - 1.在处理 $options 的 mixins 时，已经把钩子函数合并为了数组结构，现在直接循环执行，此时会被 try catch 包裹
    
     11.建立vue实例和真实dom元素的关联关系，当vue实例发生变化时，重新渲染页面
     
        详情： 
        - 1.
    
     
    ```



- vue是如何实现数据响应式的？
    ```
     入口： observe(data, true /* asRootData */);
    
     1.处理入参的options对象（这里分处理组件options和处理非组件options两种情况,这里只记录非组件场景）
        
        详情： 
        - 1.检查局部注册的组件 options.components 组件名是否合法
        - 2.把提供的非标准 options.props，options.inject, options.directives结构标准化为 vue 定义的对象结构
        - 3.处理 options.extends、options.mixins、options.data 的合并
    
     2.初始化用于处理渲染的vue代理对象 vue._renderProxy
     
        详情： 
        - 1.当使用 hasHandler 时，使用 key in vm._renderProxy 语法时，会被拦截
        - 2.当使用 getHandler 时, vm._rederProxy 获取值的时候会被拦截
    
     3.初始化 vue 实例相关的基础属性和生命周期钩子状态标识
      
        详情： 
        - 1.使用 while 循环获取当前 vue 实例的 parent 实例，子实例 可以通过 this.$parent 可以获取顶级父实例 
        - 2.确定 $root 根实例
        - 3.建立 $parent 实例和当前实例的关联 ， $parent.$children.push(vm)
        - 4.定义生命周期钩子标识
    
     4.初始化事件列表 events
     
        详情： 
        - 1.如果 options 中存在 parentListeners，那么将更新|合并这些listeners
        - 2.listeners和 v-on 有一定关系
      
     5.初始化渲染函数
     
        详情： 
        - 1.循环子节点解析插槽,过滤空插槽,收集插槽,最终结构本质上是VNode。灵感来源于 https://developer.mozilla.org/zh-CN/docs/Web/Web_Components
        - 2.定义渲染时需要的 _c,$createElement 函数
        - 3.最后使用defineProperty 让$attrs，$listeners 内容变更时可以通知订阅者
    
     6.调用生命周期钩子函数 beforeCreate
     
        详情： 
        - 1.在处理 $options 的 mixins 时，已经把钩子函数合并为了数组结构，现在直接循环执行，此时会被 try catch 包裹
    
     7.初始化options.inject的值到当前vue实例上 
     
        详情： 
        - 1.通过 while 循环，找到父节点的可以被使用的 _provide 对象，并从此对象中获取值，最终写入到当前 vue 实例中
        
    
     8.初始化用于后续页面挂载的有状态数据 initState
     
        详情： 
        - 1.初始化观察者列表
        - 2.校验 $options.props，并且赋默认值到 vue 实例 ,当最终的props值被改变时通知订阅者。类型检查类似于 react 的 props-type
        - 3.初始化 methods，会把 options.methods 写入 vue 实例
        - 4.初始化 data, 会把 data 处理为可观察的数据，当值发生改变时，会通知订阅者
        - 5.初始化 computed 计算函数
        - 6.初始化 watch 观察函数
        
    
     9.初始化当前实例的 _provide 属性
     
        详情： 
        - 1.如果是 options.provide 是对象，直接写入实例，如果是函数，执行并写入
    
     10.调用生命周期钩子函数 created
     
        详情： 
        - 1.在处理 $options 的 mixins 时，已经把钩子函数合并为了数组结构，现在直接循环执行，此时会被 try catch 包裹
    
     11.挂载，建立vue实例和真实dom元素的关联关系，当vue实例发生变化时，重新渲染页面。
     
        详情： 
        - 1.
        - 2.
        - 3.
    
     
    ```


- vue是如何渲染页面的？


- vue中使用到了哪些浏览器特性和兼容性处理?

```
     1.performance 性能追踪
        
    
     2.Proxy
     
    
     3.Object.defineProperty
      

     4.bind polyfill
     
      
     5.Set polyfill



- 如何理解 vue 的一些功能? 
    ```
     1.vue.$parent
        详情： 
        - 1.
        - 2.
        - 3.
        
        示例: example/parent
    
     2.初始化用于处理渲染的vue代理对象 vue._renderProxy
     
        详情： 
        - 1.当使用 hasHandler 时，使用 key in vm._renderProxy 语法时，会被拦截
        - 2.当使用 getHandler 时, vm._rederProxy 获取值的时候会被拦截
    
     3.初始化 vue 实例相关的基础属性和生命周期钩子状态标识
      
        详情： 
        - 1.使用 while 循环获取当前 vue 实例的 parent 实例，子实例 可以通过 this.$parent 可以获取顶级父实例 
        - 2.确定 $root 根实例
        - 3.建立 $parent 实例和当前实例的关联 ， $parent.$children.push(vm)
        - 4.定义生命周期钩子标识
    
     4.初始化事件列表 events
     
        详情： 
        - 1.如果 options 中存在 parentListeners，那么将更新|合并这些listeners
        - 2.listeners和 v-on 有一定关系
    
    ```