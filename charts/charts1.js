let plotElection2008 = document.getElementById("plotElection2008");
let plotElectionNews = document.getElementById("plotElectionNews");

function drawElection(plotDiv) {

  var obama = {
    x: [365],
    y: ['totalvotes'],
    name: 'Obama',
    orientation: 'h',
    marker: {
      color: 'hsl(204, 71%, 39%)',
      width: 1,
    },
    width: 0.1,
    type: 'bar'
  };
  
  var mccain = {
    x: [173],
    y: ['totalvotes'],
    name: 'McCain',
    orientation: 'h',
    type: 'bar',
    marker: {
      color: 'hsl(348, 86%, 43%)',
      width: 1
    },
    width: 0.1
  };
  
  var data = [obama, mccain];
  
  var layout = {
    title: '<b>2008 US Presidential Election Results</b>',
    barmode: 'stack',
    font: {
      size: 16,
      family: 'Sans-serif'
    },
    annotations: [
      {
        x: 270,
        y: 0.165,
        xref: 'x',
        yref: 'y',
        text: '270 electoral votes<br>needed to win',
        showarrow: true,
        arrowhead: 0,
        ax: 0,
        ay: 50,
        font: {
          size: 14,
          family: 'Sans-serif'
        }
      },
      {
        x: 38,
        y: 0.3,
        xref: 'x',
        yref: 'y',
        text: '<b>365</b>',
        showarrow: false,
        arrowhead: 0,
        ax: 0,
        ay: 0,
        font: {
          size: 48,
          color: 'hsl(204, 71%, 39%)',
          family: 'Sans-serif'
        }
      },
      {
        x: 115,
        y: 0.4,
        xref: 'x',
        yref: 'y',
        text: '<b>Obama</b>',
        showarrow: false,
        arrowhead: 0,
        ax: 0,
        ay: 0,
        font: {
          size: 18,
          color: 'hsl(204, 71%, 39%)',
          family: 'Sans-serif'
        }
      },
      {
        x: 138,
        y: 0.2,
        xref: 'x',
        yref: 'y',
        text: 'Electoral Votes',
        showarrow: false,
        arrowhead: 0,
        ax: 0,
        ay: 0,
        font: {
          size: 16,
          family: 'Sans-serif'
        }
      },
      {
        x: 76,
        y: -0.2,
        xref: 'x',
        yref: 'y',
        text: 'Popular vote: 66,862,039',
        showarrow: false,
        arrowhead: 0,
        ax: 0,
        ay: 0,
        font: {
          size: 14,
          family: 'Sans-serif'
        }
      },
      {
        x: 400,
        y: 0.3,
        xref: 'x',
        yref: 'y',
        text: '<b>173</b>',
        showarrow: false,
        arrowhead: 0,
        ax: 0,
        ay: 0,
        font: {
          size: 48,
          color: 'hsl(348, 86%, 43%)',
          family: 'Sans-serif'
        }
      },
      {
        x: 477,
        y: 0.4,
        xref: 'x',
        yref: 'y',
        text: '<b>McCain</b>',
        showarrow: false,
        arrowhead: 0,
        ax: 0,
        ay: 0,
        font: {
          size: 18,
          color: 'hsl(348, 86%, 43%)',
          family: 'Sans-serif'
        }
      },
      {
        x: 497.75,
        y: 0.2,
        xref: 'x',
        yref: 'y',
        text: 'Electoral Votes',
        showarrow: false,
        arrowhead: 0,
        ax: 0,
        ay: 0,
        font: {
          size: 16,
          family: 'Sans-serif'
        }
      },
      {
        x: 462,
        y: -0.2,
        xref: 'x',
        yref: 'y',
        text: 'Popular vote: 58,319,442',
        showarrow: false,
        arrowhead: 0,
        ax: 0,
        ay: 0,
        font: {
          size: 14,
          family: 'Sans-serif'
        }
      },
      {
        x: 270,
        y: -0.75,
        xref: 'x',
        yref: 'y',
        text: 'Source: (Lutz, 2009)',
        showarrow: false,
        font: {
          family: 'Sans-serif',
          size: 12,
          color: 'rgb(150,150,150)'
        }
      }
    ],
    showlegend: false,
    xaxis: {
      showgrid: false,
      zeroline: false,
      visible: false
    },
    yaxis: {
      showgrid: false,
      zeroline: false,
      visible: false
    },
    height: 325,
    width: 750,
    xanchor: 'center'
  };
  
  Plotly.newPlot(plotDiv, data, layout);
  
}

