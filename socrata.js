var token = "nYkGKGozNTZZ4npCsN43ciFpx";
var url = "https://opendata.socrata.com/resource/2e9u-3gji.json?$select=location";


window.onload = function(){
var map = L.map('map').setView([39.28,-76.61],15);
alert('hi');
L.tileLayer('http://{s}.tile.cloudmade.com/008c020e60c4426fba424183cd542f23/125441/256/{z}/{x}/{y}.png', {
attribution: 'Baltimore Map Trial 1.1',
maxZoom: 20
	}).addTo(map)

L.marker([39.28326056920309, -76.59904929010796]).addTo(map)
.bindPopup('A pretty CSS3 popup. <br> Easily customizable.')
.openPopup();

$.getJSON( url, function( data ) {
	  var items = [];
	  $.each( data, function( key, val ) {
		  L.marker([val.location.latitude, val.location.longitude]).addTo(map)
	    items.push( "<li id='" + key + "'>" + val.location.longitude + "</li>" );
	  });
	 
	  $( "<ul/>", {
	    "class": "my-new-list",
	    html: items.join( "" )
	  }).appendTo( "body" );
	});
}