var expect = require('expect.js');
var tester = require('./tester.js')

tester.read('arithmetic-grammer.pegjs', function(){			
	expect(tester.eval("")).to.eql(undefined);
	expect(tester.eval("atom")).to.eql("atom");
	expect(tester.eval("+")).to.eql("+");
	expect(tester.eval("(+ x 3)")).to.eql(["+", "x", "3"]);
	expect(tester.eval("(f x 3 y)")).to.eql(["f", "x", "3", "y"]);
	expect(tester.eval("(+ 1 (f x 3 y))")).to.eql(["+", "1", ["f", "x", "3", "y"]]);
	expect(tester.eval("(+ 1 (f x (- 3 4) y))")).to.eql(["+", "1", ["f", "x", ["-", "3", "4"], "y"]]);
	expect(tester.eval("(+ 1 (f x (- 3 4) y))\n(- 2 3)")).to.eql([["+", "1", ["f", "x", ["-", "3", "4"], "y"]], ["-", "2", "3"]]);
	expect(tester.eval("(+ 1 (f x (- 3 \t\t 4)          y))\n(- 2 3)")).to.eql([["+", "1", ["f", "x", ["-", "3", "4"], "y"]], ["-", "2", "3"]]);
});