const url = 'http://127.0.0.1:5000/api/v1.0/accident'; // data URL

function createLineChart(xData, yData, yDataNonFatal, yDataFatal) {
  Highcharts.chart('LineChart', {
    chart: {
      type: 'line',
      backgroundColor: 'rgba(240, 240, 240, 0.6)'
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: xData,
      title: {
        text: 'Year',
        style: {
          fontSize: '14px'
        }
      },
      labels: {
        style: {
          fontSize: '12px'
        }
      }
    },
    yAxis: {
      title: {
        text: 'Number of Accidents',
        style: {
          fontSize: '14px'
        }
      },
      labels: {
        style: {
          fontSize: '14px'
        }
      },
      min: 0, 
      max: 16000
    },
    legend: {
      itemStyle: {
        fontSize: '14px'
      },
      align: 'center', 
      verticalAlign: 'top',
    },
    tooltip: {
      style: {
        fontSize: '14px' 
      }
    },
    series: [
      {
        name: 'All Accidents',
        data: yData,
        color: 'coral'
      },
      {
        name: 'Non-Fatal Accidents',
        data: yDataNonFatal,
        color:'steelblue'
      },
      {
        name: 'Fatal Accidents',
        data: yDataFatal,
        color:'deepskyblue'
      }
    ],
    accessibility: {
      enabled: false, // Disable accessibility features to remove warning message
    }
  });
}
function LineChart() {
  // Fetch JSON data from the specified URL
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log('Data fetched successfully:', data); // Log the fetched data

      // Extract xData by mapping the 'date' property from each item in the data
      let xData = data.map(item => {
        if (item['date']) {
          let parts = item['date'].split('/');
          // Check if the date format is valid
          if (parts.length === 3) {
            // Extract the year part (parts[2]) and convert it to a number
            return parseInt(parts[2], 10);
          }
        }
        return null; // Return null for invalid or missing dates
      });

      // Filter out null values (invalid or missing dates)
      xData = xData.filter(date => date !== null);

      // Create an array to store unique years
      let uniqueYears = Array.from(new Set(xData));

      // Sort the years in ascending order
      uniqueYears.sort((a, b) => a - b);

      // Count the number of all accidents for each unique year
      let allAccidentsData = uniqueYears.map(year =>
        xData.filter(x => x === year).length
      );

      // Count the number of non-fatal accidents for each unique year
      let nonFatalAccidentsData = uniqueYears.map(year =>
        data.filter(item => item['no_persons_killed'] === 0 && parseInt(item['date'].split('/')[2], 10) === year).length
      );

      // Count the number of fatal accidents for each unique year
      let fatalAccidentsData = uniqueYears.map(year =>
        data.filter(item => item['no_persons_killed'] !== 0 && parseInt(item['date'].split('/')[2], 10) === year).length
      );

      // Create the line chart with sorted data
      createLineChart(uniqueYears, allAccidentsData, nonFatalAccidentsData, fatalAccidentsData);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Plots default chart for when the page is visited
function init() {
  LineChart(); // Call the LineChart function
}

init();