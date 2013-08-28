start
	= note

note
	= p:pitch d:duration {		
		return {
			tag: 'note',
			pitch: p,
			dur: parseInt(d)
		}
	}

pitch
	= p:pitchLetter n:pitchNumber {		
		return "" + p + n;	
	}

pitchLetter "pitchNumber [a-g]"
	= [a-g]

pitchNumber "pitchNumber [1-8]"
	= [1-8]

duration "duration"
	= "[" duration:integer "]" {
		 return duration;
	 }

integer "integer"
	= i:[0-9]+ {
		return i.join("");
	}

