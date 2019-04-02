import Chart from 'chart.js';
import $ from 'jquery';

const data = [1,2,3,4,5];
const corps = `<canvas id="myChart" width="400" height="400"></canvas>
<script>
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']],
        datasets: [{
            label: '# of Votes',
			data: [${data}],
            backgroundColor: [
                'rgba(0, 0, 0, 0.0)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
		}]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
</script>`;
$('.chart').html(corps);