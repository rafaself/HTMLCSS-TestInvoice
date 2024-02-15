const graphicSetup = (labels, datasets) => {
  const ctx = document.getElementById('myChart')
  new Chart(ctx, {
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
  const [month, year] = str.split('/');
  return new Date(year, month - 1);
};

const getLabels = (invoicesData) => {
  const invoicesPaymentDatesMapped = invoicesData.map(el => {
    const [_, month, year] = el.invoiceIssueDate.split('/');
    return `${month}/${year}`;
  });

  const uniquePaymentDates = Array.from(new Set(invoicesPaymentDatesMapped))

  const sortedPaymentDates = uniquePaymentDates.sort((date1, date2) => convertToDate(date1) - convertToDate(date2));
  console.log(sortedPaymentDates)
  return sortedPaymentDates;
}


const getValues = (labels, invoicesData) => {
  var values = []
  for (var label of labels) {
    var invoicesDataFilteredByDate = invoicesData.filter(el => el.invoiceIssueDate.includes(label))
    var sum = 0
    for (var invoiceData of invoicesDataFilteredByDate) {
      sum += invoiceData.invoiceValue
    }
    values.push(sum)
  }
  return values
}

const getDatasets = (values) => {
  return [
    {
      data: values,
      lineTension: 0,
      backgroundColor: 'transparent',
      borderColor: '#007bff',
      borderWidth: 4,
      pointBackgroundColor: '#007bff'
    }
  ]
}

export const configGraphic = (invoicesData) => {
  const labels = getLabels(invoicesData)
  const values = getValues(labels, invoicesData)
  const datasets = getDatasets(values)
  graphicSetup(labels, datasets)
}