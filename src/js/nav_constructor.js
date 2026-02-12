function capitalized(string) {
    return string[0].toUpperCase() + string.slice(1);
}

function construct_nav() {

    let nav = document.querySelector("nav");

    if (document.title == "Manage Reservations" ||
        document.title == "List of Reservations" ||
        document.title == "In-person: View Slots" ||
        document.title == "Room Requests" || 
        document.title == "Admin Profile")
    {

        let head = document.createElement("a");
        head.setAttribute("href", "profile_admin.html")
        head.textContent = "Archer's Lab";
        nav.appendChild(head);

        let profile_admin = document.createElement("a");
        profile_admin.setAttribute("href", "profile_admin.html")
        profile_admin.textContent = "Profile";
        nav.appendChild(profile_admin)

        let manage = document.createElement("a");
        manage.setAttribute("href", "manage_reservations.html")
        manage.textContent = "Manage Reservations"
        nav.appendChild(manage);

        let logout = document.createElement("a");
        logout.setAttribute("href", "both_login_register.html")
        logout.textContent = "Log Out"
        nav.appendChild(logout);

    }
    else 
    {

        let head = document.createElement("a");
        head.textContent = "Archer's Lab";
        head.setAttribute("href", "dashboard.html")

        nav.appendChild(head);

        let pages = ["dashboard", "profile", "reservations"];

        pages.forEach(page => {
            let link = document.createElement("a");
            link.textContent = capitalized(page);
            link.setAttribute("href", page + ".html");
            nav.appendChild(link);
        });

        let request_room = document.createElement("a");
        request_room.setAttribute("href", "request_room.html")
        request_room.textContent = "Request Room";
        nav.appendChild(request_room);

        let logout = document.createElement("a");
        logout.setAttribute("href", "both_login_register.html")
        logout.textContent = "Log Out"
        nav.appendChild(logout);
    }

    console.log("[nav_constructor.js] Initialized navigation bar!")
}

construct_nav();