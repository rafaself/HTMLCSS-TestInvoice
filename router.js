const renderHome = () => {
    $("#page").load("pages/dashboard.html");
};

const renderInvoicesTable = () => {
    $("#page").load("pages/invoices_table.html");
};

const handleRoute = () => {
    const path = window.location.hash;
    switch (path) {
        case '#/':
            renderHome();
            break;
        case '#/invoices-table':
            renderInvoicesTable();
            break;
        default:
            renderHome();
    }
};

window.addEventListener('hashchange', handleRoute);

handleRoute();