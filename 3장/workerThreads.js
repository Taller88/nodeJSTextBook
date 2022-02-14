// workerThread는 멀티 쓰레드를 사용하는 방식 
// cpu를 많이 써야하는 crypto나 압축

const {Worker, isMainThread, parentPort, workerData} = require('worker-threads');
// 14버전 부터 가능

if(isMainThread){ // 메인쓰레드 
    // 메인쓰레드에서 일을 여러개 생성후 워커쓰레드에 분배 
    const threads = new Set();
    threads.add(new Worker(__filename,{
        workerData:{start:1},
    } ))
    threads.add(new Worker(__filename,{
        workerData:{start:1},
    } ))
    
    for(let worker of threads){
        worker.on('message', (value) => console.log('워커로부터 ', value));
        worker.on('exit', () => {
            threads.delete(worker);
            if(threads.size === 0){
                console.log('워커 끝~')
            }
        });
    
    }
    worker.postMessage('ping');

}else{// 워커쓰레드
    const data = workerData;
    parentPort.postMessage(data.start+ 100);

    parentPort.on('message', (value) => {
        console.log('부모로 부터', value);
        parentPort.postMessage('pong');
        parentPort.close();
    })
}