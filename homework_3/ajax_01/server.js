const http = require("http");

const fs = require("fs")

const server =  http.createServer((req, res)=>{

    let pathname;

    if(req.url === "/")
        pathname = "index.html";
    else
        pathname = req.url.replace("/","");

    fs.readFile(pathname,"utf8",(err, data)=>{
        if(err){
            console.log("Ошибка чтения файла");
            res.statusCode = 404;
            res.end();
        }else{
            res.writeHead(200,{"Content-Type":"text/html"})
            res.end(data)
        }
    })
})

server.listen(3000, ()=>{
    console.log("Сервер запущен...")
})