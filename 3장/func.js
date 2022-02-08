const {odd, even} = require('./var');

function checkNum(num){
    console.log("CheckNum Function");
    if(num % 2){
        
        return odd;
    }else{
        
        return even;
    }
}

module.exports = checkNum;

