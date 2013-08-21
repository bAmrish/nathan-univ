//
tree = {
	data: 'b'
	left: {
		data: 'a',
		left: null,
		right: null
	},
	right: {
		data = 'c',
		left = null,
		right = {
			data = 'd',
			left = null,
			right = null,
		}
	}

}


//This function counts total number of elements in the binary tree with recurssion
var count = function(tree) {
    var total = 0;
    
    if(!tree){
        return total;
    }
    
    if(tree.data){
        total++;
    }
    
    return total + count(tree.left) + count(tree.right);
};

//This function counts the number of elements in a binary tree without recurrsion.
var count = function(tree){
	var queue = [];
	var total = 0;

	if(!tree){
		return total;
	}

	queue.push(tree);

	while(queue.length){

		tree = queue.pop();
		total++;

		if(tree.left){
			queue.push(tree.left);
		}

		if(tree.right){
			queue.push(tree.right);
		}

	}

	return total;
};