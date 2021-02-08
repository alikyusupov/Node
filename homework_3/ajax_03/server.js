const http = require("http");

const fs = require("fs");

const path = require("path");


let mimeTypes = {
	'.js': 'text/javascript',
	'.html': 'text/html',
	'.css': 'text/css',
	'.jpg': 'image/jpeg',
	'.gif': 'image/gif',
    '.ico': 'image/x-icon',
    '.json':'application/json'
};

const server =  http.createServer((req, res)=>{

	let baseURL = 'http://' + req.headers.host + '/';

	let myURL = new URL(req.url, baseURL);

    let pathname, extname, mimeType;

    if(req.url === "/")
        pathname = "index.html";
    else
		pathname = myURL.pathname.replace("/","");
	
    extname = path.extname(pathname);
	mimeType = mimeTypes[extname];
	
		fs.readFile(pathname, 'utf8', (err, data) => {
			if (err) {
				console.log('Could not find or open file for reading\n');
				res.statusCode = 404;
				res.end();
			} else {
				console.log(`The file ${pathname} is read and sent to the client\n`);
				res.writeHead(200, {'Content-Type': mimeType});
				if(mimeType == "application/json"){
					let start = myURL.searchParams.get("start")
					let skip = myURL.searchParams.get("skip")
					let parsedProducts = JSON.parse(data)
					res.end(JSON.stringify(parsedProducts.splice(+start,+skip)));
				}
				else{
					res.end(data);
				} 	
			}
		});
})

server.listen(3000, ()=>{
    console.log("Сервер 2 запущен ...")
})