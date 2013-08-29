var expect = require('chai').expect;
var tester = require('../tests/tester.js')

tester.read('scheem/scheem-grammar.pegjs', function(){			

	expect(tester.eval("")).to.deep.equal(undefined);
	expect(tester.eval("atom")).to.deep.equal("atom");
	expect(tester.eval("x1")).to.deep.equal("x1");
	expect(tester.eval("5")).to.deep.equal(5);
	expect(tester.eval("75155234")).to.deep.equal(75155234);
	expect(tester.eval("+")).to.deep.equal("+");
	expect(tester.eval("(1)")).to.deep.equal([1]);
	expect(tester.eval("(a)")).to.deep.equal(["a"]);
	expect(tester.eval("(+ x 3)")).to.deep.equal(["+", "x", 3]);
	expect(tester.eval("(f x 3 y)")).to.deep.equal(["f", "x", 3, "y"]);
	expect(tester.eval("(+ 1 (f x 3 y))")).to.deep.equal(["+", 1, ["f", "x", 3, "y"]]);
	expect(tester.eval("(+ 1 (f x (- 3 4) y))")).to.deep.equal(["+", 1, ["f", "x", ["-", 3, 4], "y"]]);
	expect(tester.eval("(+ 1 (f x (- 3 4) y))\n(- 2 3)")).to.deep.equal(['begin', ["+", 1, ["f", "x", ["-", 3, 4], "y"]], ["-", 2, 3]]);
	expect(tester.eval("(+ 1 (f x (- 3 \t\t 4)          y))\n(- 2 3)")).to.deep.equal(['begin', ["+", 1, ["f", "x", ["-", 3, 4], "y"]], ["-", 2, 3]]);
	expect(tester.eval("('x)")).to.deep.equal(["quote", "x"]);
	expect(tester.eval("('(x))")).to.deep.equal(["quote", ["x"]]);
	expect(tester.eval("('(1 2 3))")).to.deep.equal(["quote", [1, 2, 3]]);
	expect(tester.eval(";;This comment should be ignored")).to.deep.equal("");
	expect(tester.eval("(1 2 3) ;;This comment should be ignored")).to.deep.equal([1, 2, 3]);
});