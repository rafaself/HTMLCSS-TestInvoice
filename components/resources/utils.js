const sortByDateFunction = (invoiceData1, invoiceData2) => {
    const [dayA, monthA, yearA] = invoiceData1.invoicePaymentDate.split('/');
    const [dayB, monthB, yearB] = invoiceData2.invoicePaymentDate.split('/');

    const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
    const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
    return dateA - dateB;
}

export const sortByDate = (invoiceData) => {
    return invoiceData.filter(val => val.invoicePaymentDate != "-").sort(sortByDateFunction);
}