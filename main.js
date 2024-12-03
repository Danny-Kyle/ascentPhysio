async function loadComponent(file, target) {
    try {
        const response = await fetch(file);
        const content = await response.text();
        document.querySelector(target).innerHTML = content;
    } catch (error) {
        console.error(`Error loading ${file}:`, error);
    }
}

function highlightActiveLink(){
    const currentPage = window.location.pathname.split("/").pop();
    const navlinks = document.querySelectorAll(".nav-btn");

    navlinks.forEach((link) => {
        link.classList.remove("active");
        if(link.getAttribute("href") === currentPage){
            link.classList.add("active")
        }
    })
}

document.addEventListener("DOMContentLoaded", async() => {
    await loadComponent("components/header.html", "#header-placeholder");
    await loadComponent("components/footer.html", "#footer-placeholder");

    const contentMap = {
        "index.html": "main/home-content.html",
        "News.html": "main/news-content.html",
        "OurTeam.html": "main/team-content.html",
        "P&S.html": "main/ps-content.html",
        "Facilities.html": "main/facilities-content.html",
        "Rates.html": "main/rates-content.html",
        "weblinks.html": "main/weblinks-content.html",
        "Contact.html": "main/contact-content.html",
    };

    const currentPage = window.location.pathname.split("/").pop();
    const contentFile = contentMap[currentPage]  || "main/home-content.html"
    await loadComponent(contentFile, "#main-content");

    highlightActiveLink()
})