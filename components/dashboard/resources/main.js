import { populateCards } from "/components/dashboard/resources/cards_data.js"
import { setupChartsContext } from "/components/dashboard/resources/charts_setup.js"

export const main = async () => {
    const invoicesData = await $.ajax("https://rafaself.github.io/data.json")
    console.log(invoicesData)
    setupChartsContext(invoicesData)
    populateCards(invoicesData)
}