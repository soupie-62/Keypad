/*jslint -W033, -W061, browser:true, devel:true, white:true, vars:true, eqeq:true */

/*global $:false, intel:false, xpnt:false*/

/*
 * Copyright (c) 2012, Intel Corporation. All rights reserved.
 
* File revision: 04 October 2012
 
* Please see http://software.intel.com/html5/license/samples 
 
* and the included README.md file for license terms and conditions.
 */

var calc;

var CLEAR = "0.00";

var ZERODOT = "0.";

var STACKSIZE = 3;		
// Button Strings - for clarity, some functions are

			// associated with const global vars
			
// y is top of stack, x is currently displayed number

var FN = "Fn"; 		// Fn button

var ROLLUP = "R&uarr;" 	// Roll through stack up

var ROLLDN = "R&darr;" 	// Roll through stack down



function NumButton(n) {
    
	this.text = "<span class='btnNumText btnFont'>" + n + "</span>"
    
	this.fcn = function() {	calc.display.num(n)
    	}

}	
//Optional second arg, in case you want to format op,

	//i.e. &ndash in place of '-'



function BinopButton(o, plain) {
    
	this.text = "<span class='btnMathText btnFont'>" + o + "</span>"

	if (plain) {	o = plain
    }
	this.fcn = function() {
        calc.keypad.binaryOp(o)
    }

}



function make_layouts(pad, display, stack) {
	//Button Layouts

					// Chrome (webkit) doesn't support mathml

					//  [ {text:"<math><msqrt><mi>x</mi></msqrt></math>", 
	fcn: function () { pad.unaryOp(Math.sqrt)}},		//  [ {text:"sqrt", 
	fcn: function () { pad.unaryOp(Math.sqrt)}},		//  [ {text:"&radic;<span style='text-decoration:overline;'>x</span>",
	fcn: function () { pad.unaryOp(Math.sqrt)}},		//  [ {text:"&radic;<span style='margin-left:-0.08em; font-size:80%; border-top:0.25ex solid;'>x</span>",
	fcn: function () { pad.unaryOp(Math.sqrt)}},

	var oneLayout = [
        [{  text: "<span class='btnThemeText btnFont'>theme</span>",
	fcn: pad.toggleTheme
        },
			{    text: "<span class='btnFnText btnFont'>R&uarr;</span>",
        	fcn: function() {
   stack.rollup(display)
       }     },
			{    text: "<span class='btnFnText btnFont'>R&darr;</span>",	fcn: function() {
   stack.rolldown(display)
  }
     },
			{    text: "<span class='btnFnText btnFont'>e</span>",		fcn: function() {
   pad.pushConst(Math.E)
      }
   },
			{    text: "<span class='btnFnText btnFont'>ln</span>",
 	fcn: function() {
   pad.unaryOp(Math.log)
 }
    }],


		        	[{
  text: "<span class='btnFnText btnFont'>Sin<sup>-1</sup></span>",	fcn: function() {
   pad.unaryOp(Math.asin) }   },
			{   text: "<span class='btnFnText btnFont'>Cos<sup>-1</sup></span>",
	fcn: function() {
   pad.unaryOp(Math.acos)
  }
  },
			{   text: "<span class='btnFnText btnFont'>Tan<sup>-1</sup></span>",
	fcn: function() {
   pad.unaryOp(Math.atan) }  },
			{   text: "<span class='btnFnText btnFont'>Round</span>",
		fcn: function() {
   pad.unaryOp(Math.round)
 }  },
			{   text: "<span class='btnFnText btnFont'>&pi;</span>",
		fcn: function() {
   pad.pushConst(Math.PI)    }  }],


			[{  text: "<span class='btnFnText btnFont'>Sin</span>",	fcn: function() {
   pad.unaryOp(Math.sin)   }    },
			{   text: "<span class='btnFnText btnFont'>Cos</span>",
 	fcn: function() {
   pad.unaryOp(Math.cos)
  }    }, 
			{   text: "<span class='btnFnText btnFont'>Tan</span>",
	fcn: function() {
   pad.unaryOp(Math.tan)
   }
    },
			{   text: "<span class='btnFnText btnFont'>Ceil</span>",
	fcn: function() {
   pad.unaryOp(Math.ceil)   }
    },
			{   text: "<span class='btnFnText btnFont'>Floor</span>",	fcn: function() {   pad.unaryOp(Math.floor) }     }],


			[{
 text: "<span class='btnFnText btnFont'><span style='font-size:138%;'>&radic;</span>
				<span style='margin-left:-0.075em; border-top:0.25ex solid;'>x</span></span>",

										fcn: function() {
   pad.unaryOp(Math.sqrt)
  }    },
			{  text: "<span class='btnFnText btnFont'>x&harr;y</span>",		fcn: pad.xchng
 },
			{  text: "<span class='btnFnText btnFont'>y<sup>x</sup></span>",
	fcn: pad.xpnt
   },
			{  text: "<span class='btnFnText btnFont'>|x|</span>",
			fcn: function() {
   pad.unaryOp(Math.abs)   }
    },
			{  text: "<span class='btnFnText btnFont'><sup>1</sup>&frasl;<sub>x</sub></span>",
 	fcn: pad.nvrs
 }],


			[{ text: "<span class='btnMathText btnFont'>%</span>",
            fcn: pad.percent
        },
        new NumButton("7"), new NumButton("8"), new NumButton("9"), new BinopButton("+")],
        [{
            text: "<span class='btnMathText btnFont'>+/&ndash;</span>",
            fcn: display.chs
        },
        new NumButton("4"), new NumButton("5"), new NumButton("6"), new BinopButton("&ndash;", "-")],
        [{
            text: "<span class='btnRetText btnFont'>&crarr;</span>",
            fcn: pad.enterButton
        } /*&crarr;*/ , new NumButton("1"), new NumButton("2"), new NumButton("3"), new BinopButton("*", "*")],
        [{
            text: "<span class='btnClrText btnFont'>Clr</span>",
            fcn: display.clear
        }, {
            text: "<span class='btnClrText btnFont'>&larr;</span>",
            fcn: display.bspace
        },
        new NumButton("0"), new NumButton("."), new BinopButton("&divide;", "/")], ];
    return [oneLayout];
    //return [layout, Fnlayout];
}
//Keyboard

