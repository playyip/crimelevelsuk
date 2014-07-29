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

function newMap(){
    var images = {};
        images["all-crime"] = 'images/Zombie_1.png';
        images["burglary"] = 'images/Zombie_2.png';
        images["murder"] = 'images/Zombie_3.png';
        images["ASBO"] = 'images/Zombie_4.png';
        images["robbery"] = 'images/Zombie_5.png';
        images["serial-kill"] = 'images/Zombie_6.png';
        images["kidnapping"] = 'images/Zombie_7.png';
         
        var show_image = true;
        
        var coords = [
              [-25.363882,131.044922,"arson"],
              [51.5072,0.1275,"burglary"],
              [6.1324,-4.1453,"murder"]
        ];

        var mid = new google.maps.LatLng(coords[0][0],coords[0][1]);

        var mapOptions = {
          zoom: 2,
          center: mid
        }

        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
  document.getElementById('legend'));

        for (var i = 0; i < coords.length; i++) {
          
          var myLatlng = new google.maps.LatLng(coords[i][0],coords[i][1]);

          if (show_image == true){

            var Zombie_1 = new google.maps.Marker({
              position: myLatlng,
              map: map,
              title: 'Hello World!',
              icon: images[coords[i][2]]
            });
          }
          else {
            var marker = new google.maps.Marker({
              position: myLatlng,
              map: map,
              title: 'Hello World!'
            });
          }
        }

        var legend = document.getElementById('legend');

        Object.keys(images).forEach(function(crimeName){
          var icon = images[crimeName];
          var div = document.createElement('div');
          div.innerHTML = '<img src="' + icon + '"> ' + crimeName;
          legend.appendChild(div);
        })
      }

      google.maps.event.addDomListener(window, 'load', initialize);

}