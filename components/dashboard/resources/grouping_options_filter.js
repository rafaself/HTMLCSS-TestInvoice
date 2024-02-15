import { groupingOptions } from "/components/dashboard/resources/graphic.js"
import { configChart, updateChart } from "/components/dashboard/resources/graphic.js"


export const configOptionButtonsAction = (invoicesData) => {
    configChart(invoicesData)
    $(".option_monthly").on("click", () => {
        updateChart(invoicesData, groupingOptions.MONTHLY)
    })
    $(".option_annually").on("click", () => {
        updateChart(invoicesData, groupingOptions.ANNUALLY)
    })
    $(".option_semiannually").on("click", () => {
        updateChart(invoicesData, groupingOptions.SEMIANNUALLY)
    })
}