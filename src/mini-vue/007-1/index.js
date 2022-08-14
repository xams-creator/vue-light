// /**
//  *   编写一个编译函数，实现输入一个字符串模板，一个参数对象，可以把字符串模板替换为具体值
//  *
//  *   compile('<div>hello: {{text}}</div>',{
//  *       text: 'world'
//  *   })
//  *
//  *   // output: <div>hello: world</div>
//  *
//  *
//  * **/
//
// function compile(str, ctx) {
//     const v = evaluation(str, ctx)
//     console.log(v);
// }
//
// const REG = /\{{(.+?)}}/;
//
// function evaluation(expression, ctx) {
//     if (expression == null || typeof expression !== 'string') {
//         return expression;
//     }
//     const matched = expression.match(REG);
//     if (!matched) {
//         // logger.warn(`dusk-plugin-expression: [expression ${expression} not matched]`);
//         return expression;
//     }
//     return new Function(`with(this){return ${matched[1]}}`).apply(ctx);
// }
