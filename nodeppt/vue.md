title: vue2.X 源码解析  {.text-landing.text-shadow}
speaker: yixin.zhou
url: 
js:
    - https://www.echartsjs.com/asset/theme/infographic.js
plugins:
    - echarts: {theme: infographic}
    - mermaid: {theme: forest}
    - katex

<slide class="bg-black-blue aligncenter" image="https://cn.bing.com/az/hprichbg/rb/RainierDawn_EN-AU3730494945_1920x1080.jpg .dark">

# vue2.X 源码解析

姑妄听之，如是我闻。{.text-intro.animated.fadeInUp.delay-500}

[:fa-github: Github](https://github.com/xams-creator/vue-light){.button.ghost.animated.flipInX.delay-1200}



<slide class="aligncenter">

## 为什么要读开源代码? {.text-landing}

<slide class="size-50 aligncenter">

## 为什么会选择vue? {.text-landing}
---

|      |   学习曲线  | 学习内容  |
| :------------: |  :------------: | :------------: |
| angular  |  高  | 阅读源码前会涉及到一些重要概念，比如 IOC，DI等    |
| react  |  中  | 阅读源码前会涉及到 react-dom 的源码阅读 |
| vue  |  低  | 需要了解一些浏览器特性与基础前端知识 |

<slide :class=" size-50 aligncenter">

## 选择哪种版本的开源代码? {.text-landing}
---


|      |   能否看到目录结构  | 能否直观看到全部源码  |
| :------------: |  :------------: | :------------: |
| 压缩前源码  |  √  | ×  |
| 压缩后源码  |  ×  | √ |


<slide class="aligncenter">

## 如何去读源码? {.text-landing}

<div style='display: none'>
- #### 1.通过官方文档了解框架基础概念 {.animated.fadeInUp.delay-666}
- #### 2.提出问题	{.animated.fadeInUp.delay-666}
- #### 3.阅读源码 {.animated.fadeInUp.delay-666}
- #### 4.整理源码逻辑到文档 {.animated.fadeInUp.delay-666}
- #### 5.重复 2 - 4 步 {.animated.fadeInUp.delay-666}
</div>



<slide class="bg-gradient-r" :class=" size-40 aligncenter" image="https://cn.bing.com/az/hprichbg/rb/WinterLynx_ZH-CN7158207296_1920x1080.jpg .dark">

## 主题
---

- #### vue实例初始化过程 {.animated.fadeInUp.delay-666}
- #### vue中有哪些值得一看的内容？	{.animated.fadeInUp.delay-666}
- #### vue字符串模板编译 {.animated.fadeInUp.delay-666}

<slide class="aligncenter">

## vue实例初始化过程 {.text-landing}
--- 

|      |   代码位置  |  备注  |
| :------------: |  :------------: | :------------: |
|  [Vue初始化源码分析流程图](https://www.processon.com/diagraming/5f8411a763768906e66a8352) |  -  |   |
| 简单的示例  |  /src/init/**  |  |

<slide class="aligncenter">

## vue中有哪些值得一看的内容（不完整）? {.text-landing}

--- 

|      |   代码位置  | 类型 | 备注  |
| :------------: |  :------------: | :------------: | :------------: |
| performance  |  /src/feature/performance  |  浏览器特性 | 性能追踪|
| define-property  |  /src/feature/define-property  | 浏览器特性 | 操作对象属性 |
| validate-props  |  /src/feature/validate-props  |  vue | 验证props参数 |
| proxy  |  /src/feature/proxy  |  浏览器 | 对象代理与函数拦截 |
| set  |  /src/feature/set  |  浏览器 + vue | Set polyfill |
| use  |  /src/feature/use  |  vue | vue 插件功能 |


<slide class="aligncenter">

## vue字符串模板编译 {.text-landing}

<slide :class="size-10 aligncenter">

## 在正式开始之前......{ .animated.swing}
--- 

#### 得先介绍一下<font color=red>正向代理</font>和<font color=red>反向代理</font> { .animated.fadeInUp.delay-1000}
#
<slide class="aligncenter">


:::card

#### 正向代理

-   :概念\::{.text-label} 正向代理是一个位于客户端和原始服务器(origin server)之间的服务器，为了从原始服务器取得内容，客户端委托代理发送请求给原始服务器，并将获得的内容返回给客户端，从而达到通信。
-   :位置\::{.text-label} 客户端和远程服务器中间
-   :效果\::{.text-label} 隐藏客户端
    {.description}
---

![](https://xams.xyz/download/proxy.png)

:::

<slide class="aligncenter">

:::card

#### 反向代理

-   :概念\::{.text-label} 反向代理服务器位于用户与目标服务器之间，但是对于用户而言，反向代理服务器就相当于目标服务器，即用户直接访问反向代理服务器就可以获得目标服务器的资源。同时，用户不需要知道目标服务器的地址，也无须在用户端作任何设定。反向代理服务器通常可用来作为Web加速，即用反向代理作为Web服务器的前置机来降低网络和服务器的负载，提高访问效率。
-   :位置\::{.text-label} 用户和真实目标服务器中间
-   :效果\::{.text-label} 隐藏真实服务端
    {.description}
---

![](https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=fa2047ccfddeb48fef64a98c9176514c/0b55b319ebc4b74544736abbc1fc1e178b8215b3.jpg)

:::

<slide class="aligncenter">

## 什么是虚拟路由? {.text-landing}

<slide class="aligncenter">
#### 概念表

-   :默认路由表\::{.text-label} 又可以叫真实路由表，一般在react-router和virtual-router初始化前由使用者提供。
-   :虚拟路由表\::{.text-label} 只在virtual-router中存在，在初始化前由使用者提供。经过处理后，最终会加入实例映射表中，一般用于路径匹配和内部跳转。
-   :外部跳转\::{.text-label} 通过在地址栏输入URL跳转
-   :内部跳转\::{.text-label} 使用Link，window.open，或者刷新页面等方式操作。它们在正常情况下会共用一个Session
-   :named path\::{.text-label} /user/\:id 这种使用\: 通配的路径都叫 named path

    {.description}
	
	
<slide class="aligncenter">

#### 和react-router的对比
--- 

![](https://xams.xyz/download/diff.png)


<slide class="aligncenter">

#### virtual-router生命周期
--- 


![](https://xams.xyz/download/app.png)


<slide>


#### 在不影响应用正常使用的情况下，以达到隐藏、混淆、代理前端应用的真实路径或者真实hash为目的的技术实现，可以称为虚拟路由。某种角度上来讲，Nginx等代理服务器也可以达到这种效果。

---

<slide class="aligncenter">

## 虚拟路由背景 {.text-landing}



::: 
<slide class="slide-top">
:::

#### 在大约1个多月前，HomeCharging项目经过了一次渗透测试，测试结果中发现<font color=red>2条地址安全相关的问题</font>。问题如下：

--- 

##### 1.前端对后台发起GET请求,并且在URL中明文了一些敏感参数。

###### 比如这样的请求地址： 

 ```
GET => http://dev/hc-ticket/vehicle/15	// 获取id为15的车辆详情

GET => http://dev/hc-ticket/customer/1	// 获取id为1的客户详情	
```


> 按照restful的接口风格来说，看上去并没有什么问题，但是对于一些站点来说，暴露有序的关键数据，在某些情况下，可能会存在数据泄露的风险。


> 解决方式： 所有带参数的GET请求，改为了POST请求，并且把之前的敏感参数放入body，同时针对每个接口做出角色和用户的验证。
 
##### 2.前端路由参数中暴露了敏感参数

###### 比如这样的路由： 

 ```
http://dev/hc-ticket/#/customer/1/15	// 通过复制URL，可以打开id为1的客户并且车辆id是15的页面

http://dev/hc-ticket/#/ticket/1			// 通过复制URL，可以打开id为1的服务工单页面

```
> 虽然第一个问题中已经可以避免绝大多数数据泄露的风险，但是这些关键性的ID却会暴露在浏览器上。


> 解决方式： 使用最早版本的路由映射解决了这个问题。这也是虚拟路由产生的背景。

<slide class="aligncenter">

#### 虚拟路由解决的问题

---

- ##### 把存在地址栏上的敏感路由参数隐藏
- ##### 当需要跳转到系统内部页面时，只能通过应用暴露出来的主入口进入
- ##### 保护敏感数据，减少敏感数据暴露的几率。

<slide class="bg-gradient-r" :class=" size-40 aligncenter" image="https://cn.bing.com/az/hprichbg/rb/WinterLynx_ZH-CN7158207296_1920x1080.jpg .dark">

## 虚拟路由的技术基石

---

- #### 路径匹配和解析 {.animated.fadeInUp}
- #### 数据存储和解析 {.animated.fadeInUp.delay-400}


:::note
## Note here
:::

<slide class="aligncenter">




## 路径匹配和解析 {.text-landing}
<slide :class="size-40 aligncenter">

### path-to-regexp 
#### 将路径字符串转换为正则表达式。 
##### （/foo/\:bar） to reg !

---

```shell {.animated.fadeInUp}
# install  
$ npm install path-to-regexp

# usage
const { pathToRegexp, match, parse, compile } = require("path-to-regexp");

```


<slide class="slide-center">

### 1/4 pathToRegexp 使用示例

---

```javascript

import {pathToRegexp, match, parse, compile} from 'path-to-regexp';

const keys = [];
const path = '/:foo/:bar'
const reg = pathToRegexp(path, keys, {});	
// result reg  返回的是 path 对应的 正则表达式
// result keys = [{ name: 'foo', prefix: '/', ... }, { name: 'bar', prefix: '/', ... }]

reg.exec('/test/route');
// exec正则并且匹配成功，那么返回的数组中，下标第一个是本次匹配完整的内容，后面返回匹配的参数 [ '/test/route', 'test', 'route']

// 它可以根据提供的 named path 来和当前地址做匹配

```


<slide class="slide-center">

### 2/4 match 使用示例

---

```javascript

import {pathToRegexp, match, parse, compile} from 'path-to-regexp';

const matchFn = match('/user/:id', {decode: decodeURIComponent});	// => 将会返回一个match函数，用于和提供的path做匹配

matchFn('/user/123'); // => { path: '/user/123', index: 0, params: { id: '123' } }
matchFn('/invalid'); // => false

// 提供 带参数的路由（named path） , 匹配当前的路径 location path || hash path
```

<slide class="slide-center">

### 3/4 compile 使用示例

---

```
import {pathToRegexp, match, parse, compile} from 'path-to-regexp';

const toPath = compile('/user/:id', {encode: encodeURIComponent});	// => 将会返回一个match函数，用于提供参数给 named path
toPath({id: 123});  // => /user/123

// 根据带参数的路由（named path）和提供的参数来生成一个path

```


<slide class="slide-center">

### 4/4 parse 使用示例

---

```

import {pathToRegexp, match, parse, compile} from 'path-to-regexp';

const tokens = parse('/route/:foo/:bar/bar');

// 返回一个数组，参照第一个例子的 keys 数组
```


<slide :class="size-50 aligncenter">

## 数据存储方式使用SessionStorage

<slide>

为什么使用SessionStorage作为路由数据存储？ {.text-content}

#### sessionStorage生命周期为当前窗口或由当前窗口扩展打开的标签页，一旦窗口或标签页被永久关闭了，那么当前页面的sessionStorage存储的数据也就被清空了。

---

#### 由于SessionStorage属于多家浏览器支持的标准之一，兼容性相对于WebSQL,indexedDb这种永久存储更轻量，更容易做代码管理。不使用localStorage可以在<font color=red>不用考虑页面的状态情况下保存路由映射数据</font>。

---

<slide :class="size-50 aligncenter">

## 虚拟路由数据解析

<slide>

虚拟路由的数据解析 {.text-content}

--- 

#### 虚拟路由中支持多种跳转组件，大部分原理一样。以 `<Link />` 举例，重写了react-router提供的 `<Link />`组件。 它拦截了react-router  `<Link />`的点击事件，并根据当前选择的虚拟路由mode和提供的虚拟路由URL，把解析后的数据给传递SessionStorage统一保存。

--- 

#### 在页面打开时，可以使用提供的withRouter组件把业务组件包装，这个组件会根据浏览器当前地址或哈希，从虚拟映射表和本地存储中匹配对应的参数，最后会注入到组件的 params 对象中，从而完成业务流程的不变性。





<slide class="bg-black aligncenter" image="https://source.unsplash.com/n9WPPWiPPJw/ .anim">

## react-rotuer 源码解读 

一行一行剖析源码。{.text-intro.animated.fadeInUp.delay-500}


[:fa-github: Github](https://github.com/ReactTraining/react-router/blob/master/packages/){.button.ghost.animated.flipInX.delay-1200}


