// fs
/**
 *  file System에 접근 가능 
 *      - 파일,폴더 생성 및 삭제 
 *      - 있는지 없는지 체크 가능 
 * 
 */
//  const fs = require('fs');
 const fs = require('fs').promises;
// fs - promise

// fs.readFile('./readme.txt', (err, data) => {
//     if(err){
//         throw err;
//     }
//     console.log(data); //<Buffer eb 82 b4 ec 9d b4 eb a6 84 ec 9d 80 20 ec a0 95 ec a7 84 ec 9a b0 2e 20>
//     console.log(data.toString());
    
// });


fs.readFile('./readme.txt')
    .then((data)=>{
        console.log(data); //<Buffer eb 82 b4 ec 9d b4 eb a6 84 ec 9d 80 20 ec a0 95 ec a7 84 ec 9a b0 2e 20>
        console.log(data.toString());
            
    })
    .catch((err)=> {
        throw err;
    })
