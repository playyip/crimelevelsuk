var myLat;
var myLong;
var gotLocation = false;

function latlong(){
    return position.coords.latitude + ", " + position.coords.longitude   
}
function newGmap(center, zoOm){
      var home = new google.maps.LatLng(center);
    var mapOptions = {
        zoom: zoOm,
        center: home
    }
}
function displayGmap(){
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    google.maps.event.addDomListener(window, 'load', newGmap);
}
function newGmarker(position, titles){
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        title: titles
    })
}

function getLocation() {
	alert("Starting");
	var options = {
	  enableHighAccuracy: true,
	  timeout: 5000,
	  maximumAge: 0
	};
    if (navigator.geolocation) {
        alert("getting location");
		var geo = navigator.geolocation;
		alert("getting pos");
		geo.getCurrentPosition(showPosition, showError, options);
    } else {
	    alert("can't get location");
        //x.innerHTML = "GPS Is not available with your browser :( Please download Google Chrome here at https://www.google.com/intl/en_uk/chrome/browser/.";
    }
}
function showError(error){
	alert(":( y it no work");
}
function showPosition(position){
	alert("here");
	myLat = position.coords.latitude;
	myLong = position.coords.longitude;
	gotLocation = true;
	alert("1	" + myLat + " " + myLong);

}

function processApi(allText) {
	getLocation();
alert("2 " + myLat + " " + myLong);
var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
	  //center: new google.maps.LatLng(myLat, myLong),
	  center: 0,0,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var jsonArray = JSON.parse( allText );
	var infowindow = new google.maps.InfoWindow();
    var marker, i;
	for (var i=0; i<jsonArray.length; i++) {
	 marker = new google.maps.Marker({
        position: new google.maps.LatLng(jsonArray[i].location.latitude,jsonArray[i].location.longitude),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(jsonArray[i].category);
          infowindow.open(map, marker);
        }
      })(marker, i));
	//alert(jsonArray[i].location.latitude + " " + jsonArray[i].location.longitude)
    }

 
    for (i = 0; i < jsonArray.length; i++) {  
     
    }
}

