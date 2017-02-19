let MAX_SIZE: number = 100;

class CircularQueue<T> {
    front: number;
    rear: number;
    queue: T[];
    constructor() {
        this.front = -1;
        this.rear = -1;
        this.queue = new Array(MAX_SIZE)
    }
    isEmpty() {
        return (this.front === -1);
    }

    isFull() {
        var exp1 = this.front === this.rear + 1;
        var exp2 = (this.front === 0) && (this.rear === MAX_SIZE - 1);
        return exp1 || exp2 ;
    }

    enqueue(x: T) {
        if(this.isEmpty()) {
		    this.queue[++this.front] = this.queue[++this.rear] = x;
	    }
	    else if(this.isFull()) alert("Queue is full");
	
	    else {
		    if(this.rear === MAX_SIZE-1) {
			    this.rear = 0;
			    this.queue[this.rear] = x;
		    }
		    else this.queue[++this.rear] = x;
	    }
    }

    dequeue() {
	    if(this.isEmpty()) {
		    alert("Queue is empty");
	    }
	    else {
		    console.log(this.queue[this.front]);
		    if(this.front === this.rear) this.front = this.rear = -1;
		    else if(this.front === MAX_SIZE-1) this.front = 0;
		    else this.front++;
	    }
    }

    print() {
	    if(this.isEmpty()) alert("Queue is empty");
	    else {
		    if(this.front>this.rear) {
                for (var i = this.front; i <= MAX_SIZE - 1; i++)
                    console.log(this.queue[i], " ");
                for (var i = 0; i <= this.rear; i++)
                    console.log(this.queue[i], " ");
		    }
		    else {
                for (var i = this.front; i <= this.rear; i++)
                    console.log(this.queue[i], " ");
		    }
	    }
    }
   
}

