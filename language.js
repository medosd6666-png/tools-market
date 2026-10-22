javascript
function getSavedLanguage() {
    const params = new URLSearchParams(window.location.search);
    const pageLanguage = params.get("lang");

    if (pageLanguage === "en" || pageLanguage === "ar") {
        return pageLanguage;
    }

    try {
        return localStorage.getItem("toolsMarketLanguage") === "en"
            ? "en"
            : "ar";
    } catch (error) {
        return "ar";
    }
}

function applyPageLanguage() {
    const language = getSavedLanguage();
    const isArabic = language === "ar";

    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";

    document.querySelectorAll("[data-ar][data-en]").forEach(function(element) {
        element.textContent = isArabic
            ? element.getAttribute("data-ar")
            : element.getAttribute("data-en");
    });
}

function saveLanguage(language) {
    const selectedLanguage = language === "en" ? "en" : "ar";

    try {
        localStorage.setItem("toolsMarketLanguage", selectedLanguage);
    } catch (error) {
        // يستمر الموقع في العمل حتى لو تعذر حفظ اللغة
    }

    applyPageLanguage();
}
