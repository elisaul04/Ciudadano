
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
        Fecha: today,
        TipoCaso : 1,
    };
    // var result = firebase.database().ref("Casos/"+2);
    // result.set(caso);
    var Key = firebase.database().ref().child('Casos').push().key;
    var updates = {};



    // var result = firebase.database().ref().child("Casos");
    // result.push(caso);

    // var storageRef = firebase.storage().ref('some/storage/bucket');
    // var saveDataRef = firebase.database().ref('users/');
    // var f = GetValueControlById("evidencia");
    // var uploadTask = storageRef.put(f);

    // uploadTask.on('state_changed', (err) => {
    //     console.log('Upload error:', err);
    // }, () => {
    //     saveDataRef.update({
    //         name: 'alex',
    //         age: 23,
    //         profession: 'superhero',
    //         image: uploadTask.snapshot.downloadURL
    //     });
    // });
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
                console.log(url);
                //firebase.database().ref().child('Casos/')
              //  .update({ Titulo: "Elis" });
              caso.Evidencia = url;   
              updates['/Casos/' + Key] = caso;
              firebase.database().ref().update(updates);         
            })
            .catch(console.error);
    }

 


    alert("Saved")
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
                td.innerHTML = item.val().Sector;
                tr.appendChild(td);

                td = _dce('td');
                td.innerHTML = item.val().Fecha;
                tr.appendChild(td);

                td = _dce('td');
                td.innerHTML =  "<image  style='height:80px' src="+ item.val().Evidencia+" >"
                tr.appendChild(td);
                destino.appendChild(tr);
            });
        }).then(function () {

        });

}

