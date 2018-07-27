var mytemplate = {};

mytemplate["crear_caso.tmp"] = "<div id=\"crear_caso\">\n" +
   "  <div class=\"row\">\n" +
   "   <div class=\"form-group col-md-12\">\n" +
   "     <label for=\"titulo\">Titulo</label>\n" +
   "     <input type=\"text\" id=\"txtTitulo\" class=\"form-control\">\n" +
   "   </div>\n" +
   "  </div>\n" +
   "  <div class=\"row\">\n" +
   "        <div class=\"form-group col-md-12\">\n" +
   "          <label for=\"comment\">Commentario</label>\n" +
   "          <textarea class=\"form-control\" rows=\"2\" id=\"txtComentario\"></textarea>\n" +
   "        </div>\n" +
   "      </div>\n" +
   "      <div class=\"row\">\n" +
   "        <div class=\"form-group col-md-3\">\n" +
   "          <label>Tipo </label>\n" +
   "          <select class=\"form-control\"></select>\n" +
   "        </div>\n" +
   "        <div class=\"form-group col-md-3\">\n" +
   "          <label>Latitud </label>\n" +
   "          <input type=\"text\" id=\"txtLatitud\" class=\"form-control\">\n" +
   "        </div>\n" +
   "        <div class=\"form-group col-md-3\">\n" +
   "          <label>Longitud </label>\n" +
   "          <input type=\"text\" id=\"txtLongitud\" class=\"form-control\">\n" +
   "        </div>\n" +
   "        <div class=\"form-group col-md-3\">\n" +
   "          <label for=\"inputFile\">Cargar Evidencia</label>\n" +
   "          <input type=\"file\" class=\"form-control-file\" id=\"evidencia\">\n" +
   "        </div>\n" +
   "      </div>\n" +
   "      <div class=\"row\">\n" +
   "        <div id=\"map\" style=\"width:100%; height: 400px;\"></div>\n" +
   "      </div>\n" +
   "\n" +
   "      <p>\n" +
   "        <input type=\"button\" value=\"Registrar\" onclick=\"InsertCaso()\" style=\"margin-top: 10px\" class=\"btn btn-success\">\n" +
   "      </p>\n" +
   "</div>\n" +
   "\n" +
   "<script>\n" +
   "  function myMap(lat, long) {\n" +
   "    var markers = [];\n" +
   "    var myLocation = { lat: lat, lng: long };\n" +
   "\n" +
   "    var map = new google.maps.Map(document.getElementById('map'), {\n" +
   "      zoom: 13,\n" +
   "      center: myLocation\n" +
   "    });\n" +
   "    addMarker(myLocation);\n" +
   "    showMarkers();\n" +
   "\n" +
   "    function addMarker(location) {\n" +
   "      var marker = new google.maps.Marker({\n" +
   "        position: location,\n" +
   "        map: map\n" +
   "      });\n" +
   "      markers.push(marker);\n" +
   "    }\n" +
   "\n" +
   "    function setMapOnAll(map) {\n" +
   "      for (var i = 0; i < markers.length; i++) {\n" +
   "        markers[i].setMap(map);\n" +
   "      }\n" +
   "    }\n" +
   "\n" +
   "    function clearMarkers() {\n" +
   "      setMapOnAll(null);\n" +
   "    }\n" +
   "    function deleteMarkers() {\n" +
   "      clearMarkers();\n" +
   "      markers = [];\n" +
   "    }\n" +
   "    function showMarkers() {\n" +
   "      setMapOnAll(map);\n" +
   "    }\n" +
   "\n" +
   "     google.maps.event.addListener(map, \"click\", function (e) {\n" +
   "      document.getElementById(\"txtLatitud\").value = e.latLng.lat();\n" +
   "      document.getElementById(\"txtLongitud\").value = e.latLng.lng();\n" +
   "      let newLocation = { lat: e.latLng.lat(), lng: e.latLng.lng() };\n" +
   "      clearMarkers();\n" +
   "      addMarker(newLocation)\n" +
   "    });\n" +
   "\n" +
   "    CargarMarkers = function () {\n" +
   "      var query = firebase.database().ref(\"Casos\").limitToFirst(20);\n" +
   "      query.once(\"value\")\n" +
   "        .then(function (snapshot) {\n" +
   "          snapshot.forEach(function (item) {\n" +
   "            var location = {\n" +
   "              lat: parseFloat(item.val().Latitud),\n" +
   "              lng: parseFloat(item.val().Longitud)\n" +
   "            };\n" +
   "            // alert(JSON.stringify(location))\n" +
   "            addMarker(location)\n" +
   "\n" +
   "          });\n" +
   "          showMarkers();\n" +
   "        })\n" +
   "    }\n" +
   "    CargarMarkers();\n" +
   "  }\n" +
   "\n" +
   "  function successFunction(position) {\n" +
   "    var lat = position.coords.latitude;\n" +
   "    var long = position.coords.longitude;\n" +
   "    myMap(lat, long);\n" +
   "  }\n" +
   "  function errorFunction(position) {\n" +
   "    alert('Error!');\n" +
   "  }\n" +
   "  if (navigator.geolocation) {\n" +
   "    console.log('cre map')\n" +
   "    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);\n" +
   "  }\n" +
   "</script>\n" +
   "<script src=\"https://maps.googleapis.com/maps/api/js?key=AIzaSyCMc06HQwXKYGd9HQ6lAbS96vNggKACxKE&callback=myMap\"></script>";

mytemplate["lista_casos.tmp"] = "<div class=\"row\">\n" +
   "        <table class=\"table table-striped\">\n" +
   "          <thead>\n" +
   "            <th>Usuario</th>\n" +
   "            <th>Titulo</th>\n" +
   "            <th>Ubicación</th>\n" +
   "            <th>Fecha</th>\n" +
   "            <th>Evidencia</th>\n" +
   "          </thead>\n" +
   "          <tbody id=\"tblCasos\">\n" +
   "          </tbody>\n" +
   "        </table>\n" +
   "      </div>\n" +
   "\n" +
   "      <script src=\"caso.js\"></script>";

mytemplate["usuario_temp.tmp"] = "\n" +
   "  <div id=\"user_temp\">\n" +
   "      <div>\n" +
   "          <label>Nombre</label>\n" +
   "          <input type=\"text\" name=\"nombre\" onchange=\"callchange()\"/>\n" +
   "          <button type=\"button\" onclick=\"callchange()\">click</button>\n" +
   "      </div>\n" +
   "  </div>\n" +
   "  \n" +
   "";
