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

var x = 0;
var selected_seats = [];
const reservation_name = [];
const reservation_datetime = [];

for (let i = 0; i < 5; i++)
{
    reservation_name[i] = [];
    reservation_datetime[i] = [];
    for (let j = 0; j < 5; j++)
    {
        reservation_name[i][j] = [];
        reservation_datetime[i][j] = [];
    }
}

reservation_name[0][0][0] = "EPSTEIN, J.";
reservation_datetime[0][0][0] = "9:00AM-12:00PM";

reservation_name[0][1][0] = "EPSTEIN, A.";
reservation_datetime[0][1][0] = "10:00AM-11:00AM";

reservation_name[0][3][0] = "EPSTEIN, M.";
reservation_datetime[0][3][0] = "8:00AM-9:30AM";

reservation_name[1][0][0] = "EPSTEIN, R.";
reservation_datetime[1][0][0] = "9:00AM-10:00AM";

reservation_name[1][2][0] = "EPSTEIN, L.";
reservation_datetime[1][2][0] = "3:00PM-5:00PM";

reservation_name[1][4][0] = "EPSTEIN, E.";
reservation_datetime[1][4][0] = "12:00PM-2:00PM";

reservation_name[2][1][0] = "EPSTEIN, C.";
reservation_datetime[2][1][0] = "1:00PM-2:30PM";

reservation_name[2][3][0] = "EPSTEIN, J.";
reservation_datetime[2][3][0] = "4:00PM-6:00PM";
reservation_name[3][0][0] = "EPSTEIN, B.";
reservation_datetime[3][0][0] = "7:00AM-9:00AM";

reservation_name[3][2][0] = "EPSTEIN, H.";
reservation_datetime[3][2][0] = "10:00AM-11:00AM";

reservation_name[3][4][0] = "EPSTEIN, G.";
reservation_datetime[3][4][0] = "3:00PM-5:00PM";

reservation_name[4][1][0] = "EPSTEIN, I.";
reservation_datetime[4][1][0] = "11:00AM-12:30PM";

reservation_name[4][3][0] = "EPSTEIN, Y.";
reservation_datetime[4][3][0] = "9:00AM-10:30AM";



function selectSeat() {   
    // document.getElementById("seat-label").innerHTML = `${event.currentTarget.id}`;
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
    console.log(selected_seats);

    let reservations = document.querySelector("#reserve-list");

    reservations.innerHTML = '';
    selected_seats.sort();

    for (let i = 0; i < selected_seats.length; i++)
    {
        console.log(selected_seats[i]);

        let block = document.createElement("div");

        let block_children = [];

        block_children[0] = document.createElement("p");
        block_children[0].setAttribute("class","seat-title");
        block_children[0].innerHTML="SEAT";

        block_children[1] = document.createElement("h2");
        block_children[1].innerHTML=selected_seats[i];

        block_children[2] = document.createElement("div");

        row = parseInt(selected_seats[i][0]);
        col = parseInt(selected_seats[i][1]);
        console.log("Row:"+row);
        console.log("Col:"+col);

        for (let j = 0; j < reservation_name[row][col].length; j++) {
            let r_name = document.createElement("h2");
            r_name.setAttribute("class","seat-title");
            r_name.innerHTML = reservation_name[row][col][j];
            let r_time = document.createElement("p");
            r_time.setAttribute("class","seat-title");
            r_time.innerHTML = reservation_datetime[row][col][j];

            block_children[2].appendChild(r_name);
            block_children[2].appendChild(r_time);
        }

        block.appendChild(document.createElement("br"));
        block.appendChild(document.createElement("br"));

        block.appendChild(block_children[0]);
        block.appendChild(block_children[1]);
        block.appendChild(block_children[2]);

        reservations.appendChild(block);
        
    }
}

constructRoom();
selectSeat();