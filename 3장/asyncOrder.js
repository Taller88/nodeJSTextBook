
const fs = require('fs');

// fs.readFile 

/**
 *  콜백 지옥
 *  
 *  asyncOrder.js 를 여러번 실행했다>? 
 *  다 백그라운드로 넘어가서 1234가 다 백그라운드로 넘어가서 사용
 */
fs.readFile('./readme.txt', (err, data) =>{
    if(err){
        throw err;
    }

    console.log('1번 data: ', data.toString());
    fs.readFile('./readme.txt', (err, data) =>{
        if(err){
            throw err;
        }
    
        console.log('2번 data: ', data.toString());
        fs.readFile('./readme.txt', (err, data) =>{
            if(err){
                throw err;
            }
        
            console.log('3번 data: ', data.toString());
            fs.readFile('./readme.txt', (err, data) =>{
                if(err){
                    throw err;
                }
            
                console.log('4번 data: ', data.toString());
            });
            
        });
    });
});


