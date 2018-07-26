function EnviarMensaje() {
    let titulo = GetValueControlById("txtTitulo");
    let descripcion = GetValueControlById("txtDescripcion")

    if (titulo != "" && descripcion != "") {
        var mensaje = {
            Titulo: titulo,
            Descripcion: descripcion,
        }
        var key = firebase.database.ref.child('Mensajes').push().key;
        var updates = {};
        updates['/Mensajes/' + Key] = mensaje;

        return firebase.database().ref().update(updates);
    }

}