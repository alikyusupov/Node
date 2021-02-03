const http = require("http");

const cp = require('child_process'); 

const child = cp.fork('./child.js'); 

const server = http.createServer((req, res)=>{
	child.send({ //методу send передается объект, который будет передан дочернему процессу 
	    method: req.method, //свойство хранит http метод присланного запроса 
	    params: req.url //свойство хранит url присланного запроса 
  	}); 
	let output = "все хорошо"
	res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
	res.write(output, "utf-8");
	res.end();
})

server.listen(8080,()=>{
	console.log("Сервер запущен...")
})