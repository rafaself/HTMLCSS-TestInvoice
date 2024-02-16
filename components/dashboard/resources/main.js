import { populateCards } from "/components/dashboard/resources/cards_data.js"
import { setupChartsContext } from "/components/dashboard/resources/charts_setup.js"

export const main = async () => {
    $().ready(async () => {
        const invoicesData = await $.ajax("https://rafaself.github.io/data.json")
        setupChartsContext(invoicesData)
        populateCards(invoicesData)
    })
}