const labels = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

var datasets = [
  {
    data: [
      15339,
      21345,
      18483,
      24003,
      23489,
      24092,
      12034
    ],
    lineTension: 0,
    backgroundColor: 'transparent',
    borderColor: '#007bff',
    borderWidth: 4,
    pointBackgroundColor: '#007bff'
  }
]

const graphicSetup = (labels, datasets) => {
  const ctx = document.getElementById('myChart')
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          boxPadding: 3
        }
      }
    }
  })
}

const convertToDate = (str) => {
  const parts = str.split('/');
  return new Date(parts[2], parts[1] - 1, parts[0]);
};

const getLabels = (invoicesData) => {
  var invoicesPaymentDatesFilter = invoicesData.filter(el => el.invoicePaymentDate != "-")
  var invoicesPaymentDatesMapped = invoicesPaymentDatesFilter.map(el => el.invoicePaymentDate)

  var invoiesPaymentDatesSet = Array.from(new Set(invoicesPaymentDatesMapped))

  var invoicesPaymentDates = invoiesPaymentDatesSet.sort((a, b) => convertToDate(a) - convertToDate(b))

  return invoicesPaymentDates
}

export const configGraphic = (invoicesData) => {
  
  var labels = getLabels(invoicesData)

  graphicSetup(labels, datasets)
}