export default class Generator {

    title;
    data;
    chart;
    color;
    labels;
    min;
    reverse;

    constructor(title, chart, data, color) {
        this.title = title;
        this.chart = chart;
        this.data = data;
        this.color = color;
        this.labels = [];
        let id = 1;
        this.data.forEach(label => {
            this.labels.push(id);
            id++;
        })
        if(this.title === "Position") {
            this.min = 1;
            this.reverse = true;
        }else{
            this.min = 0;
            this.reverse = false;
        }
    }

    set title(title) {
        this.title = title;
    }

    set data(data) {
        this.data = data;
    }

    get title() {
        return this.title;
    }

    get data() {
        return this.data;
    }

    generate() {
        document.documentElement.style.overflow = '';
        console.log(this.labels);
        console.log(this.min);
        const corps = `<canvas id="${this.chart}" width="200" height="50"></canvas>
<script>
var ctx = document.getElementById('${this.chart}').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [${this.labels}],
        datasets: [{
            label: "${this.title}",
            data: [${this.data}],
            backgroundColor: [
                'rgba(${this.color}, 0.0)',
            ],
            borderColor: [
                'rgba(${this.color}, 1)',
            ],
            borderWidth: 1
		}]
    },
    options: {
        legend: {
            display: "false"
        },
        title: {
            text: "${this.title}",
            display: "true"
        },
        elements: {
            point: {
                radius: 3,
                backgroundColor: 'rgba(${this.color}, 1)',
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    min: ${this.min},
                    reverse : ${this.reverse}
                }
            }]
        }
    }
});
</script>`;
        return corps;
    }
}