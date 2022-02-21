/***
 *  쿠키의 필요성
 *  - 요청에는 단점이 있음 
 *   : 누가 요청했는지 모름 (IP , 브라우저 정보정도만 알 수 있음)
 *   : 로그인을 구현하면 됨 
 *   : 쿠키와 세션이 필요
 * 
 * 
 * 
 * 
 */

const http = require('http');
const fs = require('fs').promises;

http.createServer((req, res)=>{
    if(req.method === "GET"){
        // if(req.url === '/'){
            console.log(" /")
            res.writeHead(200, {'Set-Cookie': "name = jj"});
            res.end("Hello Cookie");
        // }
    }
}).listen(8080,()=>{
    console.log("8080 Server open")
})