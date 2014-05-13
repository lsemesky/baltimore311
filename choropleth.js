var token = "nYkGKGozNTZZ4npCsN43ciFpx";
var url = "https://opendata.socrata.com/resource/2e9u-3gji.json?$$app_token="+token+"&$select=zip,count(zip)&$GROUP=zip";
var geojson;
var map;
var info = L.control();
var div;


window.onload = function(){
	var mapdata; 
//map = L.map('map').setView([39.28,-76.61],11);
map=L.mapbox.map('map', 'lsemesky.i7ila685').setView([39.28,-76.61],11);//L.mapbox.tileLayer('lsemesky.i7ilhipd');
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {document.getElementById("piechart").innerHTML="";
		document.getElementById("piekey").innerHTML="";
	if(props == undefined) {
		
		return;
	}
	div = '<h4>Zip Code</h4>' +  (props ?
        '<b>' + props.ZIPCODE1 + '</b><br /><br />' +
        '<h4>Number of Calls</h4>'+
       '<b>'+ props.num311calls+'</b><br /><br />'+
        '<h4>Top 10 Calls:</h4>'  
                : 'Hover over a region');
   
   
    $.each(props.callcategory, function(k,v){
    	div = div + '<b>' + v[0] + ":</b> " + v[1] + "<br />";
    })
    this._div.innerHTML = div;
    doPieChart(props.callcategory);

};

info.addTo(map);


var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 50, 100, 200, 300,400,500, 600],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);



$.getJSON( "bacizc10.json", function( data ) {
	$.each(data.features,function(key,val){
		var zip = val.properties.ZIPCODE1;
		console.log(zip)
		var num311;
		if(zip!= undefined){
			console.log(zip)
			
			
			//get first 10 code descriptions for the  zip
			
		$.getJSON("https://opendata.socrata.com/resource/2e9u-3gji.json?$$app_token="+token+"&$select=codedescription,count(codedescription)&$where=zip='"+zip+"'&$group=codedescription&$order=count_codedescription desc&$limit=10", function(codeData){
				
		val.properties.callcategory=[];
			$.each(codeData,function(k,v){
				val.properties.callcategory.push([v.codedescription,v.count_codedescription]);
			});
		});
			
			
		$.getJSON("https://opendata.socrata.com/resource/2e9u-3gji.json?$$app_token="+token+"&$select=zip,count(zip)&$where=zip='"+zip+"'&$group=zip", function(zipData){
				console.log(zipData[0].count_zip);
				val.properties.num311calls = zipData[0].count_zip;
				console.log(val.properties.num311calls);
				if(geojson != undefined){
					map.removeLayer(geojson);
				}
				geojson = L.geoJson(data, {
				    style: style,
				    onEachFeature: onEachFeature
				}).addTo(map);

			});
		
	/*	$.getJSON("http://api.zippopotam.us/us/md/baltimore",function(labelData){
			$.each(labelData.places,function(lkey,lval){
				
				var label = new L.Label()
			label.setContent(lval["post_code"]);
			label.setLatLng(new L.LatLng(lval.latitude, lval.longitude));
			map.showLabel(label);
			});
			
		});*/

		}
		else{
			val.properties.num311calls=0;
		}
				
			});
		
		
			
	
	
	
	});


}
function style(feature) {   
	console.log("style function: " + feature.properties.num311calls);
	
    return {
        fillColor: getColor(feature.properties.num311calls),
        weight: 1,
        opacity: 1,
        color: 'black',
        dashArray: '3',
        fillOpacity: 0.5
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
    
}
function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
	
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}




function getColor(d) {
	
    return d > 600 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 400  ? '#E31A1C' :
           d > 300  ? '#FC4E2A' :
           d > 200   ? '#FD8D3C' :
           d > 100   ? '#FEB24C' :
           d > 50   ? '#FED976' :
           d > 10   ? '#FFEDA0':
                      '#FFFFCC';
}

function doPieChart(data){
	//alert(data);
	 var w = 300,                        //width
	    h = 280,                            //height
	    r = 100,                            //radius
	    color = ['#800026','#BD0026','#E31A1C','#FC4E2A','#FD8D3C','#FEB24C','#FED976','#FFEDA0','#FFFFCC','#FFFFEE'];     //builtin range of colors
	    
	    var vis = d3.select("#piechart")
	        .append("svg:svg")              //create the SVG element inside the <body>
	        .data([data])                   //associate our data with the document
	            .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
	            .attr("height", h)
	        .append("svg:g")                //make a group to hold our pie chart
	            .attr("transform", "translate(" + r + "," + r + ")")    //move the center of the pie chart from 0, 0 to radius, radius
	 
	    var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
	        .outerRadius(r);
	 
	    var pie = d3.layout.pie()           //this will create arc data for us given a list of values
	        .value(function(d) { return d[1]; });    //we must tell it out to access the value of each element in our data array
	 
	    var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
	        .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
	        .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
	            .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
	                .attr("class", "slice");    //allow us to style things in the slices (like text)
	 
	        arcs.append("svg:path")
	                .attr("fill", function(d, i) { return color[i]; } ) //set the color for each slice to be chosen from the color function defined above
	                .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function
	 
	        var piekey = document.getElementById("piekey");
	        for (var i = 0; i < data.length; i++) {
	            piekey.innerHTML +=
	                '<i style="background:' + color[i] + '"></i> ' +
	                data[i][0] + '<br>';
	        }

	        
	        
	        arcs.append("svg:text")                                     //add a label to each slice
	                .attr("transform", function(d) {                    //set the label's origin to the center of the arc
	                //we have to make sure to set these before calling arc.centroid
	                d.innerRadius = 0;
	                d.outerRadius = r;
	                return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
	            })
	            .attr("text-anchor", "middle")                          //center the text on it's origin
	            .text(function(d, i) { return data[i][1]; });        //get the label from our original data array
	        
}
