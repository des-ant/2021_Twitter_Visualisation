let app_obama_csv = "/data/app_obama.csv";
let app_trump_csv = "/data/app_trump.csv";

let plotTweetsObama = document.getElementById("plotTweetsObama");
let plotTweetsTrump = document.getElementById("plotTweetsTrump");


// Make text fit hovertool
// from https://codereview.stackexchange.com/a/171857
function convertToParagraph(sentence, maxLineLength) {
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

// Sentiment plot
function make_sentiment(plotId, tweets, plotTitle) {
  let data = [{
    // Get x and y axis data points from tweet data
    // Map x axis to date
    // Map y axis to sentiment
    x: tweets.map(d => d.datetime),
    y: tweets.map(d => d.sentiment),
    customdata: tweets.map(d => convertToParagraph(d.author + ": " + d.text, 64)),
    marker: {
      size: 8,
      colorscale: [
        ['0.0', 'rgb(165,0,38)'],
        ['0.111111111111', 'rgb(215,48,39)'],
        ['0.222222222222', 'rgb(244,109,67)'],
        ['0.333333333333', 'rgb(253,174,97)'],
        ['0.444444444444', 'rgb(254,224,144)'],
        ['0.555555555556', 'rgb(224,243,248)'],
        ['0.666666666667', 'rgb(171,217,233)'],
        ['0.777777777778', 'rgb(116,173,209)'],
        ['0.888888888889', 'rgb(69,117,180)'],
        ['1.0', 'rgb(49,54,149)']
      ],
      // Color scale based on sentiment
      color: tweets.map(d => d.sentiment),
      line: {
        color: 'rgb(25, 25, 25)',
        width: 0.5
      }
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
      visible: true,
    },
    yaxis: {
      visible: true,
    },
    title: `<span style="font-size: 24px;"><b>${plotTitle}</b></span>`,
    font: {
      family: 'Sans-serif'
    },
    margin: {
      t: 35,
      b: 35
    },
    // Hide Axes Labels
    xaxis: {
      showgrid: true,
      zeroline: false,
      visible: true,
      title: "Date"
    },
    yaxis: {
      showgrid: false,
      zeroline: false,
      visible: false
    },
    annotations: [
      // Sentiment positive axes label
      {
        xref: 'paper',
        yref: 'paper',
        x: 0,
        y: 0.95,
        xanchor: 'right',
        yanchor: 'bottom',
        text: 'More<br><span style="color: rgb(49,54,149);"><b>Positive</span></b><br>Sentiment',
        showarrow: false,
        font: {
          size: 12,
          family: 'Sans-serif',
          color: 'rgb(75, 75, 75)'
        }
      },
      // Sentiment negative axes arrow
      {
        xref: 'paper',
        yref: 'paper',
        x: -0.05,
        y: 0.95,
        xanchor: 'right',
        yanchor: 'bottom',
        showarrow: true,
        arrowhead: 2,
        arrowwidth: 3,
        arrowcolor: 'rgb(75, 75, 75)',
        ax: 0,
        ay: 100,
      },
      {
        xref: 'paper',
        yref: 'paper',
        x: 0,
        y: 0.05,
        xanchor: 'right',
        yanchor: 'top',
        text: 'More<br><span style="color: rgb(165,0,38);"><b>Negative</span></b><br>Sentiment',
        showarrow: false,
        font: {
          size: 12,
          family: 'Sans-serif',
          color: 'rgb(75, 75, 75)'
        }
      },
      // Sentiment negative axes arrow
      {
        xref: 'paper',
        yref: 'paper',
        x: -0.05,
        y: 0.05,
        xanchor: 'right',
        yanchor: 'top',
        showarrow: true,
        arrowhead: 2,
        arrowwidth: 3,
        arrowcolor: 'rgb(75, 75, 75)',
        ax: 0,
        ay: -100,
      }
    ]
  };

  Plotly.newPlot(plotId, data, layout);

}

// Helper function to filter tweets by topic
function filter_tweets_topic(tweets, words) {
  // Only include tweets containing one of these strings inside a topic
  tweets = tweets.filter(tweet => words.some(word => tweet.text.includes(word)));

  return tweets;
}


function initialGraphs(words) {
  // Draw Obama graphs
  Plotly.d3.csv("../data/obama_presidential_tweets.csv", (tweets) => {
    if (words) {
      tweets = filter_tweets_topic(tweets, words);
    }

    // Iterate through each tweet and add author property
    for (let tweet of tweets) {
      tweet.author = "Obama";
    }
    // Make sentiment plot
    make_sentiment(plotSentObama, tweets, 'Obama Tweet Sentiment Over Time');
  });

  // Draw Trump graphs
  Plotly.d3.csv("../data/trump_presidential_tweets.csv", (tweets) => {
    if (words) {
      tweets = filter_tweets_topic(tweets, words);
    }

    // Iterate through each tweet and add author property
    for (let tweet of tweets) {
      tweet.author = "Trump";
    }
    // Make sentiment plot
    make_sentiment(plotSentTrump, tweets, 'Trump Tweet Sentiment Over Time');
  });
};

initialGraphs();

function getInputValue() {
  // Selecting the input element and get its value 
  let inputVal = document.getElementById("filter").value;

  let words = inputVal.split(",");

  // // Displaying the value
  // alert(words);

  // return words;
  initialGraphs(words);

  return false;
}

// function filterTopic(){
//   // Selecting the input element and get its value 
//   let inputVal = document.getElementById("filter").value;

//   let topics = {
//     guns: [" gun", "guns", "Gun ", "Guns ", "nra", "NRA"],
//     lgbt: ["LGBT", "lgbt", "gay", "Gay", "lesbian", "Lesbian", "marriage", "homosexual", "DOMA", "loveislove"],
//     china: ["China", "Russia"]
//   };

//   inputVal = topics[]

//   let words = topics[topic];

//   // // Displaying the value
//   // alert(words);

//   // return words;
//   initialGraphs(words);

//   return false;
// }