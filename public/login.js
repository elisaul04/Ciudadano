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

    // firebase.auth().signInWithEmailAndPassword(email, password)
    //     .then((authData) => {
    //         console.log("User created successfully with payload-", authData);
    //         // alert(authData)
    //         var user = firebase.auth().currentUser;
    //     }).catch((_error) => {
    //         console.log("Login Failed!", _error);
    //     })
    // firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     window.alert(errorMessage)
    // });
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert(errorMessage)
    });
}

