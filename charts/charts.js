let app_obama_csv = "/data/app_obama.csv";
let app_trump_csv = "/data/app_trump.csv";

let plotAppObama = document.getElementById("plotAppObama");
let plotAppTrump = document.getElementById("plotAppTrump");

let plotTweetsObama = document.getElementById("plotTweetsObama");
let plotTweetsTrump = document.getElementById("plotTweetsTrump");

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
makeplot(app_obama_csv, plotAppObama, 'Approval Ratings of Obama');
makeplot(app_trump_csv, plotAppTrump, 'Approval Ratings of Trump');

/* ---------------
*/

// Make text fit hovertool
// from https://codereview.stackexchange.com/a/171857
function convertToParagraph(sentence, maxLineLength){
  let lineLength = 0;
  sentence = sentence.split(" ")
  return sentence.reduce((result, word) => {
    if (lineLength + word.length >= maxLineLength) {
      lineLength = word.length;
      return result + `<br>${word}`;
    } else {
      lineLength += word.length + (result ? 1 : 0);
      return result ? result + ` ${word}` : `${word}`;
    }
  }, '');
};

// function make_plot(plotId, tweet_data, tsne_data) {
//   let data = [{
//     x: tsne_data.map(d => d.x),
//     y: tsne_data.map(d => d.y),
//     mode: 'markers',
//     type: 'scatter',
//     // Make text fit hovertool
//     customdata: tweet_data.map(d => convertToParagraph(d.author + ": " + d.text, 64)),
//     hovertemplate:
//       "%{customdata}" +
//       "<extra></extra>",
//     marker: {
//       size: 4,
//       colorscale: 'Jet',
//       color: tsne_data.map(d => d.cluster_id),
//     }
//   }];

//   let layout = {
//     hovermode: "closest",
//     xaxis: {
//       visible: false,
//     },
//     yaxis: {
//       visible: false,
//     }
//   }

//   Plotly.newPlot(plotId, data, layout);
// }

function make_plot(plotId, tweets, year){
  let data = [{
    x: tweets.map(d => d.x),
    y: tweets.map(d => d.y),
    customdata: tweets.map(d => convertToParagraph(d.author + ": " + d.text, 64)),
    marker: {
      // color: tweets.map(d => d.author=="Trump"?0:1), //color 0 if trump, 1 if obama
      size: 8,
      colorscale: 'Jet',
      color: tweets.map(d => d.cluster_id),
      // colorscale: [ //custom color scheme
      //   ['0.0', 'rgb(255,0,0)'], 
      //   ['1.0', 'rgb(0,0,255)'],
      // ]
    },
    mode: 'markers',
    type: 'scatter',
    hovertemplate:
      "%{customdata}" +
      "<extra></extra>", //hide extra tooltip info
  }];

  let layout = {
    hovermode: "closest", //hover closest by default
    xaxis: {
      visible: false,
    },
    yaxis: {
      visible: false,
    },
    title: year
  };

  Plotly.newPlot(plotId, data, layout);
};

// Helper function to filter tweets by date
function filter_tweets(tweet_data, tsne_data, dateObj) {
  //add tsne data to trump and obama tweets
  //   trump_tweets = trump_tweets.map((trump_tweet, index) => Object.assign(trump_tweet, tsne_data_trump[index]))
  let tweets = tweet_data.map((tweet_data, index) => Object.assign(tweet_data, tsne_data[index]));

  // tweets = tweets.filter(tweet => new Date(tweet.datetime) < new Date(2014, 0, 0))
  //tweets = tweets.filter(tweet => new Date(tweet.datetime) > new Date(2015, 6,
  //3) && new Date(tweet.datetime) < new Date(2015, 6, 5))

  // Filter tweet by date
  tweets = tweets.filter(tweet => new Date(tweet.datetime).getFullYear() === dateObj.getFullYear());

  return tweets;
}

// Returns Date object from input values
function handler(e){
  // let dateInput = e.target.value;
  let yearInput = e.target.value;
  let dateObj = new Date(yearInput, 1, 1);

  // Draw graphs
  Plotly.d3.csv("../data/obama_presidential_tweets.csv", (tweets) => {
    Plotly.d3.csv("../data/tsne_and_cluster/tsne_data_obama.csv", (tsne_data) => {
      filtered_tweets = filter_tweets(tweets, tsne_data, dateObj);
      // Add an author property
      for(let tweet of filtered_tweets){
        tweet.author = "Obama";
      }
      make_plot(plotTweetsObama, filtered_tweets, yearInput);
      // make_plot(plotTweetsObama, filtered_tweets, tsne_data);
    });
  });
  
  // Plotly.d3.csv("../data/trump_presidential_tweets.csv", (tweets) => {
  //   filtered_tweets = filter_tweets(tweets, dateObj)
  //   // Add an author property
  //   for(let tweet of filtered_tweets){
  //     tweet.author = "Trump"
  //   }
  //   Plotly.d3.csv("../data/tsne_and_cluster/tsne_data_trump.csv", (tnse_data) => {
  //     make_plot(plotTweetsTrump, tweets, tnse_data)
  //   });
  // });


  return dateObj;
}

// Plotly.d3.csv("../data/obama_presidential_tweets.csv", (tweets) => {
//   //add an author property
//   for(let tweet of tweets){
//     tweet.author = "Obama"
//   }
//   Plotly.d3.csv("../data/tsne_and_cluster/tsne_data_obama.csv", (tnse_data) => {
//     make_plot('plotTweetsObama', tweets, tnse_data)
//   });
// });

