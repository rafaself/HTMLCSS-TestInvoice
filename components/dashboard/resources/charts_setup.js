import { configChart, updateChart, groupingOptions } from "/components/dashboard/resources/charts_config.js"

export const setupChartsContext = (invoicesData) => {
    if (invoicesData) {
        configChart(invoicesData)
    }
    $(".option_monthly").on("click", () => {
        $(".option_annually").removeClass("active")
        $(".option_semiannually").removeClass("active")

        $(".option_monthly").addClass("active")
        updateChart(invoicesData, groupingOptions.MONTHLY)
    })
    $(".option_annually").on("click", () => {
        $(".option_monthly").removeClass("active")
        $(".option_semiannually").removeClass("active")

        $(".option_annually").addClass("active")
        updateChart(invoicesData, groupingOptions.ANNUALLY)
    })
    $(".option_semiannually").on("click", () => {
        $(".option_monthly").removeClass("active")
        $(".option_annually").removeClass("active")

        $(".option_semiannually").addClass("active")
        updateChart(invoicesData, groupingOptions.SEMIANNUALLY)
    })
}