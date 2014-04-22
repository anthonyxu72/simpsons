function searchCharacters(chars) {
	var characterMatrixArray = {};
	var nodesArray = new Array();
	var linksArray = new Array();
	$.getJSON("./characterMatrix.js", function(data) {		
		for (var i=0; i<chars.length; i++) {
			//console.log(i);
			//console.log(chars[i]);
			nodesArray.push({"node":i, "name":chars[i]});	
			for (var j=0; j<chars.length; j++) {
				if (i<j) {
					if (typeof(data[chars[i]][chars[j]]) != "undefined") {
						linksArray.push({"source":i, "target":j, "value":data[chars[i]][chars[j]]});
					}
				}
			}
		}
		characterMatrixArray['nodes'] = nodesArray;
		characterMatrixArray['links'] = linksArray;
		return characterMatrixArray;
	});
	//console.log(characterMatrixArray);
}

function returnArray(array){
	console.log(array)
	return array;
}