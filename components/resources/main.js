import { populateCards } from "/components/resources/cards_data.js"
import { configChartsContext } from "/components/resources/grouping_options_filter.js"

export const main = async () => {
    const invoicesData = await $.ajax("https://rafaself.github.io/data.json")
    configChartsContext(invoicesData)
    populateCards(invoicesData)
}