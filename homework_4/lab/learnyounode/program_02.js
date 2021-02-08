const fs = require('fs');

const file = fs.readFileSync(process.argv[2]);

const str = String(file).split('\n');

console.log(str.length-1)




