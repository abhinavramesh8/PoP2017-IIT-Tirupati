// using generics so that Stack works with any data type

class Stack<T> { 
    top: number;
    stack: T[];
    constructor() {
        this.top = -1;
    }
    isEmpty() {
        return (this.top === -1);
    }
    push(x: T) {
        this.top = this.stack.push(x) - 1;
    }
    pop() {
        if (this.isEmpty()) alert("Stack is empty");
        else {
        	this.top--;
            return (this.stack.pop);
        }
    }
    returnTop() {
        if (this.isEmpty()) alert("Stack is empty");
        else return(this.stack[this.top]);
    } 
}

let newStack = new Stack<string>();

let parentheses = document.createElement('input');
let str: string = parentheses.value;
let i: number;
let flag: boolean = true;

for (i = 0; i < str.length; i++) {
    if (str[i] === "(") newStack.push(str[i]);
    else {
        if (newStack.isEmpty()) {
            flag = false;
            break;
        } 
        else
            newStack.pop(); 
    }
}
if ((newStack.isEmpty()) && flag) alert("Matched");
else alert("Unmatched");