drawElection(plotElection2008);

// Code based on https://plotly.com/javascript/line-charts/
function drawNews(plotDiv) {

  var xData = [
    [1996, 2000, 2002, 2004, 2006, 2008],
    [1996, 2000, 2002, 2004, 2006, 2008],
    [1996, 2000, 2002, 2004, 2006, 2008],
    [1996, 2000, 2002, 2004, 2006, 2008],
    [1996, 2000, 2002, 2004, 2006, 2008]
  ];
  
  var yData = [
    [72, 70, 66, 78, 69, 77],
    [60, 39, 33, 39, 34, 28],
    [3, 11, 7, 18, 15, 26],
    [19, 15, 13, 17, 17, 13],
    [11, 4, 1, 3, 2, 2]
  ];
  
  var colors = ['rgba(67,67,67,1)', 'rgba(115,115,115,1)', 'rgba(49,130,189, 1)',
    'rgba(189,189,189,1)', 'rgba(189,189,189,1)'
  ];
  
  var lineSize = [2, 2, 4, 2, 2];
  
  var labels = ['Television', 'Newspaper', 'Internet', 'Radio', 'Magazines'];
  
  var data = [];
  
  for ( var i = 0 ; i < xData.length ; i++ ) {
    var result = {
      x: xData[i],
      y: yData[i],
      type: 'scatter',
      mode: 'lines',
      line: {
        color: colors[i],
        width: lineSize[i]
      }
    };
    var result2 = {
      x: [xData[i][0], xData[i][5]],
      y: [yData[i][0], yData[i][5]],
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: colors[i],
        size: 12
      }
    };
    data.push(result, result2);
  }
  
  var layout = {
    showlegend: false,
    height: 600,
    width: 600,
    xaxis: {
      showline: true,
      showgrid: false,
      showticklabels: true,
      linecolor: 'rgb(204,204,204)',
      linewidth: 2,
      autotick: false,
      ticks: 'outside',
      tickcolor: 'rgb(204,204,204)',
      tickwidth: 2,
      ticklen: 5,
      tickfont: {
        family: 'Sans-serif',
        size: 12,
        color: 'rgb(82, 82, 82)'
      }
    },
    yaxis: {
      showgrid: false,
      zeroline: false,
      showline: false,
      showticklabels: false
    },
    autosize: false,
    margin: {
      autoexpand: false,
      l: 100,
      r: 20,
      t: 100
    },
    annotations: [
      {
        xref: 'paper',
        yref: 'paper',
        y: 1.10,
        xanchor: 'center',
        yanchor: 'bottom',
        text: '<b>Major Sources of Election News</b>',
        font:{
          family: 'Sans-serif',
          size: 28,
          color: 'rgb(37,37,37)'
        },
        showarrow: false
      },
      {
        xref: 'paper',
        yref: 'paper',
        y: 1,
        xanchor: 'center',
        yanchor: 'bottom',
        text: 'Where Americans get most of their news about politics and the election<br>(among all adults, up to two mentions allowed)',
        font:{
          family: 'Sans-serif',
          size: 14,
        },
        showarrow: false
      },
      {
        xref: 'paper',
        yref: 'paper',
        x: 0.5,
        y: -0.1,
        xanchor: 'center',
        yanchor: 'top',
        text: 'Source: (Smith, 2009)',
        showarrow: false,
        font: {
          family: 'Sans-serif',
          size: 12,
          color: 'rgb(150,150,150)'
        }
      },
    ],
    xanchor: 'center'
  };
  
  for( var i = 0 ; i < xData.length ; i++ ) {
    var result = {
      xref: 'paper',
      x: 0.05,
      y: yData[i][0],
      xanchor: 'right',
      yanchor: 'middle',
      text: labels[i] + ' ' + yData[i][0] +'%',
      showarrow: false,
      font: {
        family: 'Sans-serif',
        size: 16,
        color: 'black'
      }
    };
    var result2 = {
      xref: 'paper',
      x: 0.95,
      y: yData[i][5],
      xanchor: 'left',
      yanchor: 'middle',
      text: yData[i][5] +'%',
      font: {
        family: 'Sans-serif',
        size: 16,
        color: 'black'
      },
      showarrow: false
    };
  
    layout.annotations.push(result, result2);
  }
  
  Plotly.newPlot(plotDiv, data, layout);

}

drawNews(plotElectionNews);