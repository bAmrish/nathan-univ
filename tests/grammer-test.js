var expect = require('expect.js');
var tester = require('./tester.js')

tester.read('grammer.pegjs', function(){
	expect(tester.eval("")).to.be(undefined);
	expect(tester.eval("dog")).to.eql(["dog"]);	
	expect(tester.eval("black dog")).to.eql(["black", "dog"]);
	expect(tester.eval("angry black dog")).to.eql(["angry", "black", "dog"]);
	expect(tester.eval("Gray dog")).to.be(undefined);
});