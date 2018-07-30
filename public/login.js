/*
var email = document.querySelector('#email').value;
var password = document.querySelector('#password').value
var credential = firebase.auth.EmailAuthProvider.credential(email, password);
var auth = firebase.auth();
var currentUser = auth.currentUser;

*/
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var user = firebase.auth().currentUser;
        if (user != null) {

            if (user.email == "admin@gmail.com") {
                window.location = "Configuracion.html";
            } else {
                window.location = "Usuario.html";
            }
        }
    } else {
        // window.location = "Login.html";
    }
    // ...
});

function LoginUser() {

    var email = document.getElementById("UserName").value
    var password = document.getElementById("Password").value;


    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {

        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == "auth/user-not-found") {
            var result = confirm("Usuario no registrado se procedera a crear nuevo");
            if (result == true) {
                firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {

                    var erMsg = error.message;
                    window.alert(erMsg)
                });
            }
        } else {
            window.alert(errorMessage) //+ " cdde " + errorCode)
        }

    });
}

