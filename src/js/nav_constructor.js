function capitalized(string) {
    return string[0].toUpperCase() + string.slice(1);
}

function construct_nav() {
    let nav = document.querySelector("nav");
    let pages = ["dashboard", "profile", "reservations"];

    let head = document.createElement("h2");
    head.textContent = "Navigation";
    nav.appendChild(head);

    pages.forEach(page => {
        let link = document.createElement("a");
        link.textContent = capitalized(page);
        link.setAttribute("href", page + ".html");
        nav.appendChild(link);
    });

    console.log("done!")
}

construct_nav();