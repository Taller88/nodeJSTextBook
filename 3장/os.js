// 내장 모듈 
const os = require('os');
const path = require('path');

// 서버 여러개 띄울때 효과적 
// core별로 서버 올리기 
console.log(os.cpus());
// 사용가능한 메모리(Ram)을 보여줌
console.log(os.freemem());

// 전체 메모리 용량을 보여줌 
console.log(os.totalmem());