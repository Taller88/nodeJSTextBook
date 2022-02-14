const spawn = require('child-process').spawn;


// 파이썬을 실행 cmd창에서 하나 실행한다고 생각하자.
const process = spawn('python', [test.py]);

process.stdout.on('data', function(data){
    console.log("성공: "+data.toString());
})


process.stderr.on('data', function(data){
    console.log("에러: "+data.toString());
})
