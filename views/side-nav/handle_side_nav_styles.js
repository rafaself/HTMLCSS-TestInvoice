export const handleNavSideStyles = (path) => {
    $('.side-nav__buttons__button').each(function () {
        $(this).removeClass("active")
        var href = $(this).find("a").attr("href")

        if (href == path) {
            $(this).addClass("active")
        } else if (href == "#/" && path == "") {
            $(this).addClass("active")
        }
    });
}
