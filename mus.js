/*
* Write a function prelude that takes a music expression expr
* as input and returns an expression that means to play a d4 note
* for 500 milliseconds and then play expr.
*/
var prelude = function(expr) {
    return {
        tag: 'seq',
        left: {
            tag: 'note', pitch: 'd4', dur: 500
        },
        
        right: expr
    };
};


/**
* This time write a function reverse that takes
* a music expression as input and returns a new music 
* expression that plays the notes in the reverse order. 
* Your function shouldn't modify the input, it should 
* just return a new reversed expression.
*/
var reverse = function(expr){
	var newExpr = {};

	if(expr.tag === 'note'){
		newExpr = expr;
	}else if (expr.tag === 'seq' ) {
		newExpr.tag = expr.tag;
		newExpr.left = reverse(expr.right);
		newExpr.right = reverse(expr.left);
	} else {
		throw new Error("Invalid expression syntax.");
	}

	return newExpr;
};

/**
* Write a function endTime that takes a start time 
* time in milliseconds and a MUS expression expr.
* Assuming expr starts playing at time time, 
* the function should return the time when expr finishes.
*/
var endTime = function (time, expr) {
	if(!expr){
		throw new Error("Invalid expression syntax.");
	}

	if(expr.tag === 'note'){
		return time + expr.dur;	
	}else if (expr.tag === 'seq' ){
		return endTime( endTime(time, expr.left), expr.right);
	}else if(expr.tag === 'par'){
		return Math.max(endTime(time, expr.left), endTime(time, expr.right));
	}else{
		throw new Error("Invalid expression syntax.");
	}	
};

/*
* Write a function compile that compiles MUS songs into NOTE songs.
* 
*  Example:
* 
*  MUS Song:
*  =========
*  { tag: 'seq',
*   left: 
*    { tag: 'seq',
*      left: { tag: 'note', pitch: 'a4', dur: 250 },
*      right: { tag: 'note', pitch: 'b4', dur: 250 } },
*   right:
*    { tag: 'seq',
*      left: { tag: 'note', pitch: 'c4', dur: 500 },
*      right: { tag: 'note', pitch: 'd4', dur: 500 } } }
* 
* Compiled NOTE version
* =====================
* [ { tag: 'note', pitch: 'a4', start: 0, dur: 250 },
*   { tag: 'note', pitch: 'b4', start: 250, dur: 250 },
*   { tag: 'note', pitch: 'c4', start: 500, dur: 500 },
*   { tag: 'note', pitch: 'd4', start: 1000, dur: 500 } ]
* 
* MUS Song with "par"tag:
* =======================
*{ tag: 'seq',
*      left: 
*       { tag: 'par',
*         left: { tag: 'note', pitch: 'c3', dur: 250 },
*         right: { tag: 'note', pitch: 'g4', dur: 500 } },
*      right:
*       { tag: 'par',
*         left: { tag: 'note', pitch: 'd3', dur: 500 },
*         right: { tag: 'note', pitch: 'f4', dur: 250 } } };
* Compiled NOTE version with "par" tag:
* =====================================
*[
*    { tag: 'note', pitch: 'c3', start: 0, dur: 250 },
*    { tag: 'note', pitch: 'g4', start: 0, dur: 500 },
*    { tag: 'note', pitch: 'd3', start: 500, dur: 500 },
*    { tag: 'note', pitch: 'f4', start: 500, dur: 250 } ];
*
*/

var compile = function(mus, startTime){	
	var notes = [];
	var queue = [];
	var expr = null;
	var totalTime = startTime || 0;

	var addToTop = function(array, element){
		array.splice(0, 0, element);
		return array;
	};

	var popFirst = function(array){
		return array.splice(0, 1)[0];
	};


	queue.push(mus);

	while(queue.length){
		expr = popFirst(queue);
		
		if(expr.tag === 'note'){
			notes.push({
				tag: expr.tag,
				pitch: expr.pitch,
				start: totalTime,
				dur: expr.dur
			});

			totalTime = endTime(totalTime, expr);

		}else if(expr.tag === 'seq'){
			addToTop(queue, expr.right);
			addToTop(queue, expr.left);
		}else if(expr.tag === 'par'){
			notes = notes.concat(compile(expr.left, totalTime).concat(compile(expr.right, totalTime)));
			totalTime = endTime(totalTime, expr);
		}
		else{
			throw new Error("Invalid expression syntax.");	
		}
	}

	return notes;
};
