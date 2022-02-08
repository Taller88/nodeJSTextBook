/**
 * 함수 세개를 올렸다 -> 메모리에 함수를 올렸다.
 *  메모리는 임시 저장장치 
 *  
 * 
 * 기본적으로 파일이 실행될 때는 anoymous가 Stack(LIFO - Last In First out)에 쌓임
 * 
 * * 호출스택 
 *  - 파일이 실행되면 anonymous가 쌓이고 
 *  - 함수들이 쌓임 
 *  - 호출스택은 동기실행 
 * 
 * 
 * * 비동기코드 : setTimeout 
 *      메모리에 잠깐 콜백함수 저장 
 * 
 * 
 *  
 * 
 * ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 * 이벤트 루프 
 * 
 *      [호출스택]                [백그라운드:비동기] -> 다른 쓰레드로 실행
 *  -                           - 타이머(run, 3초)
 *  - 1. console.log("끝")      - 
 *  - 2. console.log("시작")    -
 *  - 3. anonymous              -
 * 
 *              <이벤트 루프>
 *                      [테스크 큐] / 마이크로 테스크큐
 *                      - 3초후 run함수 담음
 * 
 * ** 3까지 완료되었을때 호출스택 비어있음 -> 테스크큐에 담긴 run함수를 호출스택으로 이벤트 루프가 옮겨줌
 * ** 노드에서 백그라운드로 가는 건 몇가지만 허용을 해놓고 나머지는 제한 
 *  네트워크관련, 암호화 
 * 메모리 
 *  - run
 */

function oneMore(){
    console.log("one more");
}

function init(){
    console.log("run run");
    setTimeout(()=>{
        console.log("setTimeout")
    },0);
    new Promise((resolve) => { // 테스크 큐에서 Promise의 then을 만나면 백그라운드로 이동 
                                // setTimeout이 먼저 백그라운드로 갔지만
                                // 테스크큐에서 then은 timer보다 먼저 호출 스택으로 이동
        resolve('hi');
    }).then(console.log);
    oneMore();
}


/**


* [호출스택] -> Javascript       [백그라운드] C++/운영체제<- libuv
 * run()                             
 * setTimeout(run, 5000)        -> 타이머 run 5초
 *                              -> 티이머 0초 
 * anonymous
 * 
 *                              [테스크큐] <- libuv
 *                                  run -> 이벤트 루프에 의해 비어있으면 호출스택으로 이동
 */


