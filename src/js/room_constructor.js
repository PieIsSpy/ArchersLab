function constructRoom() {
    let seats = document.querySelector("#seat-list");

    var x = 4;
    var y = 4;

    for (let i = 0; i < x; i++) {
        let row = document.createElement("div")
        row.setAttribute("class", "row")
        for (let j = 0; j < y; j++) {
            let seat = document.createElement("div")
            seat.setAttribute("class", "seat");
            row.appendChild(seat)
        }

        seats.appendChild(row);
    }
}

constructRoom();