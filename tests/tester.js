var PEG = require('pegjs')
var fs = require('fs');
var parser = null;

var red, blue, reset;

module.exports = {
	/**
	*  Set the default logging to false.
	**/
	logging: false,

	/**
	* Custom log method to wrap console.log.
	* it does not log if the logging flag is turned off.  
	*/
	log: function(message){
		if(this.logging){
			console.log(message);
		}
	},

	/**
	* Custom error method to wrap console.error.
	* it does not log if the logging flag is turned off.  
	* it also colors the error message in red.
	*/
	error: function(message){
		red   = '\033[31m';
		blue  = '\033[34m';
		reset = '\033[37m';

		if(this.logging){
			console.error(red);
			console.error(message);
			console.error(reset);
		}
	},

	/**
	* eval method to evaluate the expression against the current pasrser.
	* It does verbose logging if logging flag is turned on.
	* If the parsing fails, it returns undefined.
	**/
	eval: function(expression){

		this.log("\n======================================");	
		this.log("Evaluating Expression: " + expression)
		this.log("======================================");

		try{
			var result = parser.parse(expression);
			this.log(result);
			return result;
		}catch(e){		
			this.error(red);
			this.error("Error Evaluating express...");
			this.error("message: " + e.message);
			this.error("offset: " + e.offset);
			this.error("position: " + e.line + ":" + e.column);
			this.error("expected: " + e.expected);
			this.error("found: " + e.found);
			this.error(reset);
			return undefined;
		}
	},

	read: function(filePath, tests){
		fs.readFile(filePath, 'utf8', function(error, data){
			if(error){
				return console.log(error);
			}
			
			parser = PEG.buildParser(data, {trackLineAndColumn: true});

			tests();
		});
	}
};