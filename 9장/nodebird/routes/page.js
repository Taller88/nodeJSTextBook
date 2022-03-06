const express = require('express');

const {isLoggendIn, isNotLoggedIn } = require('./middlewares');
const {Post, User}= require('')
const router = express.Router();

router.use((req, res, next)=>{
    res.locals.user = null;
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    res.locals.followerIdList = [];
    
    next();
});

router.get("/profile", (req, res, next)=>{
    res.render('profile',{title:"내정보 - NodeBird"});
})


router.get("/join", (req, res, next)=>{
    res.render('join', {title:"회원가입 - NodeBird"});
})

router.get("/", (req, res, next)=>{
    const twits = [];
    res.render('main',{
        title:'NodeBird',
        twits,
        user:req.user
    });
});

module.exports = router;
