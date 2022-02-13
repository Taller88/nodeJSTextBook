/**
 *  노드에서 지원해주는 애들 
 * 
 *  - require
 *  - module
 *  - global : window 
 *      브라우저의 window 같은 역할 
 *      -> 브라우저에서 globalThis 지원 -> Explore에서는 지원 안함 
 *      node에서 window, document지원 안함 
 * 
 *  -> global.require, global.console.log
 *           
 * 
 * 
 */

console.time('jjw');
/**
 * 내 코드
 */
console.timeEnd('jjw')


// 비동기 코드 -> setTimeout, Promise 
//setImmediate((0=> console.log('hi'));
// timer는 백그라운드로 이동 -> 동시에 실행가능 
// setImmediate로 어떤 코드는 동시에 실행할 수 있도록 진행
// 
