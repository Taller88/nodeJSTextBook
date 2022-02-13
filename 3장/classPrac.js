
// 생성자 함수
var Human = function(type){
    this.type = type || 'human'
}

// 생성자(static) 메소드
Human.isHuman = function(human){
    return human instanceof Human
}


Human.prototype.breath = function(){
    alert('h-a-a-a-m')
}


var Zaro = function(type, fn, ln){
    // Human을 상속받을 때 해줘야하는 거 
    Human.apply(this);


    this.firstName = fn;
    this.lastName = ln;
    

}


Zero.prototype = Object.create(Human.prototype);
Zero.prototype.constructor = Zero;
