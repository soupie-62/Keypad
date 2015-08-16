// ==========================================
// My code for implementing an RPN calculator
//
// This will probably change a lot
// ==========================================


var myStack = {
	x: 0,
	y: 0,
	z: 0,
	t: 0,
	L: 0
};

myStack.push = function (value) {
	t = z;
	z = y;
	y = x;
	x = value;
};

myStack.swap = function () {
	var temp = x;
	x = y;
	y = temp;
};

myStack.pop = function () {
	L = x;
	x = y;
	y = z;
	z = t;
	t = 0;
	return L;
};

// ------------------------------- Show Stack
myStack.showStack = function () {
	console.log(t);
	console.log(z);
	console.log(y);
	console.log(x);
};



// ------------------------------- Basic Math
// --- Add: Augend + Addend -----------------
var add = function() {
	var result = pop() + pop();
	push(result);
	return(result);
};

// --- Sub: Minuend - subtrahend -------------
var sub = function() {
	// result = y - x : need to swap order
	swapXY();
	var result = pop() - pop();
	push(result);
	return(result);
};

// --- Mult: Multiplicand x multiplier -------
var sub = function() {
	var result = pop() * pop();
	push(result);
	return(result);
};

// --- Div: dividend / divisor ---------------
// Basic error detection, for divide by zero
// -------------------------------------------
var sub = function() {
	// result = y / x : need to swap order
	swapXY();
	var result = pop();
	var x = pop();
	if (x === 0) {
		return ("Error");
	}
	result = result / x;
	push(result);
	return(result);
};

// --- Inv: 1/X ----------------------------
var invert() = function {
	var x = pop();
	if (x === 0) {
		return ("Error");
	}
	x = 1/x;
	push(result);
	return(result);
}
	

