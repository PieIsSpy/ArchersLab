function constructRoom() {
    let seats = document.querySelector("#seat-list");

    for (let i = 0; i < 5; i++) {
        let row = document.createElement("div")
        row.setAttribute("class", "row")
        for (let j = 0; j < 6; j++) {
            let seat = document.createElement("div")
            seat.setAttribute("class", "seat");
            row.appendChild(seat)
        }

        seats.appendChild(row);
    }
}

constructRoom()