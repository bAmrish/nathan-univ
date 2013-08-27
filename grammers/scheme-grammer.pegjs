start 
	= expressions


expressions 
	= first:expression rest:(NL expression:expression {return expression} )* NL* {
    	if(rest.length){
        	return [first].concat(rest);
    	} else {
        	return first;
    	}
	}


expression
	= atoms SEP* "(" SEP* expression:expression SEP* ")"
	/ quote
	/ atoms
	/ SEP* "(" SEP* quote:quote SEP* ")" {
		return quote;
	}
	/ SEP* "(" 
		SEP* atoms:atoms SEP* 
		exp: (SEP* expression:expression SEP* {return expression;} )*
	")" {
		if(exp.length){
			if(Object.prototype.toString.call( atoms ) !== '[object Array]'){
				atoms = [atoms];
			}
			atoms =  atoms.concat(exp);
		}
		return atoms;
	}

quote
	= SEP* "'" expression:expression SEP* {
		var newVal = ["quote"]
		newVal.push(expression);
		return newVal;
	}


atoms
	= SEP* first:atom rest:(SEP* atom:atom {return atom;})* {
		if(rest.length){
			return [first].concat(rest);
		} else {
			return first;
		}
	}

atom
	= chars:validchars+ {
		return chars.join(""); 
	}

SEP
	= [ \t]+

NL
	= [\n]+

validchars
	= [0-9a-zA-Z_?!+\-=@#$%^&*/.]