const renderHome = () => {
    $("#page").load("pages/dashboard.html");
};

const renderInvoicesTable = () => {
    $("#page").load("pages/dashboard.html");
};

const handleRoute = () => {
    const path = window.location.hash;
    switch (path) {
        case '#/':
            renderHome();
            break;
        case '#/invoices-table':
            renderAbout();
            break;
        default:
            renderHome();
    }
};

window.addEventListener('hashchange', handleRoute);

handleRoute();