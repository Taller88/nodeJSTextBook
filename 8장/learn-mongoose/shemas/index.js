const mongoose = require('mongoose');

const connect = ()=>{
    if(process.env.NODE_ENV !== 'production' ){
        mongoose.set('debug', true);
    }
    mongoose.connect('mongodb://이름:비밀번호@localhost:27017/admin',{
        dbName:'nodejs',
        useNewUrlParser:true,
        useCreateIndex: true
    },(err)=>{
        if(err){
            console.log('몽구스 디비 연결 에러 ',err);
        }else{
            console.log('몽고디비 연결 성공')
        }
    })
}



mongoose.connection.on('error', (err)=>{
    console.error('몽고 디비 연결 에러 ', err)
});

mongoose.connection.on('disconnected', ()=>{
    console.error('몽고 디비 연결이 끊겼습니다. 연결을 재시도 합니다. ');
    connect();
});

module.exports = connect;
