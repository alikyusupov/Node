function pause(fn, delay){
	return function(){
		setTimeout(function(){
			fn.apply(this, arguments);
		},delay)
	}
}

function logger(){
	console.log(`Функция выполниться с задержкой в 2 секунды!`)
}

let paused = pause(logger, 2000);

paused();

/************************/


function return_object(fn, ...args) {
  return function () {
    let o = {};
    let counter = 0;
    let arr = fn(args);
    for (let arg of args) {
      o[arg] = arr[counter++];
    }
    return o;
  };
}

function func() {
  return ["JS", "is", "programming language"];
}
let n = return_object(func, "a", "b", "c")();


console.log(n.c); // 'programming language'

