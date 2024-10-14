const chartOne = document.getElementById('revenuesChart');
const chartTwo = document.getElementById('expensesChart');

new Chart(chartOne, {
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
    radius: '90%',
    responsive: true,
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

new Chart(chartTwo, {
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
    radius: '90%',
    responsive: true,
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