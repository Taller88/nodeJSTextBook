const http = require('http');
const fs = require('fs').promises;
// https : 기본적으로 443 port -> 생략가능
// http: 기본적으로 80 port -> 생략가능

const server = http.createServer(async (req, res) => {
    try{
        res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
        const data = await fs.readFile('./index.html');
        res.end(data);
    
    }catch(err){
        res.writeHead(200,{'Content-Type': 'text/plain; charset=utf-8'});
        res.end(err.message);
    }

});
server.listen(8080, () => {
    console.log('Server open 8080 Listening')
});


server.on('error', (error)=>{
    console.error(error);
})


const server1 = http.createServer((req, res) =>{
    res.writeHead({'Content-Type': 'text/html; charset = utf8'});
    res.write('<h1>hello Node</h1>');
    res.write('<p> Hello Server </p>');
    res.end('<p>Hello Zero</p>');
});
server1.listen(8081, () => {
    console.log('Server open 8080 Listening')
});


server1.on('error', (error)=>{
    console.error(error);
})
