var crimes = {};
var colours = ['#00FF00','#00FFFF','#008000','#B22222','#0000CD','#FF4500','#6B8E23','#000080','#00FF7F','#4682B4','#FF6347','#800000','#008080','#32CD32','#008080']

var colourPos = 0;
function getNextColour() {
    var myColour = colours[colourPos];
    colourPos ++;
    return myColour;
}
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "GPS Is not available with your browser :( Please download Google Chrome here at https://www.google.com/intl/en_uk/chrome/browser/.";
    }
}

function showPosition(position) {
    var myDate = getParameterByName('date');
    if (!myDate) {
        myDate = "2014-01";
    }
    var dateDiv = document.getElementById('theDate');
    dateDiv.innerHTML = 'The date = ' + myDate;
    getCrimes(position.coords.latitude, position.coords.longitude, myDate);
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getDateFromQuery(date) {
    
    
} 

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

      var counter = 0;
      Object.keys(images).forEach(function (crimeName) {

          var icon = images[crimeName];
          var div = document.createElement('div');
          div.innerHTML = '<img src="' + icon + '"> ' + crimeName;
          legend.appendChild(div);
      })
    
  var jsonArray = JSON.parse( allText );
  var infowindow = new google.maps.InfoWindow();
  var marker, i;
  for (var i=0; i<jsonArray.length; i++) {
   addCrime(jsonArray[i].category)
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
  pieChart();
}

function makePage() {
  // getCrimes("52.629729", "-1.131592", "2014-05");
  getLocation();
}

function getCrimes(lat, lng, date) {
  $.ajax({
      type: "GET",
      url: "http://data.police.uk/api/crimes-street/all-crime?lat="+lat+"&lng="+lng+"&date="+date,
      dataType: "text",
      success: function(data) {processApi(data, lat, lng);}
  });
}

function addCrime(crimeName) {
    if (crimes.hasOwnProperty(crimeName)) {
        crimes[crimeName] = crimes[crimeName] + 1;
    }
    else {
        crimes[crimeName] = 1;
    }
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
function pieChart() {
    var slices = [];
    Object.keys(crimes).forEach(function (key) {
        var slice = [];
        slice['value'] = crimes[key];
        slice['color'] = getNextColour();
        slice['label'] = key;
        slices.push(slice);
    })
    var ctx = $("#myChart").get(0).getContext("2d");
    var myDoughnutChart = new Chart(ctx).Doughnut(slices);
}
