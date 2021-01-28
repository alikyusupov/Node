const http = require('http'); // подключение модуля http

const fs = require('fs'); // подключение модуля для работы с файлом

const header = fs.readFileSync('header.html', 'utf8');

const main = fs.readFileSync('main.html', 'utf8');

const footer = fs.readFileSync('footer.html', 'utf8');


fs.appendFileSync('index.html', header);
fs.appendFileSync('index.html', main);
fs.appendFileSync('index.html', footer);



const server = http.createServer((req, res)=>{
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

server.listen(8080, ()=>{
	console.log("HTTP server works in 8080 port!\n");
})
