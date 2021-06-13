let covidPlot = document.getElementById("covidPlot");

function makeCovidPlot(plotDiv) {

  let yearArray = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019];
  let deathArray = [37000, 12000, 43000, 38000, 51000, 23000, 38000, 61000, 34000, 22000];

  let trace1 = {
    x: yearArray,
    y: deathArray,
    // Custom text on hover
    // text: deathArray.map(year => `${year} Flu Deaths`),
    text: 'Flu Deaths',
    type: 'bar',
    marker: {
      color: "hsl(204, 71%, 39%)"
    }
  };

  let layout = {
    title: `<span style="font-size: 24px;"><b>U.S. Seasonal Flu Deaths 2010 to 2019</b></span>`,
    font: {
      family: 'Sans-serif'
    },
    xaxis: {
      // title: "Year"
    },
    yaxis: {
      title: "Number of Deaths"
    },
    margin: {
      t: 40,
      b: 100
    },
    height: 400,
    annotations: [
      // COVID-19 Dec 2020 Text
      {
        xref: 'paper',
        yref: 'y',
        x: 0.05,
        y: 335789,
        xanchor: 'left',
        yanchor: 'bottom',
        showarrow: false,
        text: "<b>335,789 COVID-19 Deaths by 31 Dec 2020</b>",
        font: {
          color: 'hsl(348, 86%, 43%)',
          size: 14
        }
      },
      // COVID-19 2020 Text
      {
        xref: 'paper',
        yref: 'y',
        x: 0.05,
        y: 210000,
        xanchor: 'left',
        yanchor: 'bottom',
        showarrow: false,
        text: "<b>210,000 COVID-19 Deaths by 6 Oct 2020</b>",
        font: {
          color: 'hsl(348, 86%, 43%)',
          size: 14
        }
      },
      {
        xref: 'paper',
        yref: 'paper',
        x: 1.0,
        y: -0.3,
        xanchor: 'right',
        yanchor: 'top',
        text: 'Source: (Greenberg, 2020; World Health Organization, 2021)',
        showarrow: false,
        font: {
          family: 'Sans-serif',
          size: 12,
          color: 'rgb(150,150,150)'
        }
      },
    ],
    shapes: [
      // COVID-19 Dec 2020 Line
      {
        type: 'line',
        x0: 2010,
        y0: 335789,
        x1: 2019,
        y1: 335789,
        line: {
          color: 'hsl(348, 86%, 43%)',
          width: 3,
          dash: 'dot'
        }
      },
      // COVID-19 2020 Line
      {
        type: 'line',
        x0: 2010,
        y0: 210000,
        x1: 2019,
        y1: 210000,
        line: {
          color: 'hsl(348, 86%, 43%)',
          width: 3,
          dash: 'dot'
        }
      }
    ]
  };

  // Responsive plot
  let config = { responsive: true };

  let data = [trace1];

  Plotly.newPlot(plotDiv, data, layout, config);
}

makeCovidPlot(covidPlot);