let app_obama_csv = "/data/app_obama.csv";
let app_trump_csv = "/data/app_trump.csv";

// function make_plot_approval() {
//   Plotly.d3.csv(app_obama_csv, (app_obama) => {
//     processData(app_obama)
//   });
// };


// function processData(allRows) {

//   console.log(allRows);
//   var x = [], y = [], standard_deviation = [];

//   for (var i=0; i<allRows.length; i++) {
//     row = allRows[i];
//     x.push( row['Start Date'] );
//     y.push( row['Approving'] );
//   }
//   console.log( 'X',x, 'Y',y, 'SD',standard_deviation );
//   makePlotly( x, y, standard_deviation );
// }

// function makePlotly( x, y, standard_deviation ){
//   var plotDiv = document.getElementById("plotDiv");
//   var traces = [{
//     x: x,
//     y: y
//   }];

//   Plotly.newPlot(plotDiv, traces,
//     {title: 'Plotting CSV data from AJAX call'});
// };
// makeplot();


function makeplot() {
  Plotly.d3.csv(app_obama_csv, (data) => { processData(data) });

};

function processData(allRows) {

  console.log(allRows);
  var x = [], y = [], standard_deviation = [];

  for (var i = 0; i < allRows.length; i++) {
    row = allRows[i];
    x.push(row['End Date']);
    y.push(row['Approving']);
  }
  console.log('X', x, 'Y', y, 'SD', standard_deviation);
  makePlotly(x, y, standard_deviation);
}

function makePlotly(x, y, standard_deviation) {
  var plotDiv = document.getElementById("plotDiv");
  var traces = [{
    x: x,
    y: y
  }];

  let layout = { 
    title: 'Approval Ratings Obama',
    yaxis: {
      range: [0, 100]
    }
  };

  let config = {responsive: true};

  Plotly.newPlot(plotDiv, traces, layout, config);
};
makeplot();