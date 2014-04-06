window. onresize = resize;

function resize() {
	
	var children = document.getElementById('chart');
	children.innerHTML = '';
    initmap();
}

function initmap() {
	
	chart("sghour.csv");
    var colors = [];
    
    
    function chart(csvpath) {

       colors = ["#0053ac", "#fbfb00", "#e90000", "#fe39b6", "#ff8d00", "#BF5FFF", "#009e59", "#6dc53d", "#ff0070", "#00adf3", "#8a57ac", "#5ad4f6",
       "#cf0089", "#00aac3"];

        strokecolor = colors[0];
        

        var margin = {top: 40, right: 0, bottom: 40, left: 0};
        var width = document.body.clientWidth;
        var height = 500 - margin.top - margin.bottom;
        
        var div = d3.select("body").append("div")   
        		.attr("class", "tooltip")               
        		.style("opacity", 0);

        var x = d3.scale.linear()
                .range([0, width]);

        var y = d3.scale.linear()
                .range([height-10, 0]);

        var z = d3.scale.ordinal()
                .range(colors);
                
        var svg = d3.select("svg");

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .ticks(23)
            .tickSize(0)
            .tickFormat(function(d) { 
            switch(d) {
			case 0:
			case 12:
				var p = d3.select(this.parentNode); p.append("image")
				.attr("width", 30)
				.attr("height", 35)
				.attr("xlink:href", "http://www.csprojects.org/img/clock0.png");
				break;
			case 1:
			case 13:
				var p = d3.select(this.parentNode); p.append("image")
				.attr("width", 30)
				.attr("height", 35)
				.attr("xlink:href", "http://www.csprojects.org/img/clock1.png");
				break;
			case 2:
			case 14:
				var p = d3.select(this.parentNode); p.append("image")
				.attr("width", 30)
				.attr("height", 35)
				.attr("xlink:href", "http://www.csprojects.org/img/clock2.png");
			break;           
			case 3:
			case 15:
				var p = d3.select(this.parentNode); p.append("image")
				.attr("width", 30)
				.attr("height", 35)
				.attr("xlink:href", "http://www.csprojects.org/img/clock3.png");
			break;
			case 4:
			case 16:
				var p = d3.select(this.parentNode); p.append("image")
				.attr("width", 30)
				.attr("height", 35)
				.attr("xlink:href", "http://www.csprojects.org/img/clock4.png");
				break;
			case 5:
			case 17:
				var p = d3.select(this.parentNode); p.append("image")
				.attr("width", 30)
				.attr("height", 35)
				.attr("xlink:href", "http://www.csprojects.org/img/clock5.png");
				break;
			case 6:
			case 18:
				var p = d3.select(this.parentNode); p.append("image")
				.attr("width", 30)
				.attr("height", 35)
				.attr("xlink:href", "http://www.csprojects.org/img/clock6.png");
				break;
			case 7:
			case 19:
				var p = d3.select(this.parentNode); p.append("image")
				.attr("width", 30)
				.attr("height", 35)
				.attr("xlink:href", "http://www.csprojects.org/img/clock7.png");
				break;
			case 8:
			case 20:
				var p = d3.select(this.parentNode); p.append("image")
				.attr("width", 30)
				.attr("height", 35)
				.attr("xlink:href", "http://www.csprojects.org/img/clock8.png");
				break;
			case 9:
			case 21:
				var p = d3.select(this.parentNode); p.append("image")
				.attr("width", 30)
				.attr("height", 35)
				.attr("xlink:href", "http://www.csprojects.org/img/clock9.png");
				break;
			case 10:
			case 22:
				var p = d3.select(this.parentNode); p.append("image")
				.attr("width", 30)
				.attr("height", 35)
				.attr("xlink:href", "http://www.csprojects.org/img/clock10.png");
				break;
			case 11:
			case 23:
				var p = d3.select(this.parentNode); p.append("image")
				.attr("width", 30)
				.attr("height", 35)
				.attr("xlink:href", "http://www.csprojects.org/img/clock11.png");
				break;
			}  
			return ''; });
			
        var yAxis = d3.svg.axis()
                .scale(y);

        var yAxisr = d3.svg.axis()
                .scale(y);          

        var stack = d3.layout.stack()
                .offset("silhouette")
                .values(function(d) { return d.values; })
                .x(function(d) { return d.hour; })
                .y(function(d) { return d.value; });

        var nest = d3.nest()
                .key(function(d) { return d.key; });

        var area = d3.svg.area()
                .interpolate("cardinal")
                .x(function(d) { return x(d.hour); })
                .y0(function(d) { return y(d.y0); })
                .y1(function(d) { return y(d.y0 + d.y); });

        var svg = d3.select(".chart").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var graph = d3.csv(csvpath, function(data) {
            data.forEach(function(d) {
                d.hour = +d.hour;
                d.value = +d.value;
            });

        var layers = stack(nest.entries(data));

        x.domain(d3.extent(data, function(d) { return d.hour; }));
        y.domain([0, d3.max(data, function(d) { return d.y0 + d.y; })]);

        svg.selectAll(".layer")
                .data(layers)
                .enter().append("path")
                .attr("class", "layer")
                .attr("d", function(d) { return area(d.values); })
                .style("fill", function(d, i) { return z(i); });


        svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

        svg.selectAll(".layer")
                .attr("opacity", 1)
                .on("mouseover", function(d, i) {
                    svg.selectAll(".layer").transition()
                            .duration(250)
                            .attr("opacity", function(d, j) {
                                return j != i ? 0.6 : 1;
                            });   
                    })

        .on("mousemove", function(d, i) {
            positionx = d3.mouse(this);
            positionx = positionx[0];
            var invertedx = x.invert(positionx);
             d3.select(this)
                    .classed("hover", true)
                    .attr("stroke", strokecolor)
                    .attr("stroke-width", "0.5px");
	                 div.transition()        
	                .duration(200)      
	                .style("opacity", .9);      
		            div .html("<p>" + d.key + "<br>"  + d.values[Math.floor(invertedx)].value+
	                    " incidents " + "</p>")  
	                .style("left", "20px")     
	                .style("top", "80px")
	                .style("visibility", "visible"); 
        })
        
        .on("mouseout", function(d, i) {
            svg.selectAll(".layer")
                    .transition()
                    .duration(250)
                    .attr("opacity", "1");
            d3.select(this)
                    .classed("hover", false)
                    .attr("stroke-width", "0px"), div .html(d.key +  "<br>").style("visibility", "hidden");
        })

        var bar = d3.select(".chart")
            .append("div")
            .attr("class", "remove")
            .style("position", "absolute")
            .style("z-index", "19")
            .style("width", "1px")
            .style("height", "500px")
            .style("top", "10px")
            .style("bottom", "30px")
            .style("left", "0px")
            .style("background", "#fff");

        d3.select(".chart")
            .on("mousemove", function(){
                positionx = d3.mouse(this);
                positionx = positionx[0] + 5;
                bar.style("left", positionx + "px" )})
            .on("mouseover", function(){
                positionx = d3.mouse(this);
                positionx = positionx[0] + 5;
                bar.style("left", positionx + "px")});
        });
    }
	
}