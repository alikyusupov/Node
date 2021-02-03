const fs = require("fs");

const file = fs.readFile("data.txt", "utf8",(err, data)=>{
	if(err){
		console.log(err)
	}
	else{
		let arr = data.split(" ");
		let evens = "";
		let cubic = "";
		arr.forEach(el=>{
			if(el % 2 === 0){
				evens += `${el} `
			}
			else{
				cubic += `${el*el*el} `
			}
		})
		fs.writeFile("output1.txt", evens.trim(), {flag:"a"}, err=>console.log(err))
		fs.writeFile("output2.txt", cubic.trim(), {flag:"a"}, err=>console.log(err))
	}
});

