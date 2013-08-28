var expect = require('expect.js');
var tester = require('./tester.js')

tester.read('grammers/mus-grammer.pegjs', function(){			
	expect(tester.eval("a1[100]")).to.eql({ tag: 'note', pitch: 'a1', dur: 100 });
	expect(tester.eval("g8[20]")).to.eql({ tag: 'note', pitch: 'g8', dur: 20 });
	expect(tester.eval("h1[120]")).to.eql(undefined);
	expect(tester.eval("e10[120]")).to.eql(undefined);
});