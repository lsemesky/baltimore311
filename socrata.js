var token = "nYkGKGozNTZZ4npCsN43ciFpx";
var url = "https://opendata.socrata.com/resource/2e9u-3gji.json?$select=location";

$.getJSON( url, function( data ) {
	  var items = [];
	  $.each( data, function( key, val ) {
	    items.push( "<li id='" + key + "'>" + val.location.longitude + "</li>" );
	  });
	 
	  $( "<ul/>", {
	    "class": "my-new-list",
	    html: items.join( "" )
	  }).appendTo( "body" );
	});
