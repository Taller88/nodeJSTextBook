//this는 전역객체 -> window
console.log(this);// <- anonymous global ? <- {}
console.log(this === module.exports);// <- anonymous global ?
// 전역스코프의 this만 module.exports오ㅓㅏ 동일 

function a(){
    console.log(this === global);
}
a()

