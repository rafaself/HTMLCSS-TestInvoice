import { filterByMonthAndYear } from "/components/dashboard/resources/utils.js";

var dashboardTableLines = $(".dashboard-table__lines")

export const populateTable = (invoicesDataEntry) => {
    for (const [, invoiceData] of Object.entries(invoicesDataEntry)) {
        newLine(invoiceData);
    }
}

export const configButtonAction = (invoicesDataEntry) => {
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

        populateTable(invoicesDataEntry)
    })

    addFiltersButton.on("click", () => {
        dashboardTableLines.empty()
        var invoiceIssueDateToFilter = dateRangeIssue.val()
        var invoiceChargeDateToFilter = dateRangeCharge.val()
        var invoicePaymentDateToFilter = dateRangePayment.val()
        var invoiceStatusToFilter = invoiceStatus.val()

        var invoicesDataCopy = invoicesDataEntry;

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