start 
  = expressions


expressions = 
   first:expression rest:(NL expression:expression {return expression} )* NL* {
     if(rest.length){
        return [first].concat(rest);
     } else {
        return first;
     }
   }


expression
  = SEP* atom:atom SEP* {return atom;}
  / SEP* "(" SEP* atoms:atoms SEP* ")" {
    return atoms; 
  } 
  / SEP* "(" 
        SEP* atoms:atoms SEP* 
        exp: (SEP* expression:expression SEP* {return expression;} )*
    ")" {
        if(exp.length){
            atoms =  atoms.concat(exp);
        }
        return atoms;
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