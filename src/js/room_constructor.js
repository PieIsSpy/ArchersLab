var ROWS = 5;
var COLS = 5;

var selected_seats = [];
const reservation_name = [];
const reservation_datetime = [];

for (let i = 0; i < ROWS; i++)
{
    reservation_name[i] = [];
    reservation_datetime[i] = [];
    for (let j = 0; j < COLS; j++)
    {
        reservation_name[i][j] = [];
        reservation_datetime[i][j] = [];
    }
}

reservation_name[0][0][0] = "ASDF, J.";
reservation_datetime[0][0][0] = "9:00AM-12:00PM";

reservation_name[0][1][0] = "FDA, A.";
reservation_datetime[0][1][0] = "10:00AM-11:00AM";

reservation_name[0][3][0] = "QWER, M.";
reservation_datetime[0][3][0] = "8:00AM-9:30AM";

reservation_name[1][0][0] = "REQW, R.";
reservation_datetime[1][0][0] = "9:00AM-10:00AM";

reservation_name[1][2][0] = "ZXCV, L.";
reservation_datetime[1][2][0] = "3:00PM-5:00PM";

reservation_name[1][4][0] = "VCZ, E.";
reservation_datetime[1][4][0] = "12:00PM-2:00PM";

reservation_name[2][1][0] = "GHJ, C.";
reservation_datetime[2][1][0] = "1:00PM-2:30PM";

reservation_name[2][3][0] = "ERTY, J.";
reservation_datetime[2][3][0] = "4:00PM-6:00PM";
reservation_name[3][0][0] = "HGFD, B.";
reservation_datetime[3][0][0] = "7:00AM-9:00AM";

reservation_name[3][2][0] = "DFGH, H.";
reservation_datetime[3][2][0] = "10:00AM-11:00AM";

reservation_name[3][4][0] = "YUI, G.";
reservation_datetime[3][4][0] = "3:00PM-5:00PM";

reservation_name[4][1][0] = "UYRT, I.";
reservation_datetime[4][1][0] = "11:00AM-12:30PM";

reservation_name[4][3][0] = "WERT, COLS.";
reservation_datetime[4][3][0] = "9:00AM-10:30AM";

function constructRoom() {
    let seats = document.querySelector("#seat-list");

    for (let i = 0; i < ROWS; i++) {
        let row = document.createElement("div")
        row.setAttribute("class", "row")
        for (let j = 0; j < COLS; j++) {
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
    console.log("[room_constructor.js] Printing currently selected seats: "+selected_seats);

    if (selected_seats.length != 0)
    {
        selected_seats.sort();
        displayReservations(selected_seats);
    }
    else 
    {
        displayFakeReservations();
    }

}

function displayFakeReservations()
{
    let fake_selected_seats = [];
    for (let i = 0; i < ROWS; i++)
    {
        for (let j = 0; j < COLS; j++)
        {
            fake_selected_seats.push(i+""+j);
        }
    }
    displayReservations(fake_selected_seats);
	console.log("[room_constructor.js] Displaying all seats!"+selected_seats);
}

function displayReservations(arr)
{
    let reservations = document.querySelector("#reserve-list");
    reservations.innerHTML = '';

    for (let i = 0; i < arr.length; i++)
    {
    	console.log("[room_constructor.js] Displaying seat "+arr[0]+"!");

        let block = document.createElement("div");

        let block_children = [];

        block_children[0] = document.createElement("p");
        block_children[0].setAttribute("class","seat-title");
        block_children[0].innerHTML="SEAT";

        block_children[1] = document.createElement("h2");
        block_children[1].innerHTML=arr[i][0]+'-'+arr[i][1];

        block_children[2] = document.createElement("div");

        row = parseInt(arr[i][0]);
        col = parseInt(arr[i][1]);

        if (reservation_name[row][col].length == 0)
        {
            let na = document.createElement("p");
            na.innerHTML = "N/A"
            block_children[2].appendChild(na);
        }     

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

        block.appendChild(document.createElement("hr"));

        block.appendChild(block_children[0]);
        block.appendChild(block_children[1]);
        block.appendChild(block_children[2]);

        reservations.appendChild(block);

		console.log("[room_constructor.js] Displaying currently selected seats!"+selected_seats);
    }
}

constructRoom();
displayFakeReservations();