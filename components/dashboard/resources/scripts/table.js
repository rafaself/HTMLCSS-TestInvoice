import { invoicesData } from "/components/dashboard/resources/data/data.js";
import { sortByDate } from "/components/dashboard/resources/scripts/utils.js";


console.log("opa 43412");

$(() => {
    var invoicesDataCopy = [...invoicesData];
    invoicesDataCopy = sortByDate(invoicesDataCopy);

    console.log(invoicesData)

    for (const [, invoiceData] of Object.entries(invoicesDataCopy)) {
        newLine(invoiceData);
    }
});

function newLine(
    invoiceData
) {
    $(".dashboard-table__lines").append(`
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