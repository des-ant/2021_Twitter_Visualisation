let app_obama_csv = "/data/app_obama.csv";
let app_trump_csv = "/data/app_trump.csv";

let plotDiv = document.getElementById("plotDiv");
let plotDiv1 = document.getElementById("plotDiv1");

function makeplot(csv_file, divId, title) {
  Plotly.d3.csv(csv_file, (data) => { processData(data, divId, title) });
};

function processData(allRows, divId, title) {

  var x = [], y = [];
  for(let row of allRows){
    x.push(row['Start Date']);
    y.push(row['Approving']);
  };
  makePlotly(x, y, divId, title);
}

function makePlotly(x, y, divId, title) {
  var traces = [{
    x: x,
    y: y,
    hovertemplate:
    "%{x}, %{y}" +
    "<extra></extra>", //hide extra tooltip info
  }];

  let layout = { 
    title: title,
    yaxis: {
      range: [0, 100]
    }
  };

  let config = {responsive: true};

  Plotly.newPlot(divId, traces, layout, config);
};

// Draw plots
makeplot(app_obama_csv, plotDiv, 'Approval Ratings Obama');
makeplot(app_trump_csv, plotDiv1, 'Approval Ratings Trump');