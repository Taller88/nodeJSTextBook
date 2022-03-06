const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next)=>{
    try{
        req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        return next();
    }catch(err){
        if(err.name === 'TokenExpiredError'){
            return res.status(419).json({
                code:419,
                message:'토큰이 만료되었습니다.'
            });
        }
        return res.status(401).json({
            code:401,
            message:'유효하지 않은 토큰입니다.'
        })
    }
}


exports.isLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated()){
        next();
    }else{
        res.status(403).send('로그인 필요'); // next가 없으니까 여기서 끝남
    }
};

exports.isNotLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated()){
        next()
    }else{
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/?error=${message}`)
    }
}
