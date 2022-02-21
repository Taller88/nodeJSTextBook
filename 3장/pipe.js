const fs = require('fs');

const readStream = fs.createReadStream('./readme3.txt');
const writeStream = fs.createWrtiteStream('./writeme3.txt');
readString.pipe(writeStream);
