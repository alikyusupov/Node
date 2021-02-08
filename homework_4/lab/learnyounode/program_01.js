let sum = 0;
process.argv.splice(2, process.argv.length - 2)
	.forEach(n =>{
		sum += Number(n)
	})

console.log(sum)






