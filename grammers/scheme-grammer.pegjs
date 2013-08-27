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
	= SEP* atom:atom SEP* {
		return atom;
	} 
	/ SEP* "(" SEP* atoms:atoms SEP* ")" {
		return atoms; 
	} 
	/ SEP* quote:quote {
		return quote;
	}  
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
	= "'" expression:expression {
		var newVal = ["quote"]
		newVal.push(expression);
		return newVal;
	}


atoms
	= first:atom rest:(SEP atom:atom {return atom;})* {
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