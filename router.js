import { handleNavSideStyles } from "./views/side-nav/handle_side_nav_styles.js"

const renderHome = () => {
    $("#page").load("pages/dashboard.html");
};

const renderInvoicesTable = () => {
    $("#page").load("pages/invoices_table.html");
};

const renderPageNotFound = () => {
    $("#page").load("pages/page-not-found.html");
};

const handleRoute = () => {
    const path = window.location.hash;
    handleNavSideStyles(path)
    switch (path) {
        case '':
            renderHome();
            break;
        case '#/':
            renderHome();
            break;
        case '#/invoices-table':
            renderInvoicesTable();
            break;
        default:
            renderPageNotFound();
    }
};

$(window).on('load hashchange', () => {
    handleRoute();
});

handleRoute(); 