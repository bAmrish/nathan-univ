/**
* This runner runs all the test files under the ./tests directory.
* It automatically loads and tests files ending with '-test.js'.
*/
var fs = require('fs');

/**
* Read the 'tests' directory
**/
fs.readdir('./tests', function(err, files) {
	if (err) throw err;
	
	files.forEach(function(file) {
		//only process the files that ends with '-test.js'
		if(/-test.js$/.test(file)){
			fs.readFile('./tests/'+file, 'utf-8', function(error, data){
				if(error){
					throw error;
				}

				console.log('Running file: ' + file);
				eval(data);
			});
		}		
	});
});