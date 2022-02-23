const dotenv = require('dotenv');

// express 모듈자체에서 http 모듈을 쓰고 있음
// 400에러나 500에러 알아서 express 에서 해주는중
// node_module은 보통안올리고 소스코드 받아서 'npm i'로 해줌
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const nunjucks = require('nunjucks');

const fs = require('fs');
// 여기서 서버에서는 Sync를 쓰면 안되는데 쓰는 이유는 서버 시작전이라 그런거임.
try{
    fs.readdirSync('uploads');
}catch(err){
    console.error('uploads 폴더 안보임');
    fs.mkdirSync('uploads');
    
}
const app = express();
dotenv.config();
// 서버에 속성을 심는다. 
// 기본적으로 서버 포트를 3000으로 할것이다. 
// 바꾸려면 서버끄고 터미널에서 SET PORT = 8001 -> 한번 세팅하면 8001로 세팅가능 

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
nunjucks.configure('views', { // views 폴더가 nunjucks 폴더가됨
    express:app,
    watch:true
})

// 미들웨어의 순서도 굉장히 중요하다. 
// ---------------------------------------------------------------------공통 middleware
// morgan : 요청보냈을때 서버에서 응답을 어떻게 했는지 알수가 있음
app.use(morgan('dev'));

// app.use(morgan('combined'));     <- dev보다 더 자세함 IP, 브라우저, 시간까지 <- [배포용]


//static : express 에서 제공하는 미들웨어 
// app.use('요청 경로 ', express.static(__dirname, 'public'));
// localhost: 3000/zerocho.html     localhost: 3000/public-3030/zerocho.html
// 외부인이 정적인 파일들의 정확한 경로를 알 수 가 없다. <- 보안에 도움

// 쿠키 파싱할때 편하게 
app.use(cookieParser(process.env.COOKIE_SECRET));
//dotenv : 비밀키를 숨겨주는 애 
app.user(session({
    resave:false, 
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true
    }
}));


const multer = require('multer');
const upload = multer({
    Storage:multer.diskStorage({
        destination(req,file,done){
            done(null, 'uploads/')
        },
        filename(req, file,done){
            const ext = path.extname(file.originalname);// 확장자 찾기 
            done(null, path.basename(file.originalname,ext)+Date.now()+ext)
        },
    }),
    limits:{fileSize: 5 * 1024 * 1024},
})
const fs = require('fs');


app.use('/ ', express.static(path.join(__dirname), 'public')); // 요청한 파일이 public에 있다면 다음 next를 실행하지 않음 -> 다른 middleware들은 next를 내부에서 사용중
// app.use('/', (req, res, next)=>{
//     //로그인 처리 후 미들웨어 추가
//     express.static(path.join(__dirname), 'public');
// })

//body - parser 쓰면 옛날 사람~~~
app.use(express.json());
app.use(express.urlencoded({extended:true}));


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
    // req.session = {} 그 사용자에 대한 고유한 세션
    req.session.id = 'hello'; // 방금 요청을 보낸 사람만 hello 가 됨 개인의 저장공간이 생김
    res.sendFile(path.join(__dirname,'/index.html'));
    // res.send("안녕하세여.");      -> 한 router에 두번 이상 나오면 (미들웨어 포함)
    // res.json({})
    // res.writeHead() -> 이미 응답을 완료하고 head쓰면 안됨.
})
app.get('/upload', (req, res)=>{
    res.sendFile(path.join(__dirname), 'multipart.html');
});
app.post('/upload', upload.single('image'), (req, res)=>{//upload.single('image<- form name!')는 하나의 파일일때 여러 파일은 upload.array('many')
    console.log(req.file, req.body);
    res.send('file ok');
});

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