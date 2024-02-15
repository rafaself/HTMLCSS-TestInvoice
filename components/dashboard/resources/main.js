import { invoicesData } from "/components/dashboard/resources/generate_data.js";
import { populateCards } from "/components/dashboard/resources/cards_data.js"
import { configGraphic } from "/components/dashboard/resources/graphic.js"
import { populateTable, configButtonAction } from "/components/dashboard/resources/table_data.js"

$(() => {

    configGraphic(invoicesData)
    configButtonAction(invoicesData)
    populateCards(invoicesData)
    populateTable(invoicesData)

});

