const express = require('express');
const User = require('../models/user');
const Comment = require('../models/comment');

const router = express.Router();

router.route('/')
// index.js에서도 해주었지만 index에서는 sequelize.html을 렌더링할때 
// 여기는 데이터를 json형태로 반환하는 것에 차이
    .get(async(req, res, next)=>{
        try{
            const users = await User.findAll();
            res.json(user);
        }catch(err){
            console.error(err);
            next(err);
        }
    })
    .post(async(req, res, next)=>{
        try{

            const user = await User.create({
                name:req.body.name,
                age:req.body.age,
                married:req.body.married

            });
            console.log(user);
            res.status(201).json(user);
        }catch(err){
            console.error(err);
            next(err);
        }
    
    })

    // 작성자 id로 comment목록 불러오기
router.get('/:id/comments', async(req, res, next)=>{
    try{
        const comments = await Comment.findAll({
            include:{
                model:User,
                where:{id:req.params.id}
            }
        });
        console.log(comments);
        res.json(comments);
    }catch(err){
        console.error(err);
        next(err);
    }
}); 

module.exports = router;