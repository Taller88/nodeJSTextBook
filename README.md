# nodeJSTextBook
nodeJS 교과서 서적 copy 및 정리 respository


# nodeJS 핵심 개념 이해하기

> NodeJS란 Chrome V8 Javascript 엔진으로 빌드된 Javascript 런타임
  
  * 런타임이란 

    > 특정 언어로 만든 프로그램들을 실행할 수 있는 환경
    

## 자바 스크립트 런타임 

![image](https://user-images.githubusercontent.com/48818574/152919495-ef4e4440-e9cf-4985-8d99-0aeaa39c7a92.png)

* V8
 - 구글에서 크롬에서 사용하고 있는 엔진
 - C, C++로 개발
    
* libuv
 - 이벤트 기반, 논 블록킹 I/O 모델 구현
 - C, C++로 개발


## 이벤트 기반 

```javascript
function run(){
  console.log("3초 후 실행")
}
console.log("시작");
setTimeout(run, 3000);
console.log("끝");

```


![image](https://user-images.githubusercontent.com/48818574/152928638-a239c9d7-53ec-4c1b-bf6d-b8cb88b5ea21.png)

  * Event loop 
    - 이벤트 발생 시 호출할 콜백 함수를 관리 
    - 호출된 콜백 함수의 실행 순서를 결정하는 역할 
  
  * Background
    - setTimeout 같은 타이머나 이벤트 리스너들이 대기하는 곳 
  
  * Task Queue
    - 이벤트 발생 후 백그라운드에서 Task Queue로 타이머나 이벤트 리스너의 콜백 함수를 보냄 
  
  * anoymous 
    - 전역 컨텍스트
    - 함수가 호출되었을 때 생성되는 환경을 의미
  
호출 스택에 들어간 순서와 반대로 실행되므로 setTimeout이 먼저 실행됩니다. setTimeout이 실행되면 타이머와 함께 run 콜백을 백그라운드로 보내고 setTimeout은 호출 스택에서 빠집니다. 그 다음으로 anonymous 가 호출스택에서 빠지고 백그라운드에서는 3초를 센후 run 함수를 태스크 큐에 보냅니다. 
 
![image](https://user-images.githubusercontent.com/48818574/152929421-c16494b0-d07b-4e02-a78d-bf1b3acd23f9.png)

호출스택에서 anonymous까지 빠지면 호출스택이 비어 있게 되고 이벤트 루프는 호출 스택이 비어 있으면 태스크 큐에서 함수를 하나씩 가져와 호출 스택에 넣고 실행합니다. 만약 호출 스택에 함수들이 너무 많이 들어있어서 3초후에도 호출 스택에 함수가 있다면 3초가 지난 후에도 run함수가 실행되지 않을 수도 있습니다. 



## 논 블로킹I/O
 논 블로킹이란 이전 작업이 완료될 때까지 대기하지 않고 다음 작업을 수행함을 뜻한다. 
 노드는 I/O작업을 백그라운드에 넘겨서 동시에 처리하곤 한다. 따라서 동시에 처리될 수 있는 작업들은 최대한 묶어서 백그라운드로 넘겨야 시간을 절약할 수 있다. 
 
 * 블로킹 방식의 코드
```javascript 
 function longRunningTask(){
  console.log('작업 끝');
 }
 console.log("시작");
 longRuningTask();
 console.log("끝");
```
 
 
 * 논블로킹 방식의 코드 
 ```javascript
 function longRunningTask(){
  console.log("작업 끝");
 }
 console.log("시작");
 setTimeout(longRuningTask, 0);
 console.log("끝");
 
```

setTimeout(콜백, 0)은 코드를 논 블로킹으로 만들기 위해 사용하는 기법중 하나입니다. 위의 예제에서 보듯이 setTimeout의 콜백 함수인 longRunningTask가 태스크 큐에 보내지므로 순서대로 실행되지 않는다는 것을 알 수 있습니다. 


## 싱글 스레드 
노드는 싱글 스레드로 운영되고 있습니다. 하지만 엄밀히 말하면 싱글 스레드로 동작하지는 않습니다. 
* 노드 실행과정 
  1. 노드를 실행하면 프로세스 하나 생성 
  2. 내부적으로 스레드를 여러개 생성 
    * 하지만 그중에서 직접 제어할 수 있는 스레드는 하나뿐 -> 따라서 '싱글스레드'로 불림 
* Process
 - 운영체제에서 할당하는 작업의 단위 
 - 프로세스 간 메모리, 자원을 공유 X
  
* Thread
  - 프로세스 내에서 실행되는 흐름의 단위 
  - 부모 프로세스의 자원을 공유
  - 같은 주소의 메모리에 접근 가능하므로 데이터 공유가능


---------------------------------------
# 알아두어야 할 자바스크립트 
## ES2015 

### 템플릿 문자열 
```javascript
const num1 = 1;
const num2 = 1;
const num3 = 2;
const string1 = `${num1} 더하기 ${num2} 는 ${num3}`
```

### 객체 리터럴 

 * 이전에 객체에 동적으로 속성을 추가하는 방식
 
```javascript
var sayNode = function(){
  console.log("Node");
}
var es = "ES";
var oldObject = {
  sayJS: function(){
    console.log("JS")
  },
  sayNode: sayNode
}

oldObject[es+6]= 'Fantastic';
oldObject.sayNode();
oldObject.sayJS();
console.log(oldObject["ES6"]);
```
  
  * 바뀐 부분 
```javascript
const newObject = {
  sayJS(){
    console.log("JS")
  }
  sayNode,
  [es+6]= "Fantastic"
};
newObject.sayNode();
newObject.satJS();

```

### 화살표 함수

```javascript
function add1(x,y){
  return x+y;
}

function add2 = (x,y) =>{
  return x+y;
}

function add3 = (x,y) => x+y;
function add4 = (x,y) => (x+y);
```

```javascript
var relationship = {
  name: 'zero',
  friends: ['jjw','jjw','jjw'],
  logfriends = function(){
    var that = this;
    this.friends.foreach(function(friend){
      console.log(that.name, friend);
    });
  }

};

const relationship2 ={
  name: 'zero',
  friends: ['jjw','jjw','jjw'],
  logfriend() {
    this.friends.foreach(friend => {
      console.log(this.name, friend);
    });
  
  }
}
```

### 구조분해 할당 
```javascript
var candymachine = {
  status: {
    name: 'node',
    count : 5
  },
  getCandy:function(){
    this.status.count--;
    return this.status.count;
  }
}

candymachine.getCandy();
candymachine.status.count;

const candyMachine = {
  status: {
    name: 'node',
    count: 5
  },
  getCandy() {
    this.status.count--;
    return this.status.count;
  }
}

const {getCandy, status:{count}} = candyMachine;

```

## 클래스 
nodeJS는 다른 언어처럼 클래스 기반으로 동작하는 것이 아니라 여전히 프로토타입 기반으로 동작합니다. 

```javascript 
var Human = function(type){
  this.type = type || 'human';  
}
Human.isHuman = function(human){
  return human instanceof Human;
}

Human.prototype.breath = function(){
  alert('h-a-a-a-m');
}


var Zero = function(type, firstName, lastName){
  Human.apply(this,argument);//상속받는 부분
  this.firstName = firstName; 
  this.lastName = lastName;
}

Zero.prototype = Object.create(Human.prototype);
Zero.prototype.constructor = Zero; //상속하는 부분
Zero.prototype.sayName = function(){
  alert(this.name + "" + this.lastName);
}
var oldZero = new Zero('human', 'Zero', 'Cho');
```
Human생성자 함수가 있고 그 함수를 Zero 생성자 함수가 상속, Zero 생성자 함수를 보면 상속받기 위한 코드가 상당히 난해함


```javascript 
class Human {
  constructor(type= 'human'){
    this.type = type;
  }
  
  static isHuman(human){
    return human instanceof Human;
  }
  
  breath(){
    alert('h--a-a-m');
  }
}

class Zero extends Human{
  constructor(type, firstName, lastName){
    super(type);
    this.firstName = firstName;
    this.lastName = lastName;
  }
  sayName(){
    super.breath();
    alert(`${this.firstName} ${this.lastName}');
  }
}

const newZero = new Zero('human', 'Zero', 'Cho');
Human.isHuman(newZero);
```

전반적으로 class안으로 그룹화된 것을 볼 수 있다. 생성자 함수는 constructor안으로 들어갔고 Human.isHuman 같은 클래스 함수는 static 키워드로 전환되었고 프로토타입 함수들도 모두 class안으로 포함되어 어떤 함수가 어떤 클래스 소속인지 보기 쉽다. 상속도 간단해져서 extends 키워드로 쉽게 상속한다. 다만, 이렇게 클래스 문법이 바뀌었지만 Javascript는 프로토타입 기반으로 동작한다는 것을 기억할 것 


### 프로미스 
자바스크립트와 노드에서는 주로 비동기를 접한다. 특히 이벤트 리스너를 사용할 때 콜백 함수를 사용한다. ES2015부터는 자바스크립트와 노드의 API들이 콜백함수 대신 Promise기반으로 재구성되며 악명 높은 콜백지옥현상을 극복했다는 평가를 받고 있다. 다음은 Promise의 규칙이다. 

```javascript
const condition = true;
const promise = new Promise((resolve, reject) =>{
  if(condition){
    resolve("성공");
  }else{
    reject("실패");
  }
});
promise
  .then(msg)=>{
    console.log(msg);// 성공(resolve)한 경우 실행
  })
  .catch((error)=>{
    console.error(error)//error한 경우 실행
  })
  .finally(()=>{ //다 끝나고 실행
    console.log("무조건");
  })

