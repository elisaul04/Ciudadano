
var listaImagenesConfiguradas = [];

function MostraImages() {
    var query = firebase.database().ref("Configuraciones").limitToFirst(15);
    query.once("value")
        .then(function (result) {
            result.forEach(function (item) {
                listaImagenesConfiguradas.push(item)
            });

        }).then(function () {
            var firstElment = listaImagenesConfiguradas[0];
            var div = document.getElementById('divCarouselConfiguration');
            div.innerHTML += "<div class='carousel-item active'><image  width='100%' height='300' src=" + firstElment.val().Imagen + " ></div>";

            for (i = 1; i < listaImagenesConfiguradas.length; i++) {
                div.innerHTML += "<div class='carousel-item'><image  width='100%' height='300' src=" + listaImagenesConfiguradas[i].val().Imagen + " ></div>";
            }


        });
}
MostraImages();
