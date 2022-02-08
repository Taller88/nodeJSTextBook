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

### const, let 
보통 자바스크립트를 배울 때는 var로 변수를 선언하는 방법부터 배웁니다. 하지만 var는 이제 const와 let이 대체합니다. 
<pre>
<code>
if(true){
  var x = 1;
}
console.log(x);
if(true){
  const y = 1;
}
console.log(y);
<code>
<pre>
## 프론트엔드 자바스크립트

