const express = require('expess');
const passport = require('passport');
const bcrypt = require('bcrypt');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const User = require('./models/user')

const router = express.Router();


// 회원가입
router.post('/join',isNotLoggedIn, async(req, res, next)=>{
    const {email, nick, password} = req.body;
    try{
        //  가입한 이력 확인
        const exUser = await User.findOne({where:{email}});
        if(exUser){
            return res.redirect('/join?error=exist');
        }
        const hash = await bcrypt.hash(password, 12);// 12는 얼마나 복잡하게 할지
        User.create({
            email,
            nick,
            password:hash
        });
        res.redirect('/');

    }catch(error){
        console.error(error);
        return next(error);
    }
});


router.post('/login', isNotLoggedIn, (req, res, next)=>{
    passport.authenticate('local', (authError,user, info)=>{
        if(authError){
            console.log(authError);
            next(authError);
        }

        if(!user){
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, (loginError)=>{
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/')
        });
    })(req, res,next);
});

router.get('/logout',(req, res)=>{
    req.logout();
    req.session.destroy();
    res.redirect("/");
})

module.exports = router;
