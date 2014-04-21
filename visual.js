$(document).ready(function(){
	$(".chosen-select").chosen();
	$(".chosen-select").chosen();
})

var units = "Widgets";

var formatNumber = d3.format(",.0f"),    // zero decimal places
    format = function(d) { return formatNumber(d) + " " + units; },
    color = d3.scale.category20();

var svg = d3.select("body").append("svg")
				.attr("width", 800)
				.attr("height", 700)
				.attr("transform", "translate(0, 500)")
	
var sankey = d3.sankey()
					.nodeWidth(36)
					.nodePadding(40)
					.size([780-20 ,700-20])

var path = sankey.link();
var items = [];
	
d3.json("test.json",function(graph){
	sankey
	   .nodes(graph.nodes)
	   .links(graph.links)
	   .layout(32);

	var link = svg.append("g").selectAll(".link")
	      .data(graph.links)
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
					      .data(graph.nodes)
					    .enter().append("g")
					      .attr("class", "node")
					      .attr("transform", function(d) { 
					          return "translate(" + d.x + "," + d.y + ")"; })

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
})