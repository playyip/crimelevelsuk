function processApi(allText, lat, lng) {

  var show_image = true;
  var images = makeImages();

  
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: new google.maps.LatLng(lat, lng),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('legend'));

  var legend = document.getElementById('legend');

    Object.keys(images).forEach(function(crimeName){
      var icon = images[crimeName];
      var div = document.createElement('div');
      div.innerHTML = '<img src="' + icon + '"> ' + crimeName;
      legend.appendChild(div);
    })

  var jsonArray = JSON.parse( allText );
  var infowindow = new google.maps.InfoWindow();
  var marker, i;
  for (var i=0; i<jsonArray.length; i++) {


    
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(jsonArray[i].location.latitude,jsonArray[i].location.longitude),
      map: map,
      title: jsonArray[i].category,
      icon: images[jsonArray[i].category]
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(jsonArray[i].category);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }
}

function makePage() {
  getCrimes("52.629729", "-1.131592", "2014-05");
}

function getCrimes(lat, lng, date) {
  $.ajax({
      type: "GET",
      url: "http://data.police.uk/api/crimes-street/all-crime?lat="+lat+"&lng="+lng+"&date="+date,
      dataType: "text",
      success: function(data) {processApi(data, lat, lng);}
  });
}

function makeImages(){
  var images = {};
  images["all-crime"] = 'images/Zombie_1.png';
  images["other-crime"] = 'images/Zombie_1.png';
  images["bicycle-theft"] = 'images/Zombie_1.png';
  images["burglary"] = 'images/Zombie_2.png';
  images["other-theft"] = 'images/Zombie_2.png';
  images["public-order"] = 'images/Zombie_2.png';
  images["murder"] = 'images/Zombie_3.png';
  images["violent-crime"] = 'images/Zombie_3.png';
  images["theft-from-the-person"] = 'images/Zombie_3.png';
  images["anti-social-behaviour"] = 'images/Zombie_4.png';
  images["public-disorder-weapons"] = 'images/Zombie_4.png';
  images["robbery"] = 'images/Zombie_5.png';
  images["shoplifting"] = 'images/Zombie_5.png';
  images["criminal-damage-arson"] = 'images/Zombie_6.png';
  images["drugs"] = 'images/Zombie_6.png';
  images["possession-of-weapons"] = 'images/Zombie_6.png';
  images["kidnapping"] = 'images/Zombie_7.png';
  images["vehicle-crime"] = 'images/Zombie_7.png';
  return images;
}
