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



<slide class="bg-gradient-r" :class=" size-50 aligncenter" image="https://cn.bing.com/az/hprichbg/rb/WinterLynx_ZH-CN7158207296_1920x1080.jpg .dark">

## 主题
---

- #### vue实例初始化过程 {.animated.fadeInUp.delay-666}
- #### vue中有哪些值得一看的内容？	{.animated.fadeInUp.delay-666}
- #### vue字符串模板编译逻辑 {.animated.fadeInUp.delay-666}

<slide class="size-60 aligncenter">

## vue实例初始化过程 {.text-landing}
--- 

|      |   代码位置  |  备注  |
| :------------: |  :------------: | :------------: |
|  [Vue初始化源码分析流程图](https://www.processon.com/diagraming/5f8411a763768906e66a8352) |  -  |   |
| 简单的示例  |  /src/init/**  |  |

<slide class="size-80 aligncenter">

## vue中有哪些值得一看的内容（待完善）? {.text-landing}

--- 

|      |   代码位置  | 类型 | 备注  |
| :------------: |  :------------: | :------------: | :------------: |
| performance  |  /src/feature/performance  |  浏览器特性 | 性能追踪|
| define-property  |  /src/feature/define-property  | 浏览器特性 | 操作对象属性 |
| validate-props  |  /src/feature/validate-props  |  vue | 验证props参数 |
| proxy  |  /src/feature/proxy  |  浏览器特性 | 对象代理与函数拦截 |
| set  |  /src/feature/set  |  兼容性处理 | Set polyfill |
| use  |  /src/feature/use  |  vue | vue 插件功能 |


<slide class="size-60 aligncenter">

## vue字符串模板编译逻辑 {.text-landing}
--- 

|      |   代码位置  | 类型 | 备注  |
| :------------: |  :------------: | :------------: | :------------: |
| compiler  |  /src/compiler/  |  - | 字符串模板编译|

<slide class="bg-black aligncenter" image="https://source.unsplash.com/n9WPPWiPPJw/ .anim">

##  vue2.X 源码解析 

一行一行剖析源码，持续更新，觉得不错就加个星吧！{.text-intro.animated.fadeInUp.delay-500}

[:fa-github: Github](https://github.com/ReactTraining/react-router/blob/master/packages/){.button.ghost.animated.flipInX.delay-1200}


