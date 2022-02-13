const {odd, even} = require('./var2.js');
// const {checkOddorEven} = require('./moduelsPrac.js');
// 구조분해할당을 안하면얘는 사실 변수이기 때문에 변수명은 마음대로 지을 수 있음
const checkNumber = require('./modulesPrac.js');


console.log(checkNumber(10));
console.log(checkNumber(11));
