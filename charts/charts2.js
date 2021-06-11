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


// Tsne plot
function make_plot(plotId, tweets, plotTitle) {
  let data = [{
    x: tweets.map(d => d.x),
    y: tweets.map(d => d.y),
    customdata: tweets.map(d => convertToParagraph(d.author + ": " + d.text, 64)),
    marker: {
      size: 8,
      colorscale: 'Jet',
      color: tweets.map(d => d.cluster_id)
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
    title: plotTitle
  };

  Plotly.newPlot(plotId, data, layout);

};

// Helper function to filter tweets by topic
function filter_tweets_topic(tweets, words) {

  // let topics = {
  //   guns: [" gun", "guns", "Gun ", "Guns ", "nra", "NRA"],
  //   lgbt: ["LGBT", "lgbt", "gay", "Gay", "lesbian", "Lesbian", "marriage", "homosexual", "DOMA", "loveislove"],
  //   china: ["China", "Russia"]
  // };

  // Only include tweets containing one of these strings inside a topic
  tweets = tweets.filter(tweet => words.some(word => tweet.text.includes(word)));


  return tweets;
}


function initialGraphs() {
  // Draw Obama graphs
  Plotly.d3.csv("../data/obama_presidential_tweets.csv", (tweets) => {
    Plotly.d3.csv("../data/tsne_and_cluster/tsne_data_obama.csv", (tsne_data) => {
      tweets = tweets.map((tweets, index) => Object.assign(tweets, tsne_data[index]));
      
      let filtered_tweets = filter_tweets_topic(tweets, ["China", "Russia"]);

      // Iterate through each tweet and add author property
      for (let tweet of filtered_tweets) {
        tweet.author = "Obama";
      }
      make_plot(plotTweetsObama, filtered_tweets, 'Obama Tweets');
    });
  });

  // Draw Trump graphs
  Plotly.d3.csv("../data/trump_presidential_tweets.csv", (tweets) => {
    Plotly.d3.csv("../data/tsne_and_cluster/tsne_data_trump.csv", (tsne_data) => {
      tweets = tweets.map((tweets, index) => Object.assign(tweets, tsne_data[index]));
      
      let filtered_tweets = filter_tweets_topic(tweets, ["China", "Russia"]);

      // Iterate through each tweet and add author property
      for (let tweet of filtered_tweets) {
        tweet.author = "Trump";
      }
      make_plot(plotTweetsTrump, filtered_tweets, 'Trump Tweets');
    });
  });

};

initialGraphs();