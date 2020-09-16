// a.mjs

// import {bar} from './b.mjs'
// console.log('a.mjs');
// console.log(bar);
// export let foo = 'foo'

// 首先，执行a.mjs时，引擎发现它加载了b.mjs,因此会优先执行b.mjs
// 2. 接着执行b.mjs时，已知它从a.mjs输入了foo接口，这时不会去执行a.mjs，而是认为这个接口已经存在了，继续往下执行；
// 3. 执行到第三行console.log(foo)时，发现这个接口根本没有定义，因此报错

// 解决以上问题的方法是：
// 让b.mjs运行的时候，foo已经有定义了，这可以通过将foo写成函数来解决。
// 原因：
// 函数有作用域提升

import {bar} from './b.mjs'
console.log('a.mjs');
console.log(bar());
function foo(){return 'foo'} // 函数提升
export {foo}