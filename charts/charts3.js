// Access CSV Tweet data locations
let trumpTweetsCsv = "../data/trump_presidential_tweets.csv";
let obamaTweetsCsv = "../data/obama_presidential_tweets.csv";

// Access plot divs
let plotTrumpTweetAmount = document.getElementById("plotTrumpTweetAmount");
let plotObamaTweetAmount = document.getElementById("plotObamaTweetAmount");

// Bar graph plot for total number of daily tweets by each president
function makeTweetAmount(plotDiv, csvLocation, plotTitle, plotColor) {
  // Read csv file and get tweet data
  Plotly.d3.csv(csvLocation, (tweets) => {

    // Get array of dates of tweets
    let dates = tweets.map(d => d.datetime.split(' ')[0]);

    // Object to store tweets made per date
    let dateAndCount = {};

    // Iterate through dates and count occurences (number of tweets made that day)
    for (let date of dates) {
      // Add date if doesn't exist
      if(!dateAndCount[date]) {
        dateAndCount[date] = 1;
      } else {
        // Increment count of date
        dateAndCount[date]++;
      }
    }

    // Get array of dates from dateAndCount object
    let dateArray = Object.keys(dateAndCount);
    // Get array of count from dateAndCount object
    let countArray =  Object.values(dateAndCount);

    // Count total number of tweets and days
    let totalTweets = countArray.reduce((a, b) => a + b, 0);
    let totalDays = dateArray.length;
    // Calculate averge number of tweets per day
    let dailyAvg = totalTweets / totalDays;
    // Round to 1 decimal place
    dailyAvg = Math.round(dailyAvg * 10) / 10;

    let data = [{
      x: dateArray,
      y: countArray,
      type: 'bar',
      marker: {
        color: plotColor
      },
    }];

    let layout = {
      title: `<span style="font-size: 24px;"><b>President ${plotTitle}'s Daily Tweet Amount</b></span>`,
      font: {
        family: 'Sans-serif'
      },
      xaxis: {
        // title: "Date"
      },
      yaxis: {
        title: "Number of Tweets"
      },
      margin: {
        t: 40,
        b: 40
      },
      height: 300,
      annotations: [
        {
          xref: 'paper',
          yref: 'paper',
          x: 0.05,
          y: 0.95,
          xanchor: 'left',
          yanchor: 'top',
          text: `Daily Average: <b>${dailyAvg}</b> Tweets`,
          font:{
            family: 'Sans-serif',
            size: 16,
            // color: 'rgb(37,37,37)'
          },
          showarrow: false
        }
      ]
    }

    // Responsive plot
    let config = {responsive: true};
    
    Plotly.newPlot(plotDiv, data, layout, config);

  });
}

makeTweetAmount(plotTrumpTweetAmount, trumpTweetsCsv, "Trump", "hsl(348, 86%, 43%)");
makeTweetAmount(plotObamaTweetAmount, obamaTweetsCsv, "Obama", "hsl(204, 71%, 39%)");
