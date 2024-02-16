import { invoicesData } from "/components/resources/generate_data.js";
import { populateCards } from "/components/resources/cards_data.js"
import { configChartsContext } from "/components/resources/grouping_options_filter.js"

export const main = () => {
    configChartsContext(invoicesData)
    populateCards(invoicesData)
}