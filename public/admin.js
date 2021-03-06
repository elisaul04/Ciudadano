var ctx = document.getElementById("grafica").getContext('2d');
var valorA = 8;
var valorB = 2;
var valorC = 5;
var grafica = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Repacion de Calle", "Estendido Electrico"],
        datasets: [{
            label: '',
            data: [valorA, valorB],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },

});
