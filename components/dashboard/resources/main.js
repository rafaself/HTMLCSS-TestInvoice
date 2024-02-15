import { invoicesData } from "/components/dashboard/resources/generate_data.js";
import { populateCards } from "/components/dashboard/resources/cards_data.js"
import { configOptionButtonsAction } from "/components/dashboard/resources/grouping_options_filter.js"
import { populateTable, configButtonAction } from "/components/dashboard/resources/table_data.js"

$(() => {
    configOptionButtonsAction(invoicesData)
    configButtonAction(invoicesData)
    populateCards(invoicesData)
    populateTable(invoicesData)

});

