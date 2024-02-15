let myChart
let myChartForDefault

const graphicSetup = (labels, datasets) => {
  var ctx = document.getElementById('myChart')
  myChart = new Chart(ctx, {
    type: 'bar',
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

const graphicSetupForDefault = (labels, datasets, type) => {
  var ctx = document.getElementById('myChart-default')
  myChartForDefault = new Chart(ctx, {
    type: type,
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

export const groupingOptions = {
  MONTHLY: "monthly",
  SEMIANNUALLY: "semiannually",
  ANNUALLY: "annually"
}

const getLabels = (invoicesData, groupingOption = groupingOptions.MONTHLY) => {
  const invoicesPaymentDatesMapped = invoicesData.map(el => {
    const [_, month, year] = el.invoiceIssueDate.split('/');
    return `${month}/${year}`;
  });

  const uniquePaymentDates = Array.from(new Set(invoicesPaymentDatesMapped))

  let labels = uniquePaymentDates.sort((date1, date2) => convertToDate(date1) - convertToDate(date2));

  if (groupingOption == groupingOptions.SEMIANNUALLY) {
    labels = ["1º Semestre", "2º Semestre"]
  }
  else if (groupingOption == groupingOptions.ANNUALLY) {
    labels = ["2024"]
  }

  return labels;
}


const checkSemester = (date) => {
  let month = date.split("/")[0]
  return month <= 6 ? 1 : 2
}

const getValues = (labels, invoicesData, groupingOption = groupingOptions.MONTHLY) => {
  let values = []

  switch (groupingOption) {
    case groupingOptions.MONTHLY:
      for (var label of labels) {
        var invoicesDataFilteredByDate = invoicesData.filter(el => el.invoiceIssueDate.includes(label))
        let sum = 0
        for (var invoiceData of invoicesDataFilteredByDate) {
          sum += invoiceData.invoiceValue
        }
        values.push(sum)
      }
      break
    case groupingOptions.SEMIANNUALLY:
      for (var label of labels) {
        let semesters = [1, 2]
        let sum = 0
        for (var semester of semesters) {
          var invoicesDataFilteredByDate = invoicesData.filter(el => {
            return checkSemester(el.invoiceIssueDate) == semester
          })
          for (var invoiceData of invoicesDataFilteredByDate) {
            sum += invoiceData.invoiceValue
          }
          values.push(sum)
        }
      }
      break
    case groupingOptions.ANNUALLY:
      let sum = 0
      for (var invoiceData of invoicesData) {
        sum += invoiceData.invoiceValue
      }
      values.push(sum)
      break
  }

  return values
}

const getValuesForDefault = (labels, invoicesData, groupingOption = groupingOptions.MONTHLY) => {
  let values = []
  invoicesData = invoicesData.filter(el => el.invoiceStatus == "Pagamento em atraso")

  switch (groupingOption) {
    case groupingOptions.MONTHLY:
      for (var label of labels) {
        var invoicesDataFilteredByDate = invoicesData.filter(el => el.invoiceIssueDate.includes(label) )
        values.push(invoicesDataFilteredByDate.length)
      }
      break
    case groupingOptions.SEMIANNUALLY:
      for (var label of labels) {
        let semesters = [1, 2]
        for (var semester of semesters) {
          var invoicesDataFilteredByDate = invoicesData.filter(el => {
            return checkSemester(el.invoiceIssueDate) == semester
          })
          values.push(invoicesDataFilteredByDate.length)
        }
      }
      break
    case groupingOptions.ANNUALLY:
      values.push(invoicesData.length)
      break
  }

  return values
}

const getDatasets = (values) => {
  return [
    {
      data: values,
      backgroundColor: '#7a6248',
      borderWidth: 4,
      borderRadius: 4,
      pointBackgroundColor: '#007bff'
    }
  ]
}

export const configChart = (invoicesData) => {
  let labels = getLabels(invoicesData)
  let values = getValues(labels, invoicesData)
  let datasets = getDatasets(values)
  graphicSetup(labels, datasets, "bar")
  
  
  // Inadimplências
  let valuesForDefault = getValuesForDefault(labels, invoicesData)
  let datasetsForDefault = getDatasets(valuesForDefault)
  graphicSetupForDefault(labels, datasetsForDefault, "bar")
}

export const updateChart = (invoicesData, groupingOptionPassed) => {
  let labels = getLabels(invoicesData, groupingOptionPassed)

  let values = getValues(labels, invoicesData, groupingOptionPassed)
  myChart.data.labels = labels
  myChart.data.datasets = getDatasets(values)
  myChart.update()

  let valuesForDefault = getValuesForDefault(labels, invoicesData, groupingOptionPassed)
  myChartForDefault.data.labels = labels
  myChartForDefault.data.datasets = getDatasets(valuesForDefault)
  myChartForDefault.update()
}