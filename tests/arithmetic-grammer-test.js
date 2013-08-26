var expect = require('expect.js');
var tester = require('./tester.js');

tester.read('grammers/arithmetic-grammer.pegjs', function(){	
	expect(tester.eval("1+2")).to.eql({tag:"+", left:1, right:2});
	expect(tester.eval("1+2*3")).to.eql({tag:"+", left:1, right:{tag:"*", left:2, right:3}});
	expect(tester.eval("1,2")).to.eql({tag:",", left:1, right:2});
	expect(tester.eval("1,2+3")).to.eql({tag:",", left:1, right:{tag:"+", left:2, right:3}});
	expect(tester.eval("1*2,3")).to.eql({tag:",", left:{tag:"*", left:1, right:2}, right:3});     
});