function isbinaryop(x) {
    switch (x) {
    case '+':
    case '-':
    case '*':
    case '/':
        return true;
    }
    return false;
}

function isdigitentry(x) {
    if (!isNaN(x) && x.length == 1) {
        var t = parseInt(x);
        if (t >= 0 && t <= 9) {
            return true;
        }
    } else if (x == '.') {
        return true;
    }
    return false;
}

function presskey() {
    var keychar = String.fromCharCode(event.which);
    var x = keychar;
    if (isdigitentry(x)) {
        calc.display.num(x);
    } else if (event.which == 13) { // Enter or Return, apparently
        calc.keypad.enterButton();
    } else if (x == '^') {
        xpnt();
    } else if (isbinaryop(x)) {
        calc.pad.binaryOp(x);
    }
}
//Buttons:

function makebutton(s) {
    var b = document.createElement('td');
    b.setAttribute('class', 'button');
    b.innerHTML = s.text;
    b.onclick = s.fcn;
    return b;
}

function makerow(l) {
    var row = document.createElement('tr');
    row.setAttribute('class', 'row');
    for (var i = 0; i < l.length; i++) {
        row.appendChild(makebutton(l[i]));
    }
    return row
}

function makepad(layout) {
    var pad = document.createElement('table');
    pad.setAttribute('class', 'pad');
    for (var i = 0; i < layout.length; i++) {
        var row = makerow(layout[i]);
        pad.appendChild(row);
    }
    return pad;
}

function KeyPad(calc, display, stack) {
    var self = this
    this.unaryOp = function(f) {
            var x = display.currentnum();
            display.setcurrentnum(f(x));
        }
    this.binaryOp = function(op) {
        // Ooops, can't handle "--" as binary op, need some spaces
        var expr = stack.popnum() + " " + op + " " + display.currentnum();
        var x = eval(expr);
        display.setcurrentnum(x);
    }
    this.enterButton = function() {
        display.enter(stack);
    }
    this.pushConst = function(k) {
        stack.pushnum(display.currentnum());
        display.setcurrentnum(k);
        display.iscomplete = true
    }
    this.toggleLayout = function() {
        var currentpad = self.dom
        var i = self.padlist.indexOf(currentpad);
        i = (i + 1) % self.padlist.length
        calc.dom.removeChild(currentpad);
        self.dom = self.padlist[i];
        calc.dom.appendChild(self.dom);
    }
    // Swap display with top of stack
    this.xchng = function() {
        var x = display.currentnum();
        var y = stack.popnum();
        stack.pushnum(x);
        display.setcurrentnum(y);
    }
    this.percent = function() {
        var x = display.currentnum() / 100;
        // stack.pushnum(x);
        display.setcurrentnum(x);
    }
    this.xpnt = function() {
        var x = display.currentnum();
        var y = stack.popnum();
        var r = Math.pow(y, x);
        display.setcurrentnum(r);
    }
    this.nvrs = function() {
        display.setcurrentnum(1 / calc.display.currentnum());
    }
    this.toggleTheme = function() {
        var currenttheme = calc.theme.href
        var i = calc.themelist.indexOf(currenttheme);
        i = (i + 1) % calc.themelist.length
        calc.theme.href = calc.themelist[i];
    }
    var layouts = make_layouts(this, display, stack);
    this.dom = makepad(layouts[0]);
    this.padlist = [this.dom];
    for (var i = 1; i < layouts.length; i++) {
        this.padlist.push(makepad(layouts[i]));
    }
}

