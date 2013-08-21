var convertPitch = function(noteName){	
	var noteSplit = [], letterPitch, octave, noteNameLength;
	//Reference http://www.midimountain.com/midi/midi_note_numbers.html
	var midiNoteMap = {
		'c': 0,
		'c#': 1,
		'd': 2,
		'd#': 3,
		'e': 4,
		'f': 5,
		'f#': 6,
		'g': 7,
		'g#': 8,
		'a': 9,
		'a#': 10,
		'b': 11
	}

	if(!noteName){
		throw new Exception("Invalid noteName " + noteName);
	}

	noteNameLength = noteName.length;

	
	//check if the noteName contains # 
	if(noteName.indexOf('#') > 0){

		//if so the length of the nodeName cannot be greater than 4.
		if(noteNameLength !== 3 || noteNameLength !== 4){
			throw new Exception("Invalid noteName " + noteName);
		}

		//if so split on '#'		
		noteSplit = note.split('#');

		//letterPitch will be the first part but we have to appned '#'
		letterPitch = midiNoteMap[noteSplit[0].toLowerCase() + '#'];

		//octave would be the rest of it.
		octave = parseInt(noteName[1], 10);	

	}else if(noteNameLength === 2 || noteNameLength === 3){
		//else the node name has to be either 2 or 3 letter.

		letterPitch = midiNoteMap[noteName[0].toLowerCase()];
		octave = parseInt([].splice.call(noteName, 1, noteNameLength).join(''), 10);	
	}else{
		throw new Exception("Invalid noteName " + noteName);
	}	
	

	return (12 + 12 * octave + letterPitch);
};


/**
* Write a function endTime that takes a start time 
* time in milliseconds and a MUS expression expr.
* Assuming expr starts playing at time time, 
* the function should return the time when expr finishes.
*/
var endTime = function (time, expr) {
	switch(expr.tag){
		case 'note':
		case 'rest':
			return time + expr.dur;	
		case 'seq':
			return endTime( endTime(time, expr.left), expr.right);
		case 'par':
			return Math.max(endTime(time, expr.left), endTime(time, expr.right));
		default:
			throw new Error("Invalid expression syntax.");		
	}
};

/*
* Write a function compile that compiles MUS songs into NOTE songs.
*/

var compile = function(mus, startTime){	
	var notes = [];
	var queue = [];
	var expr = null;
	var totalTime = startTime || 0;

	var addToTop = function(array, element){
		array.splice(0, 0, element);
		return array;
	};

	var popFirst = function(array){
		return array.splice(0, 1)[0];
	};


	queue.push(mus);

	while(queue.length){
		expr = popFirst(queue);

		switch(expr.tag){
			case 'note':
			case 'rest':
				
				notes.push({
					tag: expr.tag,
					pitch: convertPitch(expr.pitch) || '',
					start: totalTime,
					dur: expr.dur
				});

				totalTime = endTime(totalTime, expr);

				break;

			case 'seq':
				
				addToTop(queue, expr.right);
				addToTop(queue, expr.left);

				break;

			case 'par':

				notes = notes.concat(compile(expr.left, totalTime).concat(compile(expr.right, totalTime)));
				totalTime = endTime(totalTime, expr);

				break;

			default:
				throw new Error("Invalid expression syntax.");		
		}
	}

	return notes;
};

exports.compile = compile;