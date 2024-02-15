import { groupingOptions } from "/components/dashboard/resources/graphic.js"
import { configChart } from "/components/dashboard/resources/graphic.js"


export const configOptionButtonsAction = (invoicesData) => {
    configChart(invoicesData, groupingOptions.MONTHLY)
    $(".option_monthly").on("click", () => {
        configChart(invoicesData, groupingOptions.MONTHLY)
    })
    $(".option_anually").on("click", () => {
        if (window.myChart) {
            window.myChart.destroy(); // Destroy the existing chart
        }
        configChart(invoicesData, groupingOptions.ANUALLY)
    })
}