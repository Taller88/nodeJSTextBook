/***
 *   브라우저ㅏ에서 모듈 webpack gulp 
 * 
 * 
 * 
 * 
 */
// 구조 분해할당 가능 
 var {odd, even}  = require('./var2.js');

 function checkOddorEven(num){
     if(num %2){
         return odd;
     }else{
         return even;
     }

 }


 // node의 모듈 시스템 
 module.exports = checkOddorEven;

 // 자바스크립트 모듈 시스템은 다름 
//  export default { checkOddorEven};
// import {checkOddorEven} from './moduleaPrac.js'
