const sortByDateFunction = (invoiceData1, invoiceData2) => {
    const [dayA, monthA, yearA] = invoiceData1.paymentDate.split('/');
    const [dayB, monthB, yearB] = invoiceData2.paymentDate.split('/');

    const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
    const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
    return dateA - dateB;
}

export const sortByDate = (invoiceData) => {
    return invoiceData.filter(val => val.paymentDate != null).sort(sortByDateFunction);
}

export const filterByIssueMonthAndYear = (invoicesData, dateIssueToFilter) => {
    var [yearToFilter, monthToFilter] = dateIssueToFilter.split('-')

    var invoicesDataFiltered = invoicesData.filter((invoiceData) => {
        var [_, invoiceMonthIssued, invoiceYearIssued] = invoiceData.invoiceIssueDate.split('/')
        return invoiceMonthIssued == monthToFilter & invoiceYearIssued == yearToFilter
    })

    return invoicesDataFiltered

}
