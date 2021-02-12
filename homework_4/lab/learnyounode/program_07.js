const http = require("http")

http.get(process.argv[2], res=>{
	let str = "";
	res.setEncoding("utf8");
	res.on("data", chunk=>{
		str += chunk;
	})
	res.on("error",err=>{
		console.log("что то пошло не так")
	})
	res.on("end",()=>{
		console.log(str.length)
		console.log(str)
	})
})
