const mongoose = require('mongoose');

const {Schema} = mongoose;
const {Types:{ObjectId}} = Schema;
const conmmentSchema = new Schema({
    commenter:{
        type:ObjectId,
        require:true,
        ref:'User'
    },
    comment:{
        type:String,
        require:true,
    },
    married:{
        type:Boolean,
        require:true,

    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
});


module.exports = mongoose.module('Comment', commentSchema);