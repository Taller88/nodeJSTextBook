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






