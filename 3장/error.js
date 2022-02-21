// 예외 처리하기 

process.on('uncaugthtExcpetion', (err)=>{
    // 에러를 통해 멈추진 않음
    console.error('예기치 못한 에러', err);
});

set