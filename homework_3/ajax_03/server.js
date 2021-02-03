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
let reqStatus = false;

const server =  http.createServer((req, res)=>{

    let pathname, extname, mimeType;

    if(req.url === "/")
        pathname = "index.html";
    else
		pathname = req.url.replace("/","");
	
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
					let parsedProducts = JSON.parse(data)
					if(!reqStatus){
						res.end(JSON.stringify(parsedProducts.splice(4,4)))
						reqStatus = true;
					}else{
						res.end(JSON.stringify(parsedProducts.splice(0,4)));
						reqStatus = false;
					}
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