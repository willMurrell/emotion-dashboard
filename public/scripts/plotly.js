

var trace1 = {
    x: [20, 14, 23],
    y: ['Series 3', 'Series 2', 'Series 1'],
    name: 'angry',
    orientation: 'h',
    marker: {
      color: 'rgba(230, 41, 41, 0.6)',
      width: 1
    },
    type: 'bar'
  };
  
  var trace2 = {
    x: [12, 18, 29],
    y: ['Series 3', 'Series 2', 'Series 1'],
    name: 'neutral',
    orientation: 'h',
    type: 'bar',
    marker: {
      color: 'rgba(41, 133, 230, 0.6)',
      width: 1
    }
  };

  var trace3 = {
    x: [68, 68, 48],
    y: ['Series 3', 'Series 2', 'Series 1'],
    name: 'happy',
    orientation: 'h',
    type: 'bar',
    marker: {
      color: 'rgba(14, 198, 0, 0.6)',
      width: 1
    }
  };
  
  var data = [trace1, trace2, trace3];
  
  var layout = {
    title: {
        text: 'Team 1',
        font:{
            size: 18
        },
        x: 0.45,
        y: 0.8
    } ,
    barmode: 'stack',
    width: 400,
    height: 300
  };
  
  Plotly.newPlot('team1', data, layout, {staticPlot: true});
  Plotly.newPlot('team2', data, layout, {staticPlot: true});
  Plotly.newPlot('team3', data, layout, {staticPlot: true});
  Plotly.newPlot('team4', data, layout, {staticPlot: true});
  Plotly.newPlot('team5', data, layout, {staticPlot: true});
  Plotly.newPlot('team6', data, layout, {staticPlot: true});
  