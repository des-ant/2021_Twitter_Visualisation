// Access plot divs
let plotTweetsObama = document.getElementById("plotTweetsObama");
let plotTweetsTrump = document.getElementById("plotTweetsTrump");

// Access CSV Tweet data locations
let obamaTweetsCsv = "../data/obama_presidential_tweets.csv";
let trumpTweetsCsv = "../data/trump_presidential_tweets.csv";

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
function make_sentiment(plotId, tweets, plotTitle, tweetCount, avgSent) {
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
      b: 35,
      r: 100
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
      // Sentiment positive axes arrow
      {
        xref: 'paper',
        yref: 'paper',
        x: -0.0325,
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
      // Sentiment negative axes label
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
        x: -0.0325,
        y: 0.05,
        xanchor: 'right',
        yanchor: 'top',
        showarrow: true,
        arrowhead: 2,
        arrowwidth: 3,
        arrowcolor: 'rgb(75, 75, 75)',
        ax: 0,
        ay: -100,
      },
      // Tweet Count Words
      {
        xref: 'paper',
        yref: 'paper',
        x: 0.95,
        y: 1,
        xanchor: 'left',
        yanchor: 'top',
        text: `Number of tweets:`,
        showarrow: false,
        font: {
          size: 14,
          family: 'Sans-serif',
          color: 'rgb(75, 75, 75)'
        }
      },
      // Tweet Count Number
      {
        xref: 'paper',
        yref: 'paper',
        x: 0.975,
        y: 0.95,
        xanchor: 'left',
        yanchor: 'top',
        text: `<b>${tweetCount}</b>`,
        showarrow: false,
        font: {
          size: 24,
          family: 'Sans-serif',
          color: 'rgb(75, 75, 75)'
        }
      },
      // Average sentiment
      {
        xref: 'paper',
        yref: 'y',
        x: 1,
        y: avgSent,
        xanchor: 'left',
        yanchor: 'bottom',
        showarrow: true,
        arrowhead: 0,
        arrowwidth: 1,
        arrowcolor: 'rgb(75, 75, 75)',
        ax: -850,
        ay: 0,
        text: "<b>Average Sentiment</b>",
        opacity: 0.75
      },
      // Neutral sentiment baseline
      {
        xref: 'paper',
        yref: 'paper',
        x: 1,
        y: 0.5,
        xanchor: 'left',
        yanchor: 'bottom',
        showarrow: true,
        arrowhead: 0,
        arrowwidth: 1,
        arrowcolor: 'rgb(75, 75, 75)',
        ax: -850,
        ay: 0,
        text: "<b>Neutral</b>",
        opacity: 0.5
      }
    ]
  };

  Plotly.newPlot(plotId, data, layout);

}

// Helper function to filter tweets by topic
function filter_tweets_topic(tweets, words, isCaseSensitive) {

  // Perform case sensitive filter
  if (isCaseSensitive) {
    // Only include tweets containing one of these strings inside a topic
    tweets = tweets.filter(tweet => words.some(word => tweet.text.includes(word)));
  } else {
    // Perform case insensitive filter
    tweets = tweets.filter(tweet => words.some(word => tweet.text.toLowerCase().includes(word.toLowerCase())));
  }

  return tweets;
}

// Helper function to filter tweets, set up graphs
function graphHelper(csvLocation, author, plotDiv, words, isCaseSensitive) {
  // Read csv file and extract and filter tweets
  Plotly.d3.csv(csvLocation, (tweets) => {
    if (words) {
      tweets = filter_tweets_topic(tweets, words, isCaseSensitive);
    }

    // Count number of tweets
    let tweetCount = 0;
    // Count total sentiment
    let totalSent = 0;

    // Iterate through each tweet and add author property
    for (let tweet of tweets) {
      tweet.author = author;
      tweetCount++;
      totalSent += parseFloat(tweet.sentiment);
    }

    // Calculate average sentiment
    let avgSent = totalSent / tweetCount;

    // Set title of plot
    let plotTitle = `${author}'s Tweet Sentiment During Presidency`

    // Make sentiment plot
    make_sentiment(plotDiv, tweets, plotTitle, tweetCount, avgSent);
  });
}

// Draw sentiment graphs
function initialGraphs(words, isCaseSensitive) {
  // Draw Obama graphs
  graphHelper(obamaTweetsCsv, "Obama", plotSentObama, words, isCaseSensitive);

  // Draw Trump graphs
  graphHelper(trumpTweetsCsv, "Trump", plotSentTrump, words, isCaseSensitive);
};

initialGraphs();

function getInputValue() {
  // Selecting the input element and get its value 
  let inputVal = document.getElementById("filter").value;

  // Separate words by comma
  let words = inputVal.split(",");

  // return words;
  initialGraphs(words, isCaseSensitive());

  return false;
}

// Function to filter tweets by topic
function filterTopic() {
  // Selecting the input element and get its value 
  let topic = document.getElementById("topic").value;

  // Do nothing if no topic is selcted
  if (!topic) {
    return false;
  }

  // Preset key words and topics
  let topics = {
    guns: [" gun", "guns", "Gun ", "Guns ", "nra", "NRA"],
    lgbt: ["LGBT", "lgbt", "gay", "Gay", "lesbian", "Lesbian", "marriage", "homosexual", "DOMA", "loveislove"],
    hillary: ["Crooked Hillary", "Hillary"],
    kim: ["Little Rocket Man", "Kim", "Jong", "Un", "Jong-un"],
    elizabeth: ["Elizabeth", "Elizabeth Warren", "Pocahontas"],
    nyt: ["NYT", "New York Times", "Times", "Failing", "Failing and Corrupt"],
    angry: ["Angry Democrats"],
    maxine: ["Crazy Maxine", "Maxine", "Waters"],
    joe: ["Joe", "Biden"],
    covid: ["China Virus", "Virus", "virus", "plague", "Plague", "W.H.O.", "CoronaVirus", "Coronavirus", "Flu ", "Flu."]
  };

  // Access key words by topic
  let words = topics[topic];

  // Perform case sensitive search
  initialGraphs(words, true);

  // Must return false so page is not refreshed on button click
  return false;
}

// Clear form values in Tweet Sentiment Graph
function resetFilter() {

  // Reset form values to default
  document.getElementById("formTweetsFilter").reset();

  // Reset Graph
  initialGraphs();

  // Must return false so page is not refreshed on button click
  return false;
}

// Check if search is case-sensitive
function isCaseSensitive() {
  return document.getElementById("caseSensitive").checked;
}