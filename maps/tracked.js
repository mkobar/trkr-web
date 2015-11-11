
var yellowPin = L.icon({
    iconUrl: 'images/yellowpin2.png',
    iconAnchor:   [12, 60], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var bluePointer = L.icon({
    iconUrl: 'images/bluepin2.png',
    iconAnchor:   [12, 60], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

function AddMarkersForMembers(members){
	var markers = [];
	for (var i in members){
		//alert("lat: " + locations[i].lat +", lon: "+locations[i].lon);
		var marker = L.marker([members[i].location.lat, members[i].location.lon], {icon: bluePointer}).addTo(map);
		markers.push(marker);
	}
	return markers;
}


function ShowWindowForNearestMember(member,marker){
	marker.bindPopup("<b>Member</b><br />"+ member.name).openPopup();
	marker.setIcon(yellowPin);

}
function GetMembersFromJson(val, team){
	var locations = [];
	if (team==""){
		for (var i in val ){
			locations.push(val[i]);	 
		}
	}
	else{
		for (var i in val ){
			if (val[i].team == team){
				locations.push(val[i]);
			} 
		}
	}
	return locations;
}

function ShowMembers(team){
	$.getJSON( "mydata.json", function( data ) {
		var items = [];
		$.each( data, function( key, val ) {
			var member = GetMembersFromJson(val, team);
			var markers = AddMarkersForMembers(member);
			
			if (markers.length > 0){
				ShowWindowForNearestMember(member[0],markers[0]);
			}
			

			});
	});
}

window.onload = function() {

    ShowMembers("");

    return false;
}
