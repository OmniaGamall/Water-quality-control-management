/////////////////////////// CHARTS//////////////////////////////////////////////

const chart1 = document.getElementById('myChart1').getContext('2d');
const chart2 = document.getElementById('myChart2').getContext('2d');          // all charts
const chart3 = document.getElementById('myChart3').getContext('2d'); 




const gradient1 = chart1.createLinearGradient(0, 0, 0, 400);
gradient1.addColorStop(0, '#2D55B4');
gradient1.addColorStop(1, '#CAD7FF');                             //////////////// colors in chart1 ,chart2, chart3///////////////////////

const gradient2 = chart2.createLinearGradient(0, 0, 0, 400);
gradient2.addColorStop(0,  '#533A71 ' );
gradient2.addColorStop(1, '#DAC3F6');

const gradient3 = chart3.createLinearGradient(0, 0, 0, 400);
gradient3.addColorStop(0,  '#533A71 ' );
gradient3.addColorStop(1, '#2D55B4');


const data = {
  labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  datasets: [{
      label: 'Weekly Insights',
      data: [50, 30, 20, 70, 10, 60, 40,80,90,100],                            // the data in chart1 , chart2
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      borderRadius: 20
  },

]


};

new Chart(chart1, {
  type: 'bar',
  data: {
    ...data,
    datasets: [{
        ...data.datasets[0],
        backgroundColor: gradient1
    }]
},                                                 // chart 1
  options: {
    responsive: true,
    maintainAspectRatio: false,
    maxBarThickness: 30,
      scales: {
          y: {
              beginAtZero: true,
              ticks: {
                  callback: function(value) {
                      return value + '%';
                  }
              }
          }
      }
  }
});

new Chart(chart2, {
  type: 'bar',
  data: {
    ...data,
    datasets: [{
        ...data.datasets[0],
        backgroundColor: gradient2
    }]
},
  options: {
    responsive: true,                                //chart 2 
    maintainAspectRatio: false,
    maxBarThickness: 30,
      scales: {
          y: {
              beginAtZero: true,
              ticks: {
                  callback: function(value) {
                      return value + '%';
                  }
              }
          }
      }
  }
});



const data2 = {
  labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  datasets: [{
      label: 'Weekly Insights',
      data: [1, 2.5, 3, 4, 1.5, 3.5,2.5], // data   for chart3         
      backgroundColor: gradient3,
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      borderRadius: 20
     
  }]
};

 
   new Chart(chart3, {
    type: 'line',
    data: data2 ,
      options: {
        responsive: true,                                //chart 3
        maintainAspectRatio: false,
        maxBarThickness: 30,
          scales: {
              y: {
                  beginAtZero: true,
                  ticks: {
                      callback: function(value) {
                          return value + 'k';
                      }
                  }
              }
          }
      }
    
    }
);
