start
	= atoms
	/ list

list "list"
	= "(" atoms:atoms ")" { return atoms; } 
	/ "(" atoms:atoms " " list:list ")" {
		atoms.push(list)
		return atoms;
	}

atoms "atoms"
	= first:atom rest:atomWithSpace* {
	 return !rest.length ? first : [first].concat(rest); 
	}

atomWithSpace "atomWithSpace"
	= " " a:atom {
		return a; 
	}

atom "atom"
	= chars:validchar+ {
		return chars.join(""); 
	}    

validchar "validchar"
    = [0-9a-zA-Z_?!+\-=@#$%^&*/.]        