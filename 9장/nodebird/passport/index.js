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
            .then(user => done(null,user))
            .catch(err => don(err))
    });
    local();
    kakao();
}