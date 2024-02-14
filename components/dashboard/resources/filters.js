import { invoicesData } from "/components/dashboard/resources/generate_data.js";
import { populateCards } from "/components/dashboard/resources/cards_data.js"
import { populateTable, configButtonAction } from "/components/dashboard/resources/table_data.js"

$(() => {

    configButtonAction()
    populateCards(invoicesData)
    populateTable(invoicesData)

});

