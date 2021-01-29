const http = require("http")

const fs = require("fs")

const server = http.createServer((req, res)=>{

	const STREAM_1 	= fs.createReadStream(__dirname + "/header.html",{encoding:"utf8"})

	const STREAM_2 	= fs.createReadStream(__dirname + "/main.html",{encoding:"utf8"})//Увеличил размер файла чтобы проверить очередность

	const STREAM_3 	= fs.createReadStream(__dirname + "/footer.html",{encoding:"utf8"})

	const OUTPUT 	= fs.createWriteStream(__dirname + "/index.html",{encoding:"utf8"})

	STREAM_1.on("data",(chunk)=>{
		OUTPUT.write(chunk)
	})

	STREAM_2.on("data",(chunk)=>{
		OUTPUT.write(chunk)
	})

	STREAM_3.on("data",(chunk)=>{
		OUTPUT.write(chunk)
	})

	STREAM_3.on("end",()=>{
				fs.readFile("index.html","utf-8",(err, data)=>{
				if(err){
					console.log('Could not find or open file for reading\n');
					res.statusCode = 404;
					res.end();
				}else{
					console.log(`The file ... is read and sent to the client\n`);
					res.writeHead(200, {'Content-Type':'text/html'});
					res.end(data);
				}
			})
		})
	})
	

server.listen(8080, ()=>{
	console.log("HTTP server works in 8080 port!\n");
})