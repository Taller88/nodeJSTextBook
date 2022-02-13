/**
 * 프로미스 
 * 
 *      :  내용이 실행은 되었지만 결과를 아직 반환하지 않은 객체 
 */


const condition = true;

const promise = new Promise((resolve, reject) =>{
    if(condition){
        resolve('성공');
    }else{
        reject('실패');
    }
});


// 딴짓.
// 딴짓.
// 딴짓.
// 딴짓.
// 딴짓.
 
promise.then((message) =>{
    console.log(messge)
})
.catch((error) =>{
    console.log(error)
})