const ctx = document.getElementById('graph-display').getContext('2d');
const graph = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Balance',
            data: [],
            borderColor: 'rgba(153, 102, 255, 1)',
            fill: false,
        },
            {
                label: 'Trendline',
                data: [],
                borderColor: 'rgba(153, 102, 255, .5)',
                borderDash: [5],
                pointRadius: 0,
                fill: false,
            }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        scaleLabel: "<%=value%>%",
        legend: {
            display: false
        },
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    return data.labels[tooltipItem.index] + ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + '€';
                }
            }
        }
    }
});