const http = require("http")

http.get(process.argv[2], res=>{
	let counter = 0;
	let str = "";
	res.on("data", "utf8", chunk=>{
		counter++;
		str += chunk;
	})
	res.on("error",err=>{
		console.log("что то пошло не так")
	})
	res.on("end",()=>{
		console.log(counter)
		console.log(str)
	})
})