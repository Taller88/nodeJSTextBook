const session = require('express-session');
const morgan = require('morgan');
const path = require('path');
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
const passport  = require('passport');
const express = require('express');

dotenv.config(); //dotenv는 require마치고 <- process관련 정보



const indexRouter = require('./routes');
const authRouter = require('./routes/auth');
const v1 = require('./routes/v1')


const {sequelize} = require('./models')
const passportConfig  = require('./passport');

const app = express();
passportConfig();

app.set('port', process.env.PORT || 8002);//개발 8001, 배포는 80 or 443
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
app.use('/img',express.static(path.join(__dirname, 'uploads'))); // multer 이미지 

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

// 다른 라우터보다 앞에 있어야함 
app.use(passport.initialize());
app.use(passport.session());
// passport .session이 시작될 때 deserialize가 실행됨

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/v1', v1);

app.use((req, res, next)=>{
    const err = new Error(`[${req.method}] ${req.url}라우터가 없습니다.`)
    err.status = 404
    next(err);
})

app.use((err, req, res, next)=>{
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production'? err :{};
    res.status(err.status||500);
    res.render('error');
})



app.listen(app.get('port'),()=>{
    console.log(app.get('port')+"번 포트 open")
})