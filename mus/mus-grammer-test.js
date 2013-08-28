var expect = require('expect.js');
var tester = require('../tests/tester.js');

tester.read('mus/mus-grammer.pegjs', function(){		

	var tests = [
		{
			input: "a1[100]",
			expected: { tag: 'note', pitch: 'a1', dur: 100 }
		},
		{
			input: "g8[20]",
			expected: { tag: 'note', pitch: 'g8', dur: 20 }
		},
		{
			input: "h1[120]",
			expected: undefined
		},
		{
			input: "e10[120]",
			expected: undefined
		}
	];

	tests.forEach(function(test){
		expect(tester.eval(test.input)).to.eql(test.expected);			
	});
	
});