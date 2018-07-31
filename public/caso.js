
window.onload = function (e) {
    CargarCasos();
}


function DetalleCaso(key) {
    var query = firebase.database().ref("Casos").orderByChild("Usuario").equalTo(key);
    query.on('value', function (snapshot) {
        //snapshot would have list of NODES that satisfies the condition
        // alert(JSON.stringify(snapshot.val()))

        snapshot.forEach(function (result) {
            // var key = childSnapshot.key;
            document.getElementById("txtUsuarioDetalle").value = result.val().Usuario;
            document.getElementById("txtTituloDetalle").value = result.val().Titulo;
            document.getElementById("txtFechaDetalle").value = result.val().Fecha;
            document.getElementById("txtDescripcionDetalle").value = result.val().Comentario;
        });

    });
    // firebase.database().ref('Casos')
    //     .orderByChild('Usuario')
    //     .startAt(null, key)   // this is the key of the 3rd matching record.
    //     .limitToFirst(3)
    //     .once('chield', function (snapshot) {
    //         var key = snapshot.key;
    //         var data = snapshot.val();
    //         // console.log(key + ': ' + JSON.stringify(data))
    //         alert(JSON.stringify(data))
    //     })

    $("#myModal").modal('show');

}
function _dce(el) {
    return document.createElement(el);
}
function CargarCasos() {

    var destino = document.getElementById("tblCasos")
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

                td = _dce("td");
                let llave = item.val().Usuario;
                td.innerHTML = `<button data-toggle="modal" data-target='#myModal' class='btn btn-success'  onclick=DetalleCaso("${llave}")>Ver Detalle</button>`;
                tr.appendChild(td);
                destino.appendChild(tr);
            });
        }).then(function () {

        });
}

