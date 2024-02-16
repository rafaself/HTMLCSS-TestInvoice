const getSumOfIssuedsInvoices = (invoicesDataEntry, withCharge = true) => {
    var issueCardValue = $(".issue_card_value")

    var invoicesDataIssued = invoicesDataEntry.filter(invoiceData => {
        var statusToCompare = ["Emitida", "Cobrança realizada", "Pagamento realizado", "Pagamento em atraso"]

        return statusToCompare.includes(invoiceData.invoiceStatus)
    }
    )
    var invoicesDataIssuedValue = invoicesDataIssued.map(invoiceData => invoiceData.invoiceValue)
    var sum = 0;
    invoicesDataIssuedValue.forEach(value => sum += value)
    sum = sum.toFixed(2).replace(".", ",")
    issueCardValue.text("R$ " + sum)
}

const getSumOfIssuedsInvoicesWithoutCharge = (invoicesDataEntry) => {
    var issueCardValue = $(".issue_without_charges_card_value")

    var invoicesDataIssued = invoicesDataEntry.filter(invoiceData => {
        var statusToCompare = ["Emitida"]
        return statusToCompare.includes(invoiceData.invoiceStatus)
    }
    )
    var invoicesDataIssuedValue = invoicesDataIssued.map(invoiceData => invoiceData.invoiceValue)
    var sum = 0;
    invoicesDataIssuedValue.forEach(value => sum += value)
    sum = sum.toFixed(2).replace(".", ",")
    issueCardValue.text("R$ " + sum)
}

const getSumOfExpiredInvoices = (invoicesDataEntry) => {
    var issueCardValue = $(".expired_card_value")

    var invoicesDataIssued = invoicesDataEntry.filter(invoiceData => {
        var statusToCompare = ["Pagamento em atraso"]
        return statusToCompare.includes(invoiceData.invoiceStatus)
    }
    )
    var invoicesDataIssuedValue = invoicesDataIssued.map(invoiceData => invoiceData.invoiceValue)
    var sum = 0;
    invoicesDataIssuedValue.forEach(value => sum += value)
    sum = sum.toFixed(2).replace(".", ",")
    issueCardValue.text("R$ " + sum)
}

const getSumOfToExpireInvoices = (invoicesDataEntry) => {
    var issueCardValue = $(".to_expire_card_value")

    var invoicesDataIssued = invoicesDataEntry.filter(invoiceData => {
        var statusToCompare = ["Emitido", "Cobrança realizada"]
        return statusToCompare.includes(invoiceData.invoiceStatus)
    }
    )
    var invoicesDataIssuedValue = invoicesDataIssued.map(invoiceData => invoiceData.invoiceValue)
    var sum = 0;
    invoicesDataIssuedValue.forEach(value => sum += value)
    sum = sum.toFixed(2).replace(".", ",")
    issueCardValue.text("R$ " + sum)
}

const getSumOfPaidInvoices = (invoicesDataEntry) => {
    var issueCardValue = $(".paid_card_value")

    var invoicesDataIssued = invoicesDataEntry.filter(invoiceData => {
        var statusToCompare = ["Pagamento realizado"]
        return statusToCompare.includes(invoiceData.invoiceStatus)
    }
    )
    var invoicesDataIssuedValue = invoicesDataIssued.map(invoiceData => invoiceData.invoiceValue)
    var sum = 0;
    invoicesDataIssuedValue.forEach(value => sum += value)
    sum = sum.toFixed(2).replace(".", ",")
    issueCardValue.text("R$ " + sum)
}

export const populateCards = (invoicesDataEntry) => {
    getSumOfToExpireInvoices(invoicesDataEntry)
    getSumOfPaidInvoices(invoicesDataEntry)
    getSumOfExpiredInvoices(invoicesDataEntry)
    getSumOfIssuedsInvoicesWithoutCharge(invoicesDataEntry)
    getSumOfIssuedsInvoices(invoicesDataEntry)
}