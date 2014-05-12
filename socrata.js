var token = "nYkGKGozNTZZ4npCsN43ciFpx";
var base_url = "https://opendata.socrata.com/resource/2e9u-3gji.json?$$app_token=" + token;
var location_url = "https://opendata.socrata.com/resource/2e9u-3gji.json?$select=location";
var description_url = "https://opendata.socrata.com/resource/2e9u-3gji.json?$select=codedescription&$group=codedescription&$limit=10";
var map;

var SW = new L.MarkerClusterGroup({

		disableClusteringAtZoom: 18,
	iconCreateFunction: function (cluster) {
		var childCount = cluster.getChildCount();
		return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster marker-cluster-blue' , iconSize: new L.Point(40, 40) });	
	}
});
var HCD = new L.MarkerClusterGroup({
	disableClusteringAtZoom: 18,
	iconCreateFunction: function (cluster) {
		var childCount = cluster.getChildCount();
		return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster marker-cluster-pink' , iconSize: new L.Point(40, 40) });	
	}

});
var TRM = new L.MarkerClusterGroup({
	disableClusteringAtZoom: 18,
	iconCreateFunction: function (cluster) {
		var childCount = cluster.getChildCount();
		return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster marker-cluster-black' , iconSize: new L.Point(40, 40) });	
	}

});
var TRS = new L.MarkerClusterGroup({
	disableClusteringAtZoom: 18,
	iconCreateFunction: function (cluster) {
		var childCount = cluster.getChildCount();
		return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster marker-cluster-fuscha' , iconSize: new L.Point(40, 40) });	
	}

});
var WW = new L.MarkerClusterGroup({
	disableClusteringAtZoom: 18,
	iconCreateFunction: function (cluster) {
		var childCount = cluster.getChildCount();
		return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster marker-cluster-teal' , iconSize: new L.Point(40, 40) });	
	}
});
var TRT = new L.MarkerClusterGroup({
	disableClusteringAtZoom: 18,
	iconCreateFunction: function (cluster) {
		var childCount = cluster.getChildCount();
		return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster marker-cluster-yellow' , iconSize: new L.Point(40, 40) });	
	}
});
var HLTH = new L.MarkerClusterGroup({
	disableClusteringAtZoom: 18,
	iconCreateFunction: function (cluster) {
		var childCount = cluster.getChildCount();
		return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster marker-cluster-purple' , iconSize: new L.Point(40, 40) });	
	}
});
var BCLB = new L.MarkerClusterGroup({
	iconCreateFunction: function (cluster) {
		var childCount = cluster.getChildCount();
		return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster marker-cluster-red', iconSize: new L.Point(40, 40) });
		}
});
var ECC = new L.MarkerClusterGroup({
	iconCreateFunction: function (cluster) {
		var childCount = cluster.getChildCount();
		return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster marker-cluster-brown', iconSize: new L.Point(40, 40) });
		}
});
var FCCS = new L.MarkerClusterGroup({
	iconCreateFunction: function (cluster) {
		var childCount = cluster.getChildCount();
		return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster marker-cluster-ochre', iconSize: new L.Point(40, 40) });
		}
});
var Forestry = new L.MarkerClusterGroup({
	disableClusteringAtZoom: 18,
	iconCreateFunction: function (cluster) {
		var childCount = cluster.getChildCount();
		return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster marker-cluster-green' , iconSize: new L.Point(40, 40) });	
	}

});
var urls=[];

var currentIcon= new L.Icon.Default();
var blackIcon = new L.Icon.Default({iconUrl: 'leaflet/images/marker-icon-black.png'});
var brownIcon = new L.Icon.Default({iconUrl: 'leaflet/images/marker-icon-brown.png'});
var fuschaIcon = new L.Icon.Default({iconUrl: 'leaflet/images/marker-icon-fuscha.png'});
var greenIcon = new L.Icon.Default({iconUrl: 'leaflet/images/marker-icon-green.png'});
var ochreIcon = new L.Icon.Default({iconUrl: 'leaflet/images/marker-icon-ochre.png'});
var pinkIcon = new L.Icon.Default({iconUrl: 'leaflet/images/marker-icon-pink.png'});
var purpleIcon = new L.Icon.Default({iconUrl: 'leaflet/images/marker-icon-purple.png'});
var redIcon = new L.Icon.Default({iconUrl: 'leaflet/images/marker-icon-red.png'});
var tealIcon = new L.Icon.Default({iconUrl: 'leaflet/images/marker-icon-teal.png'});
var yellowIcon = new L.Icon.Default({iconUrl: 'leaflet/images/marker-icon-yellow.png'});


window.onload = function(){


	map = L.map('map').setView([39.28,-76.61],11);

	L.tileLayer('http://a.tiles.mapbox.com/v3/lsemesky.i7ila685/{z}/{x}/{y}.png', {
	
	attribution: '311 Service Calls Baltimore',
	maxZoom: 18
	}).addTo(map)

	

	//getMarkers(location_url);
	generateDescriptions();
	setLayers("");
	setCheckBoxes();

}

function generateDescriptions(){urls.push("SW - Sanitation & Waste");	
urls.push("Forestry - Forestry Services");
urls.push("HCD - Housing & Community Development");
urls.push("TRM - Transportation & Roadway Maintenance");
urls.push("TRS - Transportation & Roadway Service");
urls.push("WW - Water & Wastewater");
urls.push("TRT - Transportation & Roadway ");
urls.push("HLTH - Health");
urls.push("BCLB - Baltimore City Liquor");
urls.push("ECC - Roadside Maintenance");
urls.push("FCCS - Financial Complaints");
}

