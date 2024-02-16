import { invoicesData } from "/components/resources/generate_data.js";
import { populateCards } from "/components/resources/cards_data.js"
import { configOptionButtonsAction } from "/components/resources/grouping_options_filter.js"
import { populateTable, configButtonAction } from "/components/resources/table_data.js"

$(() => {
    configOptionButtonsAction(invoicesData)
    configButtonAction(invoicesData)
    populateCards(invoicesData)
    populateTable(invoicesData)

});

