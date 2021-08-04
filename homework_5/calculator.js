function RPN (seq_) {
    let seq = seq_.split(/\b(\s)/)
    
    if (seq.length <= 2) {
        console.log('Please enter valid RPN');
        return;
    }

    let operands = ['+', '-', '*', '/' ],
        stack = [],
        i = 0;

    while (i <= seq.length) {
        let item = seq[i];
        if (isNaN(item)) {
    	    let operandIndex = operands.indexOf(item);
            if (operandIndex == 0) {
                // pop the stack by removing the last element
                // splice mutates the array
                // let a = parseInt(stack.splice(-1)[0], 10),
                let a = parseInt(stack.pop(), 10),
                    b = parseInt(stack.pop(), 10);
                stack.push(a+b);
            }
            if (operandIndex == 1) {
                let a = parseInt(stack.pop(), 10),
                    b = parseInt(stack.pop(), 10);
                stack.push(b-a)
            }
            if (operandIndex == 2) {
                let a = parseInt(stack.pop(), 10),
                    b = parseInt(stack.pop(), 10);
                stack.push(a*b)
            }
            if (operandIndex == 3) {
                let a = parseInt(stack.pop(), 10),
                    b = parseInt(stack.pop(), 10);
                stack.push(b/a)
            }
      } else {
		stack.push(parseInt(item, 10));
      }
       i++
    }

    return stack[0];
};

//console.log(RPN(["2", "1", "+", "3", "*"])) // 9

function inputToString(_input){
    let input = _input.split(/(\s)/).join(" ")
    console.log(input)
    let outputStack = [];
    let opStack = [];
    for(char in input){
        if(isFinite(input[char])){
            outputStack.push(input[char])
        }
        else{
            if(!opStack.length){
                opStack.push(input[char])
            }
            else if(opStack.length && input[char] == "*"){
                if(opStack[opStack.length - 1] == "+"){
                    let popped = opStack.pop();
                    opStack.push(input[char])
                    outputStack.push(popped)
                }
            }
        }
    }
    return outputStack.concat(opStack)
    
}

console.log(inputToString("5 * 2 + 10"))
//[5,2,3,*,+]