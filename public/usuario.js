

//alert(user.email)
function successFunction(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    myMap(lat, long)
}
function errorFunction(position) {
    alert('Error!');
}
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
}
function myMap(lat, long) {

    var markers = [];
    var myLocation = { lat: lat, lng: long };

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: myLocation
    });
    addMarker(myLocation)

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

function Salir() {
    firebase.auth().signOut().then(function () {
        window.location = "Index.html";
    }).catch(function (error) {
        // An error happened.
    });
}
function ResetPasswod() {
    let oldContrasena = GetValueControlById("txtContrasenaAnterior");
    let nuevaContrasena = GetValueControlById("txtNuevaContrasena");
    let confirmacion = GetValueControlById("txtConfirmacionContrasena");
    if (nuevaContrasena == confirmacion) {
        firebase.auth()
            .signInWithEmailAndPassword(firebase.auth().currentUser.email, oldContrasena)
            .then(function (user) {

                firebase.auth().currentUser.updatePassword(nuevaContrasena).then(function () {

                    //Do something

                }).catch(function (err) {
                    //Do something
                });

            }).catch(function (err) {
                //Do something
            });

    } else {
        alert("La contrasena y la confirmacion debe ser la misma")
    }
}
function GetValueControlById(el) {
    return document.createElement(el);
}
function InsertCaso() {
    let comentario = document.getElementById("txtComentario").value;
    let longitud =  document.getElementById("txtLongitud").value;
    let latitud =  document.getElementById("txtLatitud").value;
    let titulo =  document.getElementById("txtTitulo".value);
    let today = new Date().toISOString().slice(0, 10)
    var caso = {
        Comentario: comentario,
        Longitud: longitud,
        Latitud: latitud,
        Titulo: titulo,
        Fecha: today,
        TipoCaso: 1,
        Usuario: document.getElementById("currentUser").innerHTML
    };
    // var result = firebase.database().ref("Casos/"+2);
    // result.set(caso);
    var Key = firebase.database().ref().child('Casos').push().key;
    var updates = {};


    var f = GetValueControlById("evidencia");
    const file = document.querySelector('#evidencia').files[0]

    loadI()

    function loadI() {
        const ref = firebase.storage().ref();
        const file = document.querySelector('#evidencia').files[0]
        const name = (+new Date()) + '-' + file.name;
        const metadata = {
            contentType: file.type
        };
        const task = ref.child(name).put(file, metadata);
        task
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then((url) => {
                caso.Evidencia = url;
                updates['/Casos/' + Key] = caso;
                firebase.database().ref().update(updates);
            })
            .catch(console.error);
    }

    alert("Guardado Sastifactoriamente")
}
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var currentUser = firebase.auth().currentUser;
        if (user != null) {
            document.getElementById("currentUser").innerHTML = currentUser.email;
            CargarCasos(currentUser.email);
        } else {
            window.location = "Login.html";
        }
    } else {
        // window.location = "Login.html";
    }
    // ...
});
function _dce(el) {
    return document.createElement(el);
}
function EnviarMensaje() {

    let titulo = GetValueControlById("txtTituloMensaje");
    let descripcion = GetValueControlById("txtDescripcionMensaje")

    //if (titulo != "" && descripcion != "") {
    var mensaje = {
        Titulo: titulo,
        Descripcion: descripcion,
        Fecha: new Date().toISOString().slice(0, 10),
        Usuario: document.getElementById("currentUser").innerHTML
    }
    var result = firebase.database().ref().child("Mensajes");
    result.push(mensaje);

    alert("Enviado Exitosamente")
}
var us = document.getElementById("currentUser").innerHTML;
function ListarMesaje() {

    var destinoMesaje = document.getElementById("tblMensajes")
    destinoMesaje.innerHTML = "";

    //var query = firebase.database().ref("Mensajes").limitToFirst(10);
    var query = firebase.database().ref("Mensajes");

    query.once("value")
        .then(function (result) {
            result.forEach(function (item) {
                tr = _dce('tr');


                td = _dce('td');
                td.innerHTML = item.val().Titulo;
                tr.appendChild(td);

                td = _dce('td');
                td.innerHTML = item.val().Fecha;
                tr.appendChild(td);

                td = _dce('td');
                td.innerHTML = item.val().Descripcion;
                tr.appendChild(td);
                destinoMesaje.appendChild(tr);
            });
        }).then(function () {

        });

}
function CargarCasos(user) {
 
    var destino = document.getElementById("tblCasosCreados")
    destino.innerHTML = "";
 
    var query = firebase.database().ref("Casos").orderByChild("Usuario").equalTo(user);
    query.on('value', function (snapshot) {

        snapshot.forEach(function (item) {
            tr = _dce('tr');
            td = _dce('td');

            td.innerHTML = item.val().Usuario;
            tr.appendChild(td);

            td = _dce('td');
            td.innerHTML = item.val().Titulo;
            tr.appendChild(td);


            td = _dce('td');
            td.innerHTML = item.val().Fecha;
            tr.appendChild(td);

            td = _dce('td');
            td.innerHTML = "<image  style='height:80px' src=" + item.val().Evidencia + " >"
            tr.appendChild(td);
            destino.appendChild(tr);
        });

    });

    // var q = firebase.database().ref("Casos").limitToFirst(15);
    // q.once("value")
    //     .then(function (result) {
    //         result.forEach(function (item) {

    //         });
    //     }).then(function () {

    //     });
}


ListarMesaje();
//CargarCasos();