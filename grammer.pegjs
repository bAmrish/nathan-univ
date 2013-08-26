start =
    wordlist

wordlist =
	first:word rest:wordWithSeperator*
		{return [first].concat(rest)}

wordWithSeperator =
	sep:seperator w:word
		{return w}

seperator =
	" "

word = 
	letters:letter+
		{return letters.join('');}

letter = 
	[a-z]