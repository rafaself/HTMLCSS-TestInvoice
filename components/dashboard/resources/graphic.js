const graphicSetup = (labels, datasets) => {
  const ctx = document.getElementById('myChart')
  new Chart(ctx, {
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

const groupingOptions = {
  MONTHLY: "monthly",
  SEMIANNUALLY: "semiannually",
  ANUALLY: "anually"
}

let groupingOption = groupingOptions.MONTHLY

const getLabels = (invoicesData) => {
  const invoicesPaymentDatesMapped = invoicesData.map(el => {
    const [_, month, year] = el.invoiceIssueDate.split('/');
    return `${month}/${year}`;
  });

  const uniquePaymentDates = Array.from(new Set(invoicesPaymentDatesMapped))

  let labels = uniquePaymentDates.sort((date1, date2) => convertToDate(date1) - convertToDate(date2));

  if (groupingOption == groupingOptions.SEMIANNUALLY) {
    labels = ["1º Semestre", "2º Semestre"]
  } 
  // else if (groupingOption == groupingOptions.ANNUALLY) {
  //   labels = ["2024"]
  // }

  return labels;
}


const checkSemester = (date) => {
  let month = date.split("/")[0]
  return month <= 6 ? 1 : 2
}

const getValues = (labels, invoicesData) => {
  let values = []
  
  if (groupingOption == groupingOptions.MONTHLY) {
    for (var label of labels) {
      var invoicesDataFilteredByDate = invoicesData.filter(el => el.invoiceIssueDate.includes(label))
      var sum = 0
      for (var invoiceData of invoicesDataFilteredByDate) {
        sum += invoiceData.invoiceValue
      }
      values.push(sum)
    }
  } else if (groupingOption == groupingOptions.SEMIANNUALLY) {
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
    console.log(values)
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

export const configGraphic = (invoicesData) => {
  const labels = getLabels(invoicesData)
  const values = getValues(labels, invoicesData)
  const datasets = getDatasets(values)
  graphicSetup(labels, datasets)
}