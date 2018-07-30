
window.onload = function (e) {
    CargarCasos();
}


function DetalleCaso(i) {
    // alert(item)
    frebase.database.ref('Casos').child(i)
        .once('value')
        .then(function (snapshot) {
            var value = snapshot.val();
            console.log('Casos:', value.Usuario);
            resp.json(value.Usuario);
        })
        .catch(next);
    //const location = $firebaseObject(item);
    //alert(location)
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
                td.innerHTML = '<button data-toggle="modal" data-target="#myModal" class="btn btn-success"  onclick=DetalleCaso(' + item.key + ')>Ver Detalle</button>';
                tr.appendChild(td);
                destino.appendChild(tr);
            });
        }).then(function () {

        });
}

