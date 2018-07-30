

function successFunction(position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  myMap(lat, long)
}
function errorFunction(position) {
  alert('Error!');
}
// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
// }

function myMap() {

  var markers = [];
   
  var myLatLng = { lat: 18.473807, lng: -69.913407 };
 

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: myLatLng
  });
  //addMarker(myLocation)

  function addMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
    markers.push(marker);
  }

  function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  function clearMarkers() {
    setMapOnAll(null);
  }
  function deleteMarkers() {
    clearMarkers();
    markers = [];
  }
  function showMarkers() {

    setMapOnAll(map);
  }

  google.maps.event.addListener(map, "click", function (e) {
    document.getElementById("txtLatitud").value = e.latLng.lat();
    document.getElementById("txtLongitud").value = e.latLng.lng();
    let newLocation = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    clearMarkers();
    addMarker(newLocation)
  });
  CargarMarkers = function () {
    var query = firebase.database().ref("Casos").limitToFirst(20);
    query.once("value")
      .then(function (snapshot) {
        snapshot.forEach(function (item) {
          var location = {
            lat: parseFloat(item.val().Latitud),
            lng: parseFloat(item.val().Longitud)
          };

          addMarker(location)

        });
        showMarkers();
      })
  }
  CargarMarkers();

}

myMap()