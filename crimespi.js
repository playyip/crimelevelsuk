function latlong(){
    return position.coords.latitude + ", " + position.coords.longitude   
}
function newGmap(center, zoOm, ){
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

