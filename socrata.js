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
var urls=[];


window.onload = function(){


	map = L.map('map').setView([39.28,-76.61],11);

	L.tileLayer('http://{s}.tile.cloudmade.com/{key}/125441/256/{z}/{x}/{y}.png', {
	key: '008c020e60c4426fba424183cd542f23',
	attribution: '311 Service Calls Baltimore',
	maxZoom: 20
	}).addTo(map)

	

	//getMarkers(location_url);
	generateDescriptions();
	//setLayers();
	setCheckBoxes();

}

function generateDescriptions(){urls.push("SW - Street Works");	
urls.push("Forestry - Forestry Services");
urls.push("HCD - Housing & Community Development");
urls.push("TRM - Transportation Maintenance");
urls.push("TRS - Transportation Service");
urls.push("WW - Water & Wastewater");
urls.push("TRT - Transit");
urls.push("HLTH - Health");
urls.push("BCLB - Baltimore City Liquor");
urls.push("ECC - Roadside Maintenance");
urls.push("FCCS - Financial Complaints");
}

function setLayers(string) {
switch(string){
case "SW - Street Works": var SW_url = "https://opendata.socrata.com/resource/2e9u-3gji.json?$select=codedescription,location,address&$where=starts_with(codedescription,'SW')";
	getMarkers(SW_url, SW); break;
case "Forestry - Forestry Services":var Forest_url = "https://opendata.socrata.com/resource/2e9u-3gji.json?$select=codedescription,location,address&$where=starts_with(codedescription,'Forestry')";
	getMarkers(Forest_url, Forestry); break;
case "HCD - Housing & Community Development":var HCD_url = "https://opendata.socrata.com/resource/2e9u-3gji.json?$select=codedescription,location,address&$where=starts_with(codedescription,'HCD')";
	getMarkers(HCD_url, HCD); break;
case "TRM - Transportation Maintenance":var TRM_url = "https://opendata.socrata.com/resource/2e9u-3gji.json?$select=codedescription,location,address&$where=starts_with(codedescription,'TRM')";
	getMarkers(TRM_url, TRM); break;
case "TRS - Transportation Service": var TRS_url = "https://opendata.socrata.com/resource/2e9u-3gji.json?$select=codedescription,location,address&$where=starts_with(codedescription,'TRS')";
getMarkers(TRS_url, TRS);	break;
case "WW - Water & Wastewater":var WW_url = "https://opendata.socrata.com/resource/2e9u-3gji.json?$select=codedescription,location,address&$where=starts_with(codedescription,'WW')";
	getMarkers(WW_url, WW); break;
case "TRT - Transit":var TRT_url = "https://opendata.socrata.com/resource/2e9u-3gji.json?$select=codedescription,location,address&$where=starts_with(codedescription,'TRT')";
	getMarkers(TRT_url, TRT); break;
case "HLTH - Health":var HLTH_url = "https://opendata.socrata.com/resource/2e9u-3gji.json?$select=codedescription,location,address&$where=starts_with(codedescription,'HLTH')";
	getMarkers(HLTH_url, HLTH); break;
case "BCLB - Baltimore City Liquor":	var BCLB_url = "https://opendata.socrata.com/resource/2e9u-3gji.json?$select=codedescription,location,address&$where=starts_with(codedescription,'BCLB')";
	getMarkers(BCLB_url, BCLB); break;
	
case "ECC - Roadside Maintenance":var ECC_url = "https://opendata.socrata.com/resource/2e9u-3gji.json?$select=codedescription,location,address&$where=starts_with(codedescription,'ECC')";
	getMarkers(ECC_url, ECC); break;
case "FCCS - Financial Complaints":var FCCS_url = "https://opendata.socrata.com/resource/2e9u-3gji.json?$select=codedescription,location,address,address&$where=starts_with(codedescription,'FCCS')";
	getMarkers(FCCS_url, FCCS); break;
default: return;
}

}
function getLayers(string) {
	switch(string){
	case "SW - Street Works": return SW;
	case "Forestry - Forestry Services": return Forestry;
	case "HCD - Housing & Community Development": return HCD;
	case "TRM - Transportation Maintenance": return TRM;
	case "TRS - Transportation Service": return TRS;
	case "WW - Water & Wastewater": return WW;
	case "TRT - Transit": return TRT;
	case "HLTH - Health": return HLTH;
	case "BCLB - Baltimore City Liquor":	return BCLB;
		
	case "ECC - Roadside Maintenance":return ECC;
	case "FCCS - Financial Complaints":return FCCS;
	default: return;
	}

	}

function getMarkers(url, layer) {
	//if (markers != undefined){map.removeLayer(markers);}

	$.getJSON( url, function( data ) {
		  var items = [];
		  $.each( data, function( key, val ) {
			items.push =  L.marker([val.location.latitude, val.location.longitude]).addTo(layer).bindPopup(val.address+ "<br />" + val.codedescription);
			//alert(items);
		  });
		  map.addLayer(layer);
		});
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
//	var Redo_url =  "https://opendata.socrata.com/resource/2e9u-3gji.json?$select=codedescription,location,address,address";
	$.each(c,function(key ,val){
		setLayers(val.value);
		});
	var u = $("input:checkbox:not(:checked)");
	$.each(u, function(key,val){
		map.removeLayer(getLayers(val.value));
	})
	//getMarkers(Redo_url);
}

