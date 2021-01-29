const fs = require("fs");

const file = fs.readFile("data.txt", "utf8",(err, data)=>{
	if(err){
		console.log(err)
	}
	else{
		let arr = data.split(" ");
		arr.forEach(el=>{
			if(el % 2 === 0)
				fs.writeFile("output1.txt",`${el} `,{flag:"a"}, err=>console.log(err))
			else
				fs.writeFile("output2.txt", `${parseFloat(el*el*el)} `,{flag:"a"}, err=>console.log(err))
		})
	}
});