// Plotly.d3.csv("../data/trump_presidential_tweets.csv", (tweets) => {
//   //add an author property
//   for(let tweet of tweets){
//     tweet.author = "Trump"
//   }
//   Plotly.d3.csv("../data/tsne_and_cluster/tsne_data_trump.csv", (tnse_data) => {
//     make_plot('plotTweetsTrump', tweets, tnse_data)
//   });
// });


// -------------------

// function combine_and_filter(trump_tweets, obama_tweets, tsne_data_trump, tsne_data_obama, dateObj) {
//   //add tsne data to trump and obama tweets
//   trump_tweets = trump_tweets.map((trump_tweet, index) => Object.assign(trump_tweet, tsne_data_trump[index]))
//   obama_tweets = obama_tweets.map((obama_tweet, index) => Object.assign(obama_tweet, tsne_data_obama[index]))

//   //add an author property
//   for(let tweet of trump_tweets){
//     tweet.author = "Trump"
//   }
//   for(let tweet of obama_tweets){
//     tweet.author = "Obama"
//   }
  
//   //combine all tweets into one array
//   let tweets = [...trump_tweets, ...obama_tweets];
  

//   //only include tweets containing one of these strings
//   //Try experimenting with different search tags
//   // tweets = tweets.filter(tweet => ["climate", "energy", "green", "solar"].some(topic => tweet.text.includes(topic)));

//   //Try out some of these other filters!
//   //tweets = tweets.filter(tweet => tweet.text.includes("thank"))
//   // tweets = tweets.filter(tweet => tweet.sentiment > 0.5) //positive tweets
//   // tweets = tweets.filter(tweet => tweet.sentiment < 0) //negative tweets
//   // tweets = tweets.filter(tweet => new Date(tweet.datetime) < new Date(2014, 0, 0))
//   //tweets = tweets.filter(tweet => new Date(tweet.datetime) > new Date(2015, 6,
//   //3) && new Date(tweet.datetime) < new Date(2015, 6, 5))
//   tweets = tweets.filter(tweet => new Date(tweet.datetime).getFullYear() === dateObj.getFullYear());

//   return tweets;
// }

// function make_plot(tweets, year){
//   let data = [{
//     x: tweets.map(d => d.x),
//     y: tweets.map(d => d.y),
//     customdata: tweets.map(d => convertToParagraph(d.author + ": " + d.text, 64)),
//     marker: {
//       color: tweets.map(d => d.author=="Trump"?0:1), //color 0 if trump, 1 if obama
//       size: 8,
//       colorscale: [ //custom color scheme
//         ['0.0', 'rgb(255,0,0)'], 
//         ['1.0', 'rgb(0,0,255)'],
//       ]
//     },
//     mode: 'markers',
//     type: 'scatter',
//     hovertemplate:
//       "%{customdata}" +
//       "<extra></extra>", //hide extra tooltip info
//   }];

//   let layout = {
//     hovermode: "closest", //hover closest by default
//     xaxis: {
//       visible: false,
//     },
//     yaxis: {
//       visible: false,
//     },
//     title: year
//   }

//   Plotly.newPlot('plotDiv', data, layout);
// }

// //from https://codereview.stackexchange.com/a/171857
// function convertToParagraph(sentence, maxLineLength){
//   let lineLength = 0;
//   sentence = sentence.split(" ")
//   return sentence.reduce((result, word) => {
//     if (lineLength + word.length >= maxLineLength) {
//       lineLength = word.length;
//       return result + `<br>${word}`;
//     } else {
//       lineLength += word.length + (result ? 1 : 0);
//       return result ? result + ` ${word}` : `${word}`;
//     }
//   }, '');
// }

// // Returns Date object from input values
// function handler(e){
//   // let dateInput = e.target.value;
//   let yearInput = e.target.value;
//   let dateObj = new Date(yearInput, 1, 1);
//   // console.log(dateObj);
//   Plotly.d3.csv("../data/trump_presidential_tweets.csv", (trump_tweets) => {
//     Plotly.d3.csv("../data/obama_presidential_tweets.csv", (obama_tweets) => {
//       Plotly.d3.csv("../data/tsne_and_cluster/tsne_data_trump.csv", (tsne_data_trump) => {
//         Plotly.d3.csv("../data/tsne_and_cluster/tsne_data_obama.csv", (tsne_data_obama) => {
//           let tweets = combine_and_filter(trump_tweets, obama_tweets, tsne_data_trump, tsne_data_obama, dateObj);
//           make_plot(tweets, yearInput);
//         });
//       });
//     });
//   });
//   return dateObj;
// }

// function loadPlot(){
//   let yearInput = document.getElementById("myRange").value;
//   let dateObj = new Date(yearInput, 1, 1);
//   Plotly.d3.csv("../data/trump_presidential_tweets.csv", (trump_tweets) => {
//     Plotly.d3.csv("../data/obama_presidential_tweets.csv", (obama_tweets) => {
//       Plotly.d3.csv("../data/tsne_and_cluster/tsne_data_trump.csv", (tsne_data_trump) => {
//         Plotly.d3.csv("../data/tsne_and_cluster/tsne_data_obama.csv", (tsne_data_obama) => {
//           let tweets = combine_and_filter(trump_tweets, obama_tweets, tsne_data_trump, tsne_data_obama, dateObj);
//           make_plot(tweets, yearInput);
//         });
//       });
//     });
//   });
//   return dateObj;
// }

// loadPlot();