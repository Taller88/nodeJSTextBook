// express 모듈자체에서 http 모듈을 쓰고 있음
// 400에러나 500에러 알아서 express 에서 해주는중
// node_module은 보통안올리고 소스코드 받아서 'npm i'로 해줌
const express = require('express');
const path = require('path');

const app = express();
// 서버에 속성을 심는다. 
// 기본적으로 서버 포트를 3000으로 할것이다. 
// 바꾸려면 서버끄고 터미널에서 SET PORT = 8001 -> 한번 세팅하면 8001로 세팅가능 

app.set('port', process.env.PORT || 3000);
// ---------------------------------------------------------------------공통 middleware
app.use((req, res, next) =>{
    console.log("모든 요청에서 하고 싶어여");
    next();
},(req, res, next)=>{
    try{
        // console.log("에러발생");
        // throw new Error("에러야!!!")
    }catch(err){
        /**
         * next(err) 
         *  next는 기본적으로 다음 미들웨어로 넘어가는데 
         *      만약에 error가 param으로 들어있을때는 error처리 미들웨어로 넘어갑니다.
         */
        next(err);// throw Error는 잘 안씀
        //next('router')는 같은 router처리할때 
    }
})

// ---------------------------------------------------------------------Router
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname,'/index.html'));
    // res.send("안녕하세여.");     -> 한 router에 두번 이상 나오면 (미들웨어 포함)
    // res.json({})
    // res.writeHead() -> 이미 응답을 완료하고 head쓰면 안됨.
})

app.get('/jsonTest', (req, res) =>{
    res.json({jinwoo:"test"});
    console.log("test"); // res.json 은 return이 아님 
    // res.render() <- 얘도 응답을 보내는것
})

// ---------------------------------------------------------------------에러 미들웨어
// 404 처리 미들웨어
app.use((req, res, next)=>{
    res.send("404 입니다.");
})
// error 미들웨어는 반드시 next까지 4개가 모두 있어야함
// JS에서 아래 두개를 다른 함수를 취급함;
// (err, req, res, next) =>{
//     console.error(err);
// }
// err, req, res) =>{
//     console.error(err);
// }
app.use((err, req, res, next) =>{ //에러 처리 미들웨어
    
    console.error(err);
    res.sned('에러남');
    
})


app.listen(app.get('port'), ()=>{
    console.log('Server 3000 port')
})