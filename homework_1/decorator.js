function pause(fn, delay){
    return function(){
        setTimeout(function(){
            fn.apply(this, arguments)
        },delay)
    }
}

const logger = ()=>{
    console.log("Функция выполнилась через две секунды")
}

const paused = pause(logger, 2000)
paused()

function return_object(fn, ...args) {
    return function () {
      let o = {};
      let counter = 0;
      let arr = fn(...arguments);
      for (let arg of args) {
        o[arg] = arr[counter++];
      }
      return o;
    };
  }
  
  function func() {
    return ["JS", "is", "programming language"];
  }
  let n = return_object(func, "a", "b", "c")( );
  
  console.log(n)
  console.log(n.c); // 'programming language'

  function bind_(fn,context){
      return function(){
          return fn.apply(context, arguments)
      }
  }
  function someFn(){
      console.log(this.name)
  }
console.log(bind_(someFn,{name:"Alisher"})())


var timers = {};

// прибавит время выполнения f к таймеру timers[timer]
function timingDecorator(f, timer) {
  return function() {
    var start = Date.now();

    var result = f.apply(this, arguments); // (*)

    if (!timers[timer]){
        timers[timer] = 0
    }
    timers[timer] += Date.now() - start;

    return result;
  }
}

// функция может быть произвольной, например такой:
var fibonacci = function f(n) {
  return (n > 2) ? f(n - 1) + f(n - 2) : 1;
}

// использование: завернём fibonacci в декоратор
let fibonacci_ = timingDecorator(fibonacci, "fibo");


// неоднократные вызовы...
console.log( fibonacci_(30) ); // 832040
console.log( fibonacci_(30) )  // 832040
// ...

// в любой момент можно получить общее количество времени на вызовы
console.log( timers.fibo + 'мс' );//16мс