const invoicesData = await $.ajax("https://rafaself.github.io/data.json")

const filterByMonthAndYear = (invoicesData, dateIssueToFilter, dateType) => {
    var [yearToFilter, monthToFilter] = dateIssueToFilter.split('-')

    var invoicesDataFiltered = invoicesData.filter((invoiceData) => {
        var [_, invoiceMonthIssued, invoiceYearIssued] = invoiceData[dateType].split('/')
        return invoiceMonthIssued == monthToFilter && invoiceYearIssued == yearToFilter
    })

    return invoicesDataFiltered
}

export const populateTable = (invoicesDataEntry = invoicesData) => {
    for (const [, invoiceData] of Object.entries(invoicesDataEntry)) {
        newLine(invoiceData);
    }
}

export const configButtonsAction = () => {
    var dashboardTableLines = $(".dashboard-table__lines")
    var addFiltersButton = $(".add-filters")
    var cleanFiltersButton = $(".clean-filters")
    var dateRangeIssue = $(".daterange-issue")
    var dateRangeCharge = $(".daterange-charge")
    var dateRangePayment = $(".daterange-payment")
    var invoiceStatus = $(".invoice-status")

    cleanFiltersButton.on("click", () => {
        dashboardTableLines.empty()
        dateRangeIssue.val("")
        dateRangeCharge.val("")
        dateRangePayment.val("")
        invoiceStatus.val("")
        populateTable(invoicesData)
    })

    addFiltersButton.on("click", () => {
        dashboardTableLines.empty()
        var invoiceIssueDateToFilter = dateRangeIssue.val()
        var invoiceChargeDateToFilter = dateRangeCharge.val()
        var invoicePaymentDateToFilter = dateRangePayment.val()
        var invoiceStatusToFilter = invoiceStatus.val()
        var invoicesDataCopy = invoicesData;

        if (invoiceIssueDateToFilter) {
            invoicesDataCopy = filterByMonthAndYear(invoicesDataCopy, invoiceIssueDateToFilter, "invoiceIssueDate")
        }
        
        if (invoiceChargeDateToFilter) {
            invoicesDataCopy = filterByMonthAndYear(invoicesDataCopy, invoiceChargeDateToFilter, "invoiceChargeDate")
        }
        
        if (invoicePaymentDateToFilter) {
            invoicesDataCopy = filterByMonthAndYear(invoicesDataCopy, invoicePaymentDateToFilter, "invoicePaymentDate")
        }
        
        if (invoiceStatusToFilter != "") {
            invoicesDataCopy = invoicesDataCopy.filter(invoiceData => invoiceData.invoiceStatus == invoiceStatusToFilter)
        }

        populateTable(invoicesDataCopy)
    })
}

const newLine = (invoiceData) => {
    var dashboardTableLines = $(".dashboard-table__lines")
    dashboardTableLines.append(`
            <tr>
                <!-- ID -->
                <th scope="row">${invoiceData.id}</th>
                <!-- Nome do pagador -->
                <td>${invoiceData.userName}</td>
                <!-- Número da nota fiscal -->
                <td>${invoiceData.invoiceNumber}</td>
                <!-- Data da Emissão da Nota -->
                <td>${invoiceData.invoiceIssueDate}</td>
                <!-- Data da Cobrança -->
                <td>${invoiceData.invoiceChargeDate}</td>
                <!-- Data do Pagamento -->
                <td>${invoiceData.invoicePaymentDate}</td>
                <!-- Valor da Nota -->
                <td>R$ ${invoiceData.invoiceValue.toFixed(2).replace(".", ",")}</td>
                <!-- Documento da Nota Fiscal -->
                <td>${invoiceData.invoiceDocument}</td>
                <!-- Documento do Boleto Bancário -->
                <td>${invoiceData.ticketDocument}</td>
                <!-- Status da Nota -->
                <td>${invoiceData.invoiceStatus}</td>
            </tr>
        `);
}