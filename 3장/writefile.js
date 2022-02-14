
const fs = require('fs').promises;



fs.writeFile('./writeFile.txt', '글이 입력됩니다.')
    .then(()=>{
            return fs.readFile('./writeFile.txt');
    })
    .then((data)=>{
        console.log(data);
        console.log(data.toString());
        
    })
    .catch((err)=> {
        throw err;
    })
