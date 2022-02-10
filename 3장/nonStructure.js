const exam = {a:123, b:{c:123, d:123}};

const a = exam.a;
const b = exam.b;


const {a, b:{d}} = exam;


// 배열 자리가 동일하게 
const arr= [1,2,3,4,5,6];
const [x,y,,,z] = arr;
// delfino.js?20211105

var candy = {
    status:{
        name:'node',
        count:5,
    },
    getCandy: function(){
        this.status.count--;
        return this.status.count;
    }
}

var getCandy = candy.getCandy();
var count = candy.status.count;

const {status:{name, count}}= candy
