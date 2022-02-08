# nodeJSTextBook
nodeJS 교과서 서적 copy 및 정리 respository


# nodeJS 핵심 개념 이해하기

> NodeJS란 Chrome V8 Javascript 엔진으로 빌드된 Javascript 런타임
  
  * 런타임이란 

    > 특정 언어로 만든 프로그램들을 실행할 수 있는 환경
    

## 자바 스크립트 런타임 

![image](https://user-images.githubusercontent.com/48818574/152919495-ef4e4440-e9cf-4985-8d99-0aeaa39c7a92.png)

* V8
 * 구글에서 크롬에서 사용하고 있는 엔진
 * C, C++로 개발
    
* libuv
 * 이벤트 기반, 논 블록킹 I/O 모델 구현
 * C, C++로 개발


## 이벤트 기반 

  * Event loop 
    - 이벤트 발생 시 호출할 콜백 함수를 관리 
    - 호출된 콜백 함수의 실행 순서를 결정하는 역할 
  
  * Background
    - setTimeout 같은 타이머나 이벤트 리스너들이 대기하는 곳 
  
  * Task Queue
    - 이벤트 발생 후 백그라운드에서 Task Queue로 타이머나 이벤트 리스너의 콜백 함수를 보냄 

```javascript
function run(){
  console.log("3초 후 실행")
}
console.log("시작");
setTimeout(run, 3000);
console.log("끝");

```