function Stack(zero, sz) {
    this.stack = [];
    this.size = sz;
    var self = this;
    for (var i = 0; i < this.size; i++) {
        this.stack.push(zero);
    }
    this.pushnum = function(n) {
        self.stack.push(n);
        if (self.stack.length > self.size) {
            self.stack = self.stack.slice(-self.size);
        }
    }
    this.popnum = function() {
        var r;
        self.stack.unshift(self.stack[0]);
        r = self.stack.pop();
        return r;
    }
    this.topnum = function() {
        return self.stack[self.stack.length - 1];
    }
    this.rollup = function(display) {
        var x = display.currentnum();
        display.setcurrentnum(self.stack[0]);
        self.pushnum(x);
    }
    this.rolldown = function(display) {
        var x = display.currentnum();
        display.setcurrentnum(self.popnum());
        self.stack[0] = x;
    }
}

function Display(z) {
    this.zero = z
    var displayDiv = document.createElement('div');
    var resultDiv = document.createElement('div');
    displayDiv.setAttribute('class', 'display');
    resultDiv.setAttribute('class', 'result');
    displayDiv.appendChild(resultDiv);
    this.disp_dom = displayDiv;
    this.dom = resultDiv;
    var self = this;
    this.currentnum = function() {
        return self.dom.innerHTML
    }
    this.setcurrentnum = function(t) {
        self.iscomplete = true;
        self.waspushed = false;
        self.dom.innerHTML = t;
    }
    this.chs = function() {
        if (self.dom.innerHTML[0] == "-") {
            self.dom.innerHTML = self.currentnum().slice(1);
        } else {
            self.dom.innerHTML = "-" + self.currentnum();
        }
    }
    this.clear = function() {
        self.setcurrentnum(self.zero);
        self.waspushed = true; // Don't want it pushed
    }
    // Delete (Backspace) rightmost char if entering, or clear if
    // not entering
    // if there's nothing left
    // May want to change it to always edit, not clear
    this.bspace = function() {
        if (self.iscomplete === true || self.currentnum().length == 1 || (self.currentnum().length == 2 && self.currentnum()[0] == '-') || self.currentnum() == '-' + self.zero || self.currentnum() == self.zero) {
            self.clear();
        } else {
            self.dom.innerHTML = self.currentnum().slice(0, -1);
        }
    }
    this.num = function(o) {
        if (self.iscomplete === true) {
            if (self.waspushed === false) {
                calc.stack.pushnum(self.currentnum());
            }
            self.iscomplete = false;
            self.waspushed = false;
            if (o == '.') {
                self.dom.innerHTML = ZERODOT
            } else {
                self.dom.innerHTML = o
            }
        } else {
            self.dom.innerHTML = self.dom.innerHTML + o
        }
    }
    this.enter = function(stack) {
        stack.pushnum(self.currentnum());
        self.setcurrentnum(self.currentnum());
        self.waspushed = true;
    }
    this.setcurrentnum(z);
}

function Calc(x) {
    this.dom = x;
    this.stack = new Stack(CLEAR, STACKSIZE);
    this.display = new Display(CLEAR);
    this.keypad = new KeyPad(this, this.display, this.stack);
    this.dom.appendChild(this.display.disp_dom);
    this.dom.appendChild(this.keypad.dom);
    var l = document.getElementsByClassName('theme');
    var ll = []; // For some reason slice isn't defined
    var numthemes = l.length;
    this.theme = l[numthemes - 1]; // Default theme is last one on list
    this.themelist = [];
    for (var i = 0; i < numthemes; i++) {
        this.themelist.push(l[i].href);
        ll.push(l[i]);
    }
    var parent = l[0].parentNode;
    for (i = 0; i < numthemes - 1; i++) {
        parent.removeChild(ll[i]);
    }
    this.theme.href = this.themelist[i];
}