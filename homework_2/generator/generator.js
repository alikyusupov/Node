

const alphaBetArray = 	['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
						'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','p','Q','R','S','T','U','V','W','X','Y','Z'];

const specCharArray = 	['!','£','$','%','&','@','~','#','>','<'];

const numberArray 	= 	['1','2','3','4','5','6','7','8','9','10'];

function* passwordGen(limit){

	let randomPWD = '';
	while(randomPWD.length < 16){
		if (randomPWD.length < 5)
			randomPWD += alphaBetArray[Math.floor(Math.random()*alphaBetArray.length)]
		else if (randomPWD.length >= 5 && randomPWD.length < 10)
			randomPWD += specCharArray[Math.floor(Math.random()*specCharArray.length)]
		else 
			randomPWD += numberArray[Math.floor(Math.random()*numberArray.length)]
	}
	yield randomPWD
	
}

let pwd = passwordGen(16)

console.log(pwd.next().value)
