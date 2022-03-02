const express = require('express');
const multer = require('multer');
const session = require('express-session');
const morgan = require('morgan');
const path = require('path');
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');

dotenv.config(); //dotenv는 require마치고 <- process관련 정보


const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');


const {sequelize} = require('./models')
const app = express();

app.set('port', process.env.PORT || 8001);//개발 8001, 배포는 80 or 443
app.set('view engine', 'html');
nunjucks.configure('views',{
    express:app,
    watch:true
})
sequelize.sync({force:false})
    .then(()=>{
        console.log("데이터베이스 연결 성공")
    })
    .catch((err)=>{
        console.error(err)
    })
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extends:true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false
    }
}))


app.use('/', pageRouter);
app.use('/auth', authRouter);

// 404 처리 미들웨어
app.use((req, res, next)=>{
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    res.status = 404;
    next(error);
})

//에러 미들웨어
app.use((err, req, res, next)=>{ //마지막 next 는 에러처리 미들웨어는 반드시 next써줘야함
    res.locals.message = err.message;// 템플릿엔진에서 변수
    res.locals.error = process.env.NODE_ENV !== 'production' ? err: {};
    res.status(err.status||500);//500은 서버 에러
    res.render('error');
})


app.listen(app.get('port'),()=>{
    console.log(app.get('port')+" 번 포트 open")
})