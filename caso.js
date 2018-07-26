
window.onload = function (e) {
    CargarCasos();
}

function InsertCaso() {
    let comentario = GetValueControlById("txtComentario");
    let longitud = GetValueControlById("txtLongitud");
    let latitud = GetValueControlById("txtLatitud");
    let titulo = GetValueControlById("txtTitulo");
    let today = new Date().toISOString().slice(0, 10)
    var caso = {
        Comentario: comentario,
        Longitud: longitud,
        Latitud: latitud,
        Titulo: titulo,
        Fecha: today
    };
    // var result = firebase.database().ref("Casos/"+2);
    // result.set(caso);
    // var Key = firebase.database().ref().child('Casos').push().key;
    // var updates = {};
    // updates['/Casos/' + Key] = caso;  
    // firebase.database().ref().update(updates);
    var result = firebase.database().ref().child("Casos");
    result.push(caso);
    alert("Saved")
}
function _dce(el) {
    return document.createElement(el);
}
function CargarCasos() {

    var destino = document.getElementById("tblCasos")
    destino.innerHTML = "";

    var query = firebase.database().ref("Casos").limitToFirst(20);
    query.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (item) {
                tr = _dce('tr');
                td = _dce('td');

                td.innerHTML = item.val().Usuario;
                tr.appendChild(td);

                td = _dce('td');
                td.innerHTML = item.val().Titulo;
                tr.appendChild(td);

                td = _dce('td');
                td.innerHTML = item.val().Sector;
                tr.appendChild(td);

                td = _dce('td');
                td.innerHTML = item.val().Fecha;
                tr.appendChild(td);

                destino.appendChild(tr);
            });
        }).then(function () {

        });

}