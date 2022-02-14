const path = require('path');


// 운영체제마다 경로 처리할때 효과적

path.join(__dirname, 'var.js');
// /nodejsTextBook/lecturevar.js <- Window, POSIX에 따라서 경로를 구분해줌
