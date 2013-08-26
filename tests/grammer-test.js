var PEG = require('pegjs')
var fs = require('fs');
var expect = require('expect.js');

var _parse = parse = null;

var wrapExceptions = function(f) {
	return function() {
	    try {
	        return f.apply(null, arguments);
	    }
	    catch(err) {
	        return undefined;
	    }
	}
}

fs.readFile('grammer.pegjs', 'utf8', function(error, data){
	if(error){
		return console.log(error);
	}
	_parse = PEG.buildParser(data).parse
	parse = wrapExceptions(_parse);

	test();
});


var test = function(){
	
	expect(parse("")).to.be(undefined);
	expect(parse("dog")).to.eql(["dog"]);	
	expect(parse("black dog")).to.eql(["black", "dog"]);
	expect(parse("angry black dog")).to.eql(["angry", "black", "dog"]);
	expect(parse("Gray dog")).to.be(undefined);
};