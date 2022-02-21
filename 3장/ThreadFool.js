// fs, crypto, zlib 모듈의 메서드를 실행할 때는 백그라운드에서 실행 함 

const crypto = require('crypto');

const pass = 'pass';
const salt = 'salt';


const stat = new Date();
crypto.pbkd2(pass, salt, 1000000, 128, 'sha512')
