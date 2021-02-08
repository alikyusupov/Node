const http = require("http")

const server = http.createServer((req,res)=>{
    if(req.method === "POST"){
        let data = "";
        req.on("data",chunk=>{
            data += chunk.toString().toUpperCase()
        })
        req.on("end",()=>{
            res.end(data)
        })
    }else{
        return res.end("only post method!")
    }

})

const port = process.argv[2] || 3000;

server.listen(port,()=>{
    console.log("Server is running...")
})