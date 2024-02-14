var names = [
    "Sofia Santos",
    "Pedro Almeida",
    "Ana Silva",
    "Lucas Oliveira",
    "Mariana Costa",
    "João Pereira",
    "Beatriz Ferreira",
    "Gabriel Carvalho",
    "Laura Martins",
    "Rafael Sousa",
    "Isabela Rodrigues",
    "Mateus Fernandes",
    "Juliana Gomes",
    "Gustavo Nunes",
    "Camila Oliveira",
    "Enzo Lima",
    "Manuela Pereira",
    "Leonardo Castro",
    "Lara Rodrigues",
    "Luiz Mendes",
    "Carolina Alves",
    "Matheus Ferreira",
    "Lívia Souza",
    "Daniel Ribeiro",
    "Luana Santos",
    "Vinícius Costa",
    "Alice Martins",
    "Pedro Henrique Lima",
    "Eduarda Oliveira",
    "Bruno Gonçalves",
    "Luiza Silva",
    "Henrique Almeida",
    "Isadora Fernandes",
    "David Pereira",
    "Letícia Rodrigues",
    "Lucas Carvalho",
    "Clara Santos",
    "Thiago Oliveira",
    "Valentina Costa",
    "André Rodrigues",
    "Maria Eduarda Alves",
    "Fernando Sousa",
    "Helena Lima",
    "Felipe Gomes",
    "Gabriela Castro",
    "Eduardo Martins",
    "Ana Laura Nunes",
    "Matheus Ferreira",
    "Laura Oliveira"
];


const statusList = ["Emitida", "Cobrança realizada", "Pagamento realizado", "Pagamento em atraso"];

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRndFloat(min, max) {
    return Math.random() * (max - min) + min;
}

const getRandomStatus = () => {
    const statusChoice = getRndInteger(0, 4);
    return statusList[statusChoice]
}

const compareTwoDates = (invoiceData1, invoiceData2) => {
    const [dayA, monthA, yearA] = invoiceData1.paymentDate.split('/');
    const [dayB, monthB, yearB] = invoiceData2.paymentDate.split('/');

    const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
    const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
    return dateA - dateB;
}

const getRandomDateIn2023 = () => {
    var month = getRndInteger(1, 13)
    var day = getRndInteger(1, 30)
    return new Date(`2024-${month}-${day}`).toLocaleString("pt-br").split(",")[0]
}

const generateDatePlusTenDays = (date) => {
    var [day, month, _] = date.split("/")
    var issueDate = new Date(`2024-${month}-${day}`)
    var charDate = (new Date(issueDate.setDate(issueDate.getDate() + 10))).toLocaleString("pt-br").split(",")[0]
    return charDate
}

const generateRandomSequence = (size) => {
    const chars = "ABC0123456789";
    var sequence = "";

    for (let i = 0; i < size; i++) {
        var charIndex = getRndInteger(1, size + 1)
        sequence += chars[charIndex];
    }

    return sequence;
}

const getRandomName = () => {
    return names[getRndInteger(1, names.length)]
}

export const generateInvoicesData = (invoicesDataSize = 10) => {
    var invoicesDataTemp = [];
    for (var index = 0; index < invoicesDataSize; index++) {
        var id = (index + 1).toString()

        var userName = getRandomName()

        var invoiceValue = getRndFloat(300, 2000)
        var invoiceStatus = getRandomStatus()
        var invoiceNumber = generateRandomSequence(5)
        var invoiceDocument = "FILEI_" + invoiceNumber + ".pdf"
        var ticketDocument = "FILET_" + invoiceNumber + ".pdf"

        // Datas
        var invoiceIssueDate = getRandomDateIn2023()
        var chargeDate = "-"
        var paymentDate = "-"

        if (invoiceStatus == statusList[3]) {
            var chargeDate = generateDatePlusTenDays(invoiceIssueDate)
        } else if (invoiceStatus == statusList[2]) {
            var chargeDate = generateDatePlusTenDays(invoiceIssueDate)
            var paymentDate = generateDatePlusTenDays(chargeDate)
        } else if (invoiceStatus == statusList[1]) {
            var chargeDate = generateDatePlusTenDays(invoiceIssueDate)
        }


        var invoice = {
            id,
            userName,
            invoiceNumber,
            invoiceIssueDate,
            invoiceStatus,
            chargeDate,
            paymentDate,
            invoiceDocument,
            ticketDocument,
            invoiceValue
        }
        invoicesDataTemp.push(invoice)
    }
    return invoicesDataTemp
}

export const invoicesData = generateInvoicesData(100)