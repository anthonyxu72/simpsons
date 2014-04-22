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
					if (typeof(data[chars[i]][chars[j]]) !== "undefined") {
						linksArray.push({"source":i, "target":j, "value":data[chars[i]][chars[j]]});
					}
				}
			}
		}
	
	});
<<<<<<< HEAD
	return characterMatrixArray;
=======
	characterMatrixArray['nodes'] = nodesArray;
	characterMatrixArray['links'] = linksArray;
	console.log(characterMatrixArray);
>>>>>>> e116edd0c0bb32bc60f8fd7ed569d0938ec26691
}