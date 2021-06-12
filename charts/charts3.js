let trumpTweetsCsv = "../data/trump_presidential_tweets.csv";
let plotTrumpTweetAmount = document.getElementById("plotTrumpTweetAmount");


function makeTweetAmount(plotDiv, csvLocation) {
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

    let data = [{
      // Get array of dates from dateAndCount object
      x: Object.keys(dateAndCount),
      // Get array of count from dateAndCount object
      y: Object.values(dateAndCount),
      type: 'bar',
      marker: {
        color: 'hsl(348, 86%, 43%)'
      },
    }];
    
    Plotly.newPlot(plotDiv, data);

  });
}

makeTweetAmount(plotTrumpTweetAmount, trumpTweetsCsv);