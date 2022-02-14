const {exec} = require('child_process');
//child_process
// 는 다른 프로세스를 하나 생성하는 것
// exec(명령어) 
var process = exec('dir');

process.stdout.on('data', function(data){
    console.log(data.toString());
})

process.stderr.on('data', function(data){
    //에러가 날때 
    console.log(data.toString())
})