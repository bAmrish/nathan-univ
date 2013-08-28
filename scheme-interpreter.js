var evalScheem = function (expr, env) {
	// Numbers evaluate to themselves
	if (typeof expr === 'number') {
		return expr;
	}
	
	// Strings are variable references
	if (typeof expr === 'string') {
		return env[expr];
	}

	// Look at head of list for operation
	switch (expr[0]) {
		case '+':
			var left = evalScheem(expr[1], env);
			var right = evalScheem(expr[2], env);
			if(isNaN(left) || isNaN(right)){
				throw new Error('Illegal Argument Exception.');
			}
			return left + right;

		case '-':
			var left = evalScheem(expr[1], env);
			var right = evalScheem(expr[2], env);
			if(isNaN(left) || isNaN(right)){
				throw new Error('Illegal Argument Exception.');
			}
			return left - right;

		case '*':
			var left = evalScheem(expr[1], env);
			var right = evalScheem(expr[2], env);
			if(isNaN(left) || isNaN(right)){
				throw new Error('Illegal Argument Exception.');
			}
			return left * right;

		case '/':
			var left = evalScheem(expr[1], env);
			var right = evalScheem(expr[2], env);
			if(isNaN(left) || isNaN(right)){
				throw new Error('Illegal Argument Exception.');
			}
			return left / right;

		case '=':
			var eq = (evalScheem(expr[1], env) === evalScheem(expr[2], env));
			return eq ? '#t': '#f';
		case '<':
			var lt = (evalScheem(expr[1], env) < evalScheem(expr[2], env));
			return lt ? '#t': '#f';
		case 'begin':
			var lastResult = 0;
			for(var i = 1; i < expr.length; i++){
				lastResult = evalScheem(expr[i], env);
			}
			return lastResult;
		case 'define':
			env[expr[1]] = evalScheem(expr[2], env);
			return 0;
		case 'set!':
			var variable = env[expr[1]];

			if(typeof variable === 'undefined'){
				throw new Error('Illegal Argument Exception.');
			}

			env[expr[1]] = evalScheem(expr[2], env);

			return 0;
		case 'quote':
			if(expr.length !== 2){
				throw new Error('Illegal Argument Exception.');	
			}
			return expr[1];
		case 'cons':
			var c = evalScheem(expr[2], env);
			c.splice(0, 0, evalScheem(expr[1], env));
			return c;
		case 'car':
			return evalScheem(expr[1], env)[0];
		case 'cdr':
			var l = evalScheem(expr[1], env);
			return l.splice(1, l.length);
		case 'if':
			return evalScheem(expr[1], env) === '#t' ? evalScheem(expr[2], env) : evalScheem(expr[3], env);
	}
};