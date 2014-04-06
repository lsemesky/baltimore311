var token = "nYkGKGozNTZZ4npCsN43ciFpx";
var location_url = "https://opendata.socrata.com/resource/2e9u-3gji.json?$select=location";
var description_url = "https://opendata.socrata.com/resource/2e9u-3gji.json?$select=codedescription&$group=codedescription&$limit=10";
var map;

var SW = L.layerGroup();
var HCD = L.layerGroup();
var TRM = L.layerGroup();
var TRS = L.layerGroup();
var WW = L.layerGroup();
var TRT = L.layerGroup();
var HLTH = L.layerGroup();
var BCLB = L.layerGroup();
var ECC = L.layerGroup();
var FCCS = L.layerGroup();
var Forestry = L.layerGroup();


window.onload = function(){

	map = L.map('map').setView([39.28,-76.61],15);

	L.tileLayer('http://{s}.tile.cloudmade.com/008c020e60c4426fba424183cd542f23/125441/256/{z}/{x}/{y}.png', {
	attribution: '311 Service Calls Baltimore',
	maxZoom: 20
	}).addTo(map)

	L.marker([39.28326056920309, -76.59904929010796]).addTo(map)
	.bindPopup('A pretty CSS3 popup. <br> Easily customizable.')
	.openPopup();

	//getMarkers(location_url);

	setLayers();
}

function setLayers() {
	var SW_url = "https://opendata.socrata.com/resource/2e9u-3gji.json?$select=codedescription,location&$where=starts_with(codedescription,'SW')";
	//getMarkers(SW_url, SW);
	var Forest_url = "https://opendata.socrata.com/resource/2e9u-3gji.json?$select=codedescription,location&$where=starts_with(codedescription,'Forestry')";
	getMarkers(Forest_url, Forestry);
	var _url = "https://opendata.socrata.com/resource/2e9u-3gji.json?$select=codedescription,location&$where=starts_with(codedescription,'Forestry')";
	getMarkers(Forest_url, Forestry);
var Forest_url = "https://opendata.socrata.com/resource/2e9u-3gji.json?$select=codedescription,location&$where=starts_with(codedescription,'Forestry')";
	getMarkers(Forest_url, Forestry);
}

function getMarkers(url, layer) {
	//if (markers != undefined){map.removeLayer(markers);}

	$.getJSON( url, function( data ) {
		  var items = [];
		  $.each( data, function( key, val ) {
			items.push =  L.marker([val.location.latitude, val.location.longitude]).addTo(layer);
			//alert(items);
		  });
		  map.addLayer(layer);
		});
}


function setCheckBoxes() {

$.getJSON( description_url, function( data ) {
		  var items = [];
		  $.each( data, function( key, val ) {
			var str = "<input type='checkbox' onclick='getCheckBoxes();' id='" + key + "' value = '" + val.codedescription + "' checked/>" + val.codedescription + "<br>";
		    items.push(str);
		  });
		 
		  $("<div/>", { 
			"id": "CheckList",
			 html: items.join( "" )
		  }).appendTo("#sidebar");
		});
}

function getCheckBoxes() {

	var c=$("input:checked");
	var Redo_url =  "https://opendata.socrata.com/resource/2e9u-3gji.json?$select=codedescription,location";
	$.each(c,function(key ,val){
		if(key == 0){ Redo_url = Redo_url + "&$where=codedescription='" + val.value +"'";}
		else{ Redo_url = Redo_url + "OR codedescription='" + val.value +"'";}
		});
	getMarkers(Redo_url);
}

