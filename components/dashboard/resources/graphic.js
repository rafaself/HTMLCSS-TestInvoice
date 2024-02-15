var myChart

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

const convertToDate = (str) => {
  const [month, year] = str.split('/');
  return new Date(year, month - 1);
};

export const groupingOptions = {
  MONTHLY: "monthly",
  SEMIANNUALLY: "semiannually",
  ANUALLY: "anually"
}

const getLabels = (invoicesData, groupingOption) => {
  const invoicesPaymentDatesMapped = invoicesData.map(el => {
    const [_, month, year] = el.invoiceIssueDate.split('/');
    return `${month}/${year}`;
  });

  const uniquePaymentDates = Array.from(new Set(invoicesPaymentDatesMapped))

  let labels = uniquePaymentDates.sort((date1, date2) => convertToDate(date1) - convertToDate(date2));

  if (groupingOption == groupingOptions.SEMIANNUALLY) {
    labels = ["1º Semestre", "2º Semestre"]
  }
  else if (groupingOption == groupingOptions.ANUALLY) {
    labels = ["2024"]
  }

  return labels;
}


const checkSemester = (date) => {
  let month = date.split("/")[0]
  return month <= 6 ? 1 : 2
}

const getValues = (labels, invoicesData, groupingOption) => {
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
    case groupingOptions.ANUALLY:
      let sum = 0
      for (var invoiceData of invoicesData) {
        sum += invoiceData.invoiceValue
      }
      values.push(sum)
      break
  }

  return values
}

const getDatasets = (values) => {
  return [
    {
      data: values,
      backgroundColor: '#007bff',
      borderWidth: 4,
      borderRadius: 4,
      pointBackgroundColor: '#007bff'
    }
  ]
}

export const configChart = (invoicesData, groupingOption, reuse = false) => {
  let labels = getLabels(invoicesData, groupingOption)
  let values = getValues(labels, invoicesData, groupingOption)
  let datasets = getDatasets(values)
  graphicSetup(labels, datasets)
}