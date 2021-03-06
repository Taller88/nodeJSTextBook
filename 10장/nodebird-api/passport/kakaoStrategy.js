const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user');

module.exports=()=>{
    passport.use (new KakaoStrategy({
        clientID:process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback'
    }, async(accessToken, refreshToken, profile, done)=>{
        try{
            const exUser = await User.findOne({
                where:{snsId:profile.id, provider:'kakao'}
            })
            if(exUser){
                done(null, exUser);
            }
            const newUser = await User.create({
                email:profile._json && profile._json.kakao_account_email,
                nick:profile.displayName,
                snsId:profile.id,
                provider:'kakako'
            });
            done(null, newUser);
        }catch(e){
            console.error(e);
            done(e);
        }
    }))
}