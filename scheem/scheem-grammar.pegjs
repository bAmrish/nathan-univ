{
	var isArray = function(item){
		if(!!item && Object.prototype.toString.call(item) == '[object Array]'){
			return true;
		}

		return false;
	}
}

start 
	= expressions


expressions 
	= expression:expression SEP* comment NL* {
		return expression;
	}
	
	/ first:expression rest:(NL expression:expression {return expression} )* NL* {
    	if(rest.length){
        	return ['begin', first].concat(rest);
    	} else {
        	return first;
    	}
	}
	
	/ comment


expression
	= SEP* "(" SEP* expression:expression SEP* ")" SEP* {
		if(!isArray(expression)){
			return [expression];
		}
		return expression;
	}	
	/ first:atoms rest:expression* {
    	if(rest.length){
    		first = isArray(first) ? first : [first];
        	return first.concat(rest);
    	} else {
        	return first;
    	}
	}
	/ quote

atoms
	= SEP* first:atom rest:(SEP* atom:atom {return atom;})* {
		if(rest.length){
			return [first].concat(rest);
		} else {
			return first;
		}
	}
	/ atom

atom
	= numbers 
	/ chars:validchars+ {
		return chars.join(""); 
	}


comment
	= SEP* ";;" SEP* .* {
		return ""
	}

quote
	= SEP* "'" expression:expression SEP* {
		var newVal = ["quote"]
		newVal.push(expression);
		return newVal;
	}

SEP
	= [ \t]+

NL
	= [\n]+

numbers 
	= numbers:[0-9]+ {
		return parseInt(numbers.join(''));
	}

validchars
	= [0-9a-zA-Z_?!+\-=@#$%^&*/.]