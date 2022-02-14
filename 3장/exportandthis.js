//__filename, __dirname
// repl 에서는 불가
// module.exports 


const odd = "홀수";
const even = "짝수";

exports.odd = odd;
exports.even = even;

// 위와 동일
// module.exports = {odd, even}
// module.exports == exports === {}
// function
// module.exports !== exports === {function()}


// 여러개를 넣을 때는 exports.odd = odd 
// 한가지 module.exports = checkname;
// exports.odd 를 썼다면 module.exports 를 쓰면 안된다. 


