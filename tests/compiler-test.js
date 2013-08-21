compiler = require("../mus/compiler")

var melody_mus = {
	tag: 'seq',
	left: {
		tag: 'seq',
		left: {
			tag: 'note',
			pitch: 'a4',
			dur: 250
		},
		right: {
			tag: 'note',
			pitch: 'b4',
			dur: 250
		}
	},
	right: {
		tag: 'seq',
		left: {
			tag: 'note',
			pitch: 'c4',
			dur: 500
		},
		right: {
			tag: 'note',
			pitch: 'd4',
			dur: 500
		}
	}
};

console.log(melody_mus);
console.log(compiler.compile(melody_mus));


var melody_repeat_mus = {
	tag: 'repeat',
	section: {
		tag: 'note',
		pitch: 'c4',
		dur: 250
	},
	count: 3
}

console.log(melody_repeat_mus);
console.log(compiler.compile(melody_repeat_mus));