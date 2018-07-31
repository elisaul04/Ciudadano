
var imagesConfiguracions = []
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var currentUser = firebase.auth().currentUser;
        if (user != null) {
            document.getElementById("currentUser").innerHTML = currentUser.email;
        } else {
            window.location = "Login.html";
        }
    } else {
        // window.location = "Login.html";
    }
    // ...
});
function Salir() {
    firebase.auth().signOut().then(function () {
        window.location = "Index.html";
    }).catch(function (error) {
        // An error happened.
    });
}
function MostraImages() {
    // var destino = document.getElementById("tblImagenConfigurada")
    //destino.innerHTML = "";
    // imagesConfiguracions.forEach(function (item) {
    //     tr = _dce('tr');
    //     td = _dce('td');

    //     td.innerHTML = "<image  style='height:80px' src=" + item + " >"
    //     tr.appendChild(td);
    //     destino.appendChild(tr);

    // });

    var query = firebase.database().ref("Configuraciones").limitToFirst(15);
    query.once("value")
        .then(function (result) {
            result.forEach(function (item) {
                var div = document.getElementById('divImagenesConfiguracion');
                div.innerHTML += "<div class='col-sm-6 '><image style='height:100px' src=" + item.val().Imagen + " ></div>";

            });
        }).then(function () {

        });
}
MostraImages();
var miImage = "";
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imgConfiguracion').attr('src', e.target.result);
            miImage = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function _dce(el) {
    return document.createElement(el);
}
$("#uploadImage").change(function () {
    readURL(this);
  
});
function CargarImagen() {
    var imgFullURL = $('imgConfiguracion');
    imagesConfiguracions.push(miImage);

    MostraImages();
    SubirImagen()
    alert("Imagen Cargada Exitosamente")
}
function SubirImagen() {
    var Key = firebase.database().ref().child('Configuraciones').push().key;
    var updates = {};
    let today = new Date().toISOString().slice(0, 10)
    var configuracion = {
        Fecha: today,
    };
    const ref = firebase.storage().ref();
    const file = document.querySelector('#uploadImage').files[0]
    const name = (+new Date()) + '-' + file.name;
    const metadata = {
        contentType: file.type
    };
    const task = ref.child(name).put(file, metadata);
    task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then((url) => {
            configuracion.Imagen = url;
            updates['/Configuraciones/' + Key] = configuracion;
            firebase.database().ref().update(updates);
        })
        .catch(console.error);
}
function ListarMesaje() {

    var destinoMesaje = document.getElementById("tblMensajes")
    destinoMesaje.innerHTML = "";

    var query = firebase.database().ref("Mensajes").limitToFirst(10);
    query.once("value")
        .then(function (result) {
            result.forEach(function (item) {
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
                td.innerHTML = item.val().Descripcion;
                tr.appendChild(td);
                destinoMesaje.appendChild(tr);
            });
        }).then(function () {

        });

}
function CargarCasos() {

    var destino = document.getElementById("tblCasosCreados")
    destino.innerHTML = "";

    var query = firebase.database().ref("Casos").limitToFirst(15);
    query.once("value")
        .then(function (result) {
            result.forEach(function (item) {
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
        }).then(function () {

        });
}


ListarMesaje();
CargarCasos();
