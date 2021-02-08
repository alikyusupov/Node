const http = require("http")

const fs = require("fs")

const server = http.createServer((req,res)=>{
    let readable = fs.createReadStream(process.argv[3])
    readable.pipe(res)
})

const port = process.argv[2] || 3000;

server.listen(port,()=>{
    console.log("Server is running...")
})