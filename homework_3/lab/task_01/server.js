const http = require("http");

const fs = require("fs")

const server = http.createServer((req, res)=>{
	console.log(process.env)
	console.log(process.env.LANG == "ru")
	if(process.env.LANG == "ru"){
		fs.readFile("ru.html", "utf8", (err, data)=>{
			if(err){
				res.statusCode = 404;
				return res.end();
			}
			else{
				res.writeHead(200, {'Content-Type':'text/html'});
				res.write(data);
				res.end();
			}
		})
	}
	else if(process.env.LANG == "en"){
		fs.readFile("en.html", "utf8", (err, data)=>{
			if(err){
				res.statusCode = 404;
				return res.end();
			}
			else{
				res.writeHead(200, {'Content-Type':'text/html'});
				res.write(data);
				res.end();
			}
		})
	}
})
server.listen(process.env.PORT || 3000, ()=>{
	console.log("сервер запущен...")
})