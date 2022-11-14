const labels = [
    'Series 1',
    'Series 2',
    'Series 3'
  ];

  const datac = {
    labels: labels,
    datasets: [{
      label: 'Angry',
      backgroundColor: 'rgba(230, 41, 41, 0.6)',
      borderColor: 'rgba(230, 41, 41, 0.6)',
      data: [40, 10, 5],
    },
    {
      label: 'Neutral',
      backgroundColor: 'rgba(41, 133, 230, 0.6)',
      borderColor: 'rgba(41, 133, 230, 0.6)',
      data: [10, 80, 35],
    },
    {
      label: 'Happy',
      backgroundColor: 'rgba(14, 198, 0, 0.6)',
      borderColor: 'rgba(14, 198, 0, 0.6)',
      data: [50, 10, 60],
    },
    ]
  };

  const config = {
    type: 'bar',
    data: datac,
    options: {
      indexAxis: 'y',
      // Elements options apply to all of the options unless overridden in a dataset
      // In this case, we are setting the border of each horizontal bar to be 2px wide
      elements: {
        bar: {
          borderWidth: 2,
        }
      },
      responsive: false,
      plugins: {
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          font: {
            size: 20,
            weight: 'bold',
            lineHeight: 1.2,
          },
          text: 'Team 1'
          
        }
      },
      scales: {
        x: {
          stacked: true,
          display: false
        },
        y: {
          stacked: true,
          display: false
        }
      },
      layout:{
          padding: 15
      }
    },
  };

  const myChart1 = new Chart(
    document.getElementById('myChart1'),
    config
  );
  const myChart2 = new Chart(
    document.getElementById('myChart2'),
    config
  );
  const myChart3 = new Chart(
    document.getElementById('myChart3'),
    config
  );
  const myChart4 = new Chart(
    document.getElementById('myChart4'),
    config
  );
  const myChart5 = new Chart(
    document.getElementById('myChart5'),
    config
  );
  const myChart6 = new Chart(
    document.getElementById('myChart6'),
    config
  );
  const myChart7 = new Chart(
    document.getElementById('myChart7'),
    config
  );
  const myChart8 = new Chart(
    document.getElementById('myChart8'),
    config
  );