```

new Promise를 통해 프로미스를 생성할 수 있으며 그 내부에 resolve와 reject를 매개변수로 갖는 콜백함수를 넣는다. 이렇게 만든 promise변수에 then과 catch 메서드를 붙일 수 있다. 프로미스 내부에서 resolve가 호출되면 then이 실행되고 reject가 호출되면 catch가 실행된다. finally 부분은 성공/실패의 여부와 상관없이 실행된다. 

resolve와 reject에 넣어준 인수는 각각 then, catch의 매개변수에서 받을 수 있다. 즉, resolve('성공')이 호출되면 then의 message가 '성공'이 된다. 

프로미스를 쉽게 설명하면 '실행은 바로하되 결괏값은 나중에 받는 객체'이다. 결괏값은 실행이 완료된 후에 then이나 catch메서드를 통해 받는다. 위 예제에서는 new Promise와 promise.then사이에 다른 코드가 들어갈 수 있다. 

```javascript
promise.then((message)=>{
  return new Promise((resolve, reject) => {
    resolve(message);
  });
})
.then((message2)=>{
  return new Promise((resolve, reject) = > {
    resolve(message2);
  });
})
.then((message3) => {
  console.log(message3);
})
.catch((error)=>{
  console.error(error);
});

```
처음 then에서 message를 resolve하면 다음 then에서 message2로 받을 수 있다. 여기서 다시 message2를 resolve한 것을 다음 then에서 message3으로 받는다. 단, then에서 new Promise를 return해야 다음 then에서 받을 수 있다. 

## 프론트엔드 자바스크립트
### AJAX(Asynchronous Javascript And XML)
Ajax는 비동기적 웹 서비스를 개발할 때 사용하는 기법이다. 이름에 XML이 들어있지만 반드시 XML을 사용해야하는건 아니고 최근에는 JSON도 많이 쓴다. AJAX를 쉽게 말하면 페이지 이동없이 서버에 요청을 보내고 응답을 받는 기술이다. 보통 AJAX요청은 jQuery나 axios같은 라이브러리를 이용해서 보낸다. 브라우저에서 기본적으로 XMLHttpRequest객체를 제공하긴 하나, 사용 방법이 복잡하고 서버에서는 사용할 수 없다.

프론트에서 사용하기 위해서는 html파일에 script 태그를 넣어줘야한다. 
```html
<script src = "https://upkg.com/axios/dist/axios.min.js"></script>
<script>
  axios.get("https://www.zerocho.com/api/get")
    .then((result)=>{
      console.log(result);
    })
    .catch(err){
       console.log(err);
    }
