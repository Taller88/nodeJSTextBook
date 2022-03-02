const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStartegy');
const User = require('../models/user');

// pas
module.export = ()=>{
    passport.serializeUser((user, done)=>{
        done(null, user.id);// auth.js 에서 req.login에서 옴 / 세션에 id만 저장
    });
    passport.deserialzeUser((id,done)=>{
        User.findOne({where:{id}})
            .then(user => done(null,user))// req.user로 접근 가능하게 함 , req.isAuthenticated() <- 로그인 시 true
            .catch(err => don(err))
    });
    local();
    kakao();
}