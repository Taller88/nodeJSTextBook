// 노드에서 동기면 블록킹 , 비동기면 논블록킹
const fs = require('fs');

// fs.readFile 

/**
 *  비동기 함수 -> 콜백함수를 백그라운드로 감 
 *  따라서 콜백함수들을 동시에 실행 
 * 
 * 
 */
fs.readFile('./readme.txt', (err, data) =>{
    if(err){
        throw err;
    }

    console.log('1번 data: ', data.toString());
});
fs.readFile('./readme.txt', (err, data) =>{
    if(err){
        throw err;
    }

    console.log('2번 data: ', data.toString());
});
fs.readFile('./readme.txt', (err, data) =>{
    if(err){
        throw err;
    }

    console.log('3번 data: ', data.toString());
});
fs.readFile('./readme.txt', (err, data) =>{
    if(err){
        throw err;
    }

    console.log('4번 data: ', data.toString());
});
