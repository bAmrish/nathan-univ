var PEG = require('pegjs')
var fs = require('fs');
var expect = require('expect.js');

var parser = null;

var evaluate = function(expression){
	var red, blue, reset;
	red   = '\033[31m';
	blue  = '\033[34m';
	reset = '\033[37m';


	console.error("\n======================================");
	console.log("Evaluating Expression: " + expression)
	console.error("======================================");
	try{
		var result = parser.parse(expression);
		console.log(result);
		return result;
	}catch(e){		
		console.error(red);
		console.error("Error Evaluating express...");
		console.error("message: " + e.message);
		console.error("offset: " + e.offset);
		console.error("position: " + e.line + ":" + e.column);
		console.error("expected: " + e.expected);
		console.error("found: " + e.found);
		console.error(reset);
		return undefined;
	}
}

fs.readFile('scheme-grammer.pegjs', 'utf8', function(error, data){
	if(error){
		return console.log(error);
	}
	
	parser = PEG.buildParser(data, {trackLineAndColumn: true});

	test();
});


var test = function(){
	
	expect(evaluate("")).to.eql(undefined);
	expect(evaluate("atom")).to.eql("atom");
	expect(evaluate("+")).to.eql("+");
	expect(evaluate("(+ x 3)")).to.eql(["+", "x", "3"]);
	expect(evaluate("(f x 3 y)")).to.eql(["f", "x", "3", "y"]);

	expect(evaluate("(+ 1 (f x 3 y))")).to.eql(["+", "1", ["f", "x", "3", "y"]]);
	expect(evaluate("(+ 1 (f x (- 3 4) y))")).to.eql(["+", "1", ["f", "x", ["-", "3", "4"], "y"]]);
};