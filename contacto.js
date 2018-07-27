function EnviarMensaje() {

    let titulo = GetValueControlById("txtTituloMensaje");
    let descripcion = GetValueControlById("txtDescripcionMensaje")

    //if (titulo != "" && descripcion != "") {
    var mensaje = {
        Titulo: titulo,
        Descripcion: descripcion,
        Fecha: new Date().toISOString().slice(0, 10)
    }
    var result = firebase.database().ref().child("Mensajes");
    result.push(mensaje);

    alert("Enviado Exitosamente")
}

function ListarMesaje() {

    var destino = document.getElementById("tblMensajes")
    destino.innerHTML = "";

    var query = firebase.database().ref("Mensajes").limitToFirst(10);
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
                destino.appendChild(tr);
            });
        }).then(function () {

        });

}
ListarMesaje();