</script>
```
axios.get도 내부에 new Promise가 들어 있으므로 then과 catch를 사용할 수 있다. Promise패턴을 async/await으로 바꿔보자

*GET통신
```javascript
(async() = > {
  try{
    const result = await axios.get("https://www.zerocho.com");
    console.log(result.data);
  }catch(e){
    console.error(error);
  }
})();
```
이번엔 POST 통신이다.


*POST통신
```javascript
(async() = > {
  try{
    const result = await axios.post("https://www.zerocho.com", {
      name:'jjw',
      birth:1994
    });
    console.log(result.data);
  }catch(e){
    console.error(error);
  }
})();
```

### FORMDATA

HTML form태그의 데이터를 동적으로 제어할 수 있는 기능이다. 주로 AJAX와 함께 사용된다. 먼저 FormData 생성자로 formData객체를 만든다. 

```javascript
const formData = new FormData();
formData.append('name','jjw');
formData.append('item','123');
formData.append('item','1234');
formData.get('item')//123
formData.getall('item')//[123,1234]
```

이제 axios를 통해서 폼 데이터를 서버에 보내보자.

```javascript
(async() => {
  try{
    const formData = new FormData();
    formData.append('name', 'jjw');
    
    const result = await axios.post("https://www.zerocho.com/api/post/formData", formData);
    console.log(result.data);
  }catch(e){
  
  }

})();

```

### 데이터 속성과 dataset

노드를 웹 서버로 사용하는 경우, 클라이언트와 빈번하게 데이터를 주고받게 된다. 이때 서버에서 보내준 데이터를 프론트엔드 어디에 넣어야 할지 고민하게 된다.  HTML5에도 HTML에 데이터를 저장하는 공식적인 방법이 있다.바로 데이터 속성이다. 


```html
<ul>
  <li data-id = "1" data-user-job = "programmer">Zero</li>
  <li data-id = "2" data-user-job = "programmer1">Zero</li>
  <li data-id = "3" data-user-job = "programmer2">Zero</li>
  <li data-id = "4" data-user-job = "programmer3">Zero</li>
</url>

<script>
  console.log(document.querySelector('li').dataset);
  //{id:1, userJob:"programmer"}
</script>
```




