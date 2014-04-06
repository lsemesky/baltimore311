var token = "nYkGKGozNTZZ4npCsN43ciFpx";
var url = "https://opendata.socrata.com/resource/2e9u-3gji.json?$select=zip,count(zip)&$GROUP=zip";
var geojson;
var map;
var info = L.control();


window.onload = function(){
	var mapdata; 
map = L.map('map').setView([39.28,-76.61],11);
L.tileLayer('http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png', {
   key: "008c020e60c4426fba424183cd542f23",
    styleId: 22677
}).addTo(map);
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Zip Code</h4>' +  (props ?
        '<b>' + props.ZIPCODE1 + '</b><br />' 
        : 'Hover over a state');
};

info.addTo(map);
$.getJSON( "bacizc10.json", function( data ) {
	$.each(data.features,function(key,val){
		var zip = val.properties.ZIPCODE1;
		console.log(zip)
		var num311;
		if(zip!= undefined){
			console.log(zip)
		$.getJSON("https://opendata.socrata.com/resource/2e9u-3gji.json?$$app_token="+token+"&$select=zip,count(zip),codedescription&$where=zip='"+zip+"'&$group=zip", function(zipData){
				console.log(zipData[0].count_zip);
				val.properties.num311calls = zipData[0].count_zip;
				console.log(val.properties.num311calls);
				geojson = L.geoJson(data, {
				    style: style,
				    onEachFeature: onEachFeature
				}).addTo(map);

			});

		}
		else{
			val.properties.num311calls=11111;
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
        fillOpacity: 0.05
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
           d > 10   ? '#FEDFFF':
                      '#FFEDA0';
}