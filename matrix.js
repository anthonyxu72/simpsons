function searchCharacters(chars) {
	console.log(chars)
	d3.select("svg").remove();
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
		characterMatrixArray['nodes'] = nodesArray;
		characterMatrixArray['links'] = linksArray;
		console.log(characterMatrixArray);
		draw_viz(characterMatrixArray)
	});
}

function draw_viz(array){
	console.log(array.links)
	var units = "Widgets";
		
	var formatNumber = d3.format(",.0f"),    // zero decimal places
	    format = function(d) { return formatNumber(d) + " " + units; },
	    color = d3.scale.category20();
	
 var margin = {top: 10, right: 10, bottom: 10, left: 10},
     width = 800 - margin.left - margin.right,
     height = 700 - margin.top - margin.bottom;
			  
	var svg = d3.select("body").append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	
	var sankey = d3.sankey()
						.nodeWidth(36)
						.nodePadding(40)
						.size([width ,height])
	
	var path = sankey.link();
		
	sankey
	   .nodes(array.nodes)
	   .links(array.links)
	   .layout(32);
	
	var link = svg.append("g").selectAll(".link")
		      .data(array.links)
		    .enter().append("path")
		      .attr("class", "link")
		      .attr("d", path)
		      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
		      .sort(function(a, b) { return b.dy - a.dy; });
	
	link.append("title")
	      .text(function(d) {
	          return d.source + " → " + 
	              d.target + "\n" + format(d.value); });
	  
	  
					  var node = svg.append("g").selectAll(".node")
					      .data(array.nodes)
					    .enter().append("g")
					      .attr("class", "node")
					      .attr("transform", function(d) { 
					          return "translate(" + d.x + ","+ d.y +")"; })								 
							 .call(d3.behavior.drag()
					       .origin(function(d) { return d; })
					       .on("dragstart", function() { 
					           this.parentNode.appendChild(this); })
					       .on("drag", dragmove));
							 		 
					// add the rectangles for the nodes
					  node.append("rect")
					      .attr("height", function(d) { return d.dy; })
					      .attr("width", sankey.nodeWidth())
					      .style("fill", function(d) { 
					          return d.color = color(d.name.replace(/ .*/, "")); })
					      .style("stroke", function(d) { 
					          return d3.rgb(d.name).darker(2); })
					    .append("title")
					      .text(function(d) { 
					          return d.name + "\n" + format(d.value); });
	
					// add in the title for the nodes
					  node.append("text")
					      .attr("x", -6)
					      .attr("y", function(d) { return d.dy / 2; })
					      .attr("dy", ".35em")
					      .attr("text-anchor", "end")
					      .attr("transform", null)
					      .text(function(d) { return d.name; })
					    .filter(function(d) { return d.x < 780 / 2; })
					      .attr("x", 6 + sankey.nodeWidth())
					      .attr("text-anchor", "start");
						
					// the function for moving the nodes
					  function dragmove(d) {
					    d3.select(this).attr("transform", 
					        "translate(" + (
					            d.x = Math.max(0, Math.min(width - d.dx, d3.event.x))
					        )
					        + "," + (
					            d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
					        ) + ")");
					    sankey.relayout();
					    link.attr("d", path);
					  }
}