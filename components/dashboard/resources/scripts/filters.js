import { invoicesData } from "/components/dashboard/resources/scripts/generate_data.js";
import { sortByDate, filterByIssueMonthAndYear } from "/components/dashboard/resources/scripts/utils.js";

var filterButton = $(".filter-button")
var dashboardTableLines = $(".dashboard-table__lines")
var dateRangeIssue = $(".daterange-issue")

$(() => {

    filterButton.on("click", () => {
        dashboardTableLines.empty()
        var dateIssueToFilter = dateRangeIssue.val()
        var invoicesDataCopy = invoicesData;

        var invoicesDataFilteredByMonth = filterByIssueMonthAndYear(invoicesDataCopy, dateIssueToFilter)

        for (const [, invoiceData] of Object.entries(invoicesDataFilteredByMonth)) {
            newLine(invoiceData);
        }

    })

    for (const [, invoiceData] of Object.entries(invoicesData)) {
        newLine(invoiceData);
    }

});

function newLine(
    invoiceData
) {
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
                    <td>${invoiceData.chargeDate}</td>
                    <!-- Data do Pagamento -->
                    <td>${invoiceData.paymentDate}</td>
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