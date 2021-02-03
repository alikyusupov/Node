const http = require("http")

const fs = require("fs")

const server = http.createServer((req, res)=>{

	let output = ""

	fs.readFile("./header.html","utf8",(err, data)=>{
		if(err) {
			console.log('Could not find or open file for reading\n');
			res.statusCode = 404;
			res.end();
		}
		else{
			output += data;
			fs.readFile("./main.html","utf8",(err, data)=>{
				if(err){
					console.log('Could not find or open file for reading\n');
					res.statusCode = 404;
					res.end();
				}
				else{
					output += data;
					fs.readFile("./footer.html","utf8",(err, data)=>{
						if(err){
							console.log('Could not find or open file for reading\n');
							res.statusCode = 404;
							res.end();
						}
						else{
							output += data;
							console.log(`The file ... is read and sent to the client\n`);
							res.writeHead(200, {'Content-Type':'text/html'});
							res.end(output);
						}
					})
				}
			})
		}
	})
})


server.listen(8080, ()=>{
	console.log("HTTP server works in 8080 port!\n");
})