function setLayers(string) {
switch(string){
case "":
case "SW - Sanitation & Waste": var SW_url = base_url +"&$select=codedescription,location,address&$where=starts_with(codedescription,'SW')";
currentIcon = new L.Icon.Default();getMarkers(SW_url, SW,currentIcon); 
case "Forestry - Forestry Services":var Forest_url = base_url + "&$select=codedescription,location,address&$where=starts_with(codedescription,'Forestry')";
currentIcon = greenIcon;getMarkers(Forest_url, Forestry,currentIcon);
case "HCD - Housing & Community Development":var HCD_url = base_url +"&$select=codedescription,location,address&$where=starts_with(codedescription,'HCD')";
currentIcon = pinkIcon;getMarkers(HCD_url, HCD,currentIcon);
case "TRM - Transportation & Roadway Maintenance":var TRM_url = base_url +"&$select=codedescription,location,address&$where=starts_with(codedescription,'TRM')";
currentIcon = blackIcon;getMarkers(TRM_url, TRM,currentIcon);
case "TRS - Transportation & Roadway Service": var TRS_url = base_url +"&$select=codedescription,location,address&$where=starts_with(codedescription,'TRS')";
currentIcon = fuschaIcon;getMarkers(TRS_url, TRS,currentIcon);	
case "WW - Water & Wastewater":var WW_url = base_url +"&$select=codedescription,location,address&$where=starts_with(codedescription,'WW')";
currentIcon = tealIcon;getMarkers(WW_url, WW,currentIcon);
case "TRT - Transportation & Roadway ":var TRT_url = base_url +"&$select=codedescription,location,address&$where=starts_with(codedescription,'TRT')";
currentIcon = yellowIcon;getMarkers(TRT_url, TRT,currentIcon);
case "HLTH - Health":var HLTH_url = base_url +"&$select=codedescription,location,address&$where=starts_with(codedescription,'HLTH')";
currentIcon = purpleIcon;getMarkers(HLTH_url, HLTH,currentIcon);
case "BCLB - Baltimore City Liquor":	var BCLB_url = base_url +"&$select=codedescription,location,address&$where=starts_with(codedescription,'BCLB')";
currentIcon = redIcon;getMarkers(BCLB_url, BCLB,currentIcon);
	
case "ECC - Roadside Maintenance":var ECC_url = base_url +"&$select=codedescription,location,address&$where=starts_with(codedescription,'ECC')";
currentIcon = brownIcon;	getMarkers(ECC_url, ECC,currentIcon);
	
case "FCCS - Financial Complaints":var FCCS_url = base_url +"&$select=codedescription,location,address&$where=starts_with(codedescription,'FCCS')";
currentIcon = ochreIcon;getMarkers(FCCS_url, FCCS,currentIcon);
default: return;
}

}
function getLayers(string) {
	switch(string){
	case "SW - Sanitation & Waste": return SW;
	case "Forestry - Forestry Services": return Forestry;
	case "HCD - Housing & Community Development": return HCD;
	case "TRM - Transportation & Roadway Maintenance": return TRM;
	case "TRS - Transportation & Roadway Service": return TRS;
	case "WW - Water & Wastewater": return WW;
	case "TRT - Transportation & Roadway ": return TRT;
	case "HLTH - Health": return HLTH;
	case "BCLB - Baltimore City Liquor":	return BCLB;
	case "ECC - Roadside Maintenance":return ECC;
	case "FCCS - Financial Complaints":return FCCS;
	default: return false;
	}

	}


function getMarkers(url, layer,icon) {
	
	
	$.getJSON( url, function( data ) {
		  var items = [];
		  $.each( data, function( key, val ) {
			  
			items.push =  L.marker([val.location.latitude, val.location.longitude], {icon: icon}).addTo(layer).bindPopup(val.address+ "<br />" + val.codedescription).on('mouseover', function(evt) {
				  evt.target.openPopup();
			 }).on('mouseout', function(evt) {
			  evt.target.closePopup();
			});
		//alert(items);
	  });
		 // map.addLayer(layer);
		});
}

function getIconColor(layer){
	switch(layer){
	case SW: return tealIcon;
	case Forestry: return greenIcon;
	case HCD: return brownIcon; 
	case TRM: return redIcon;
	case TRS: return yellowIcon; 
	case WW: return new L.Icon.Default(); 
	case TRT: return pinkIcon; 
	case HLTH: return ochreIcon;
	case BCLB: return fuschaIcon; 
	case ECC: return blackIcon; 
	case FCCS: return purpleIcon; 
	default: return new L.Icon.Default();
	}
}


function setCheckBoxes() {
	var items = [];
$.each(urls,function(key,val){
	
			var str = "<input type='checkbox' onclick='getCheckBoxes();' id='" + key + "' value = '" + val + "' />" + val + "<br>";
		    items.push(str);
		  });
		 
		  $("<div/>", { 
			"id": "CheckList",
			 html: items.join( "" )
		  }).appendTo("#sidebar");
}

function getCheckBoxes() {

	var c=$("input:checked");
	var l;
//	var Redo_url =  "https://opendata.socrata.com/resource/2e9u-3gji.json?$select=codedescription,location,address,address";
	$.each(c,function(key ,val){
		l = getLayers(val.value);
		if(!map.hasLayer(l)){
			map.addLayer(l);
			
		}
		
		});
	var u = $("input:checkbox:not(:checked)");
	$.each(u, function(key,val){
		l = getLayers(val.value);
		
		if(map.hasLayer(l)){
			map.removeLayer(l);
		}
	})
	//getMarkers(Redo_url);
}

