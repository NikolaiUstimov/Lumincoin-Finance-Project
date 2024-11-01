export class Main {
  constructor() {
    this.chartOne = document.getElementById('revenuesChart');
    this.chartTwo = document.getElementById('expensesChart');
    this.loadChartLibrary().then(() => {
      this.renderChart();
    });
  }

  async loadChartLibrary() {
    if (typeof Chart === 'undefined') {
      await import('../../node_modules/chart.js/dist/chart.umd.js');
    }
  }

  renderChart() {
    new Chart(this.chartOne, {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1,
          spacing: 0
        }]
      },
      options: {
        radius: '100%',
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 2,
        layout: {
          padding: 0
        },
        plugins: {
          legend: {
            position: 'top'
          }
        }
        // scales: {
        //   y: {
        //     beginAtZero: true
        //   }
        // }
      }
    });

    new Chart(this.chartTwo, {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          // label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        radius: '100%',
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 2,
        layout: {
          padding: 0
        },
        plugins: {
          legend: {
            position: 'top'
          }
        }
        // scales: {
        //   y: {
        //     beginAtZero: true
        //   }
        // }
      }
    });
  }

}