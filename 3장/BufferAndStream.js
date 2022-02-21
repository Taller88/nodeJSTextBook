/**
 * 버퍼와 스트림 
 *  - 버퍼 == 파일 사이즈: 일정한 크기가 되면 한 번에 처리 
 *      
 *  - 버퍼링: 버퍼에 데이터가 찰 때까지 모으는 작업 
 *  ex) 16KB한번에 모아서 한번에 전송 
 * 
 *  - 스트림 : 일정한 크기로 나눠서 여러번 걸쳐서 처리 
 *      서버에 효율적 


*/


const buffer = Buffer.from('저를 버퍼로 바꿔보세요,.')
console.log(buffer);
console.log(buffer.length);
console.log(buffer.toString());

const arr = [Buffer.from('띄엄'),Buffer.from('띄엄'),Buffer.from('띄엄'),Buffer.from('띄어쓰기')];
console.log(Buffer.concat(arr).toString())

// 아무것도 안들어있는데 5바이트 만들기 
console.log(Buffer.alloc(5));