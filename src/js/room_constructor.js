var x = 0;
var selected_seats = [];

function constructRoom() {
    let seats = document.querySelector("#seat-list");

    var x = 5;
    var y = 5 ;

    for (let i = 0; i < x; i++) {
        let row = document.createElement("div")
        row.setAttribute("class", "row")
        for (let j = 0; j < y; j++) {
            let seat = document.createElement("div")
            seat.setAttribute("class", "seat");
            seat.setAttribute("id",i+""+j)
            seat.addEventListener("click",selectSeat);
            row.appendChild(seat)
        }

        seats.appendChild(row);
    }
}

function selectSeat() {   
    document.getElementById("seat-label").innerHTML = `${event.currentTarget.id}`;
    if (!selected_seats.includes(event.currentTarget.id))
    {
        event.currentTarget.setAttribute("class","selected-seat");
        selected_seats.push(event.currentTarget.id);
    }
    else
    {
        event.currentTarget.setAttribute("class","seat");
        selected_seats.splice(selected_seats.indexOf(event.currentTarget.id),1);
    }

}

constructRoom();
selectSeat();