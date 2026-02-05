var ROWS = 5;
var COLS = 5;

var selected_seats = [];
const reservations = [];

for (let i = 0; i < ROWS; i++)
{
    reservations[i] = [];
    for (let j = 0; j < COLS; j++)
    {
        reservations[i][j] = [];
    }
}

reservations[0][0][0]={name: "ASDF, J.", date: "20260607", start_time: "1200", end_time: "1300"}
reservations[0][1][0]={name: "ASDF, J.", date: "20260607", start_time: "1200", end_time: "1300"}
reservations[0][3][0]={name: "ASDF, J.", date: "20260607", start_time: "1200", end_time: "1300"}
reservations[1][0][0]={name: "ASDF, J.", date: "20260607", start_time: "1200", end_time: "1300"}
reservations[1][2][0]={name: "ASDF, J.", date: "20260607", start_time: "1200", end_time: "1300"}
reservations[1][4][0]={name: "ASDF, J.", date: "20260607", start_time: "1200", end_time: "1300"}
reservations[2][1][0]={name: "ASDF, J.", date: "20260607", start_time: "1200", end_time: "1300"}

function getDateSelection()
{
    let str = document.getElementById("select-day").value
    // console.log (str.slice(0,4)+str.slice(5,7)+str.slice(8));
    return (str.slice(0,4)+str.slice(5,7)+str.slice(8));
}

function getStartTimeSelection()
{
    return document.getElementById("select-start-time").value;
}

function getEndTimeSelection()
{
    return document.getElementById("select-end-time").value;
}

function constructRoom() {
    // Build seats according to Rows and Cols
    let seats = document.querySelector("#seat-list");

    for (let i = 0; i < ROWS; i++) {
        let row = document.createElement("div")
        row.setAttribute("class", "row")
        for (let j = 0; j < COLS; j++) {
            let seat = document.createElement("div")
            seat.setAttribute("class", "seat");
            seat.setAttribute("id",i+""+j)
            seat.addEventListener("click",onSeatClick);
            row.appendChild(seat)
        }

        seats.appendChild(row);
    }

    // Add listener for reserve button
    document.getElementById("reserve-btn").addEventListener("click",reserveSeat);

    console.log("[room_constructor.js] Room constructed!");
}

/*
Event handler when seats are selected. Updates the array of selected seats,
and changes the class of selected/unselected seats.
*/
function onSeatClick(event)
{
    if (selected_seats.includes(event.currentTarget.id))
    {
        event.currentTarget.setAttribute("class","seat");
        selected_seats.splice(selected_seats.indexOf(event.currentTarget.id),1);
    }
    else
    {
        event.currentTarget.setAttribute("class","selected-seat");
        selected_seats.push(event.currentTarget.id);
    }

    updateReservationState();
}

/*
Using current amount of seats, call renderReservations() based on selected seats.
None - display all
Selection - display selection
*/
function updateReservationState()
{
    if (selected_seats.length != 0)
    {
        selected_seats.sort();
        renderReservations(selected_seats);
        console.log("[room_constructor.selectSeat()] Calling renderReservations on currently selected seats: "+selected_seats);
    }
    else 
    {
        let fake_selected_seats = [];
        for (let i = 0; i < ROWS; i++)
        {
            for (let j = 0; j < COLS; j++)
            {
                fake_selected_seats.push(i+""+j);
            }
        }
        renderReservations(fake_selected_seats);
        console.log("[room_constructor.js] Displaying all seats!");
    }
}

function reserveSeat()
{
    let reservation = {name: "LORENS, J. T.", date: getDateSelection(), 
                        start_time: getStartTimeSelection(), end_time: getEndTimeSelection()};
    for (let i = 0; i < selected_seats.length; i++)
    {
        row = parseInt(selected_seats[i][0]);
        col = parseInt(selected_seats[i][1]);

        let available = true;
        for (let j = 0; j < reservations[row][col].length; j++)
        {
            if (isOccupied(reservation,reservations[row][col][j]))
            {
                available = false;
            }
        }

        if (available)
        {
            console.log("Seat is free!");
            reservations[row][col].push(reservation);
            reservations[row][col].sort(compare)
            updateReservationState();
        }
    }
}

function compare(a, b)
{
    if (""+a.date+a.start_time+a.end_time < ""+b.date+b.start_time+b.end_time)
    {
        return -1;
    }
    if (""+a.date+a.start_time+a.end_time > ""+b.date+b.start_time+b.end_time)
    {
        return 1;
    }
    return 0;
}

/*
Caller to update the div. Selected seats fed to this directly updates the GUI.
*/
function renderReservations(arr)
{
    let reservation_list = document.querySelector("#reserve-list");
    reservation_list.innerHTML = '';

    for (let i = 0; i < arr.length; i++)
    {
        row = parseInt(arr[i][0]);
        col = parseInt(arr[i][1]);

    	console.log("[room_constructor.renderReservations()] Displaying seat "+arr[0]+"!");

        let block = document.createElement("div");

        let block_children = [];

        block_children[0] = document.createElement("p");
        block_children[0].setAttribute("class","seat-title");
        block_children[0].innerHTML="SEAT";

        block_children[1] = document.createElement("h2");
        block_children[1].innerHTML=row+'-'+col;

        block_children[2] = document.createElement("div");
        block_children[2].setAttribute("class", "list");

        if (reservations[row][col].length == 0)
        {
            let N_A = document.createElement("p");
            N_A.innerHTML = "N/A"
            block_children[2].appendChild(N_A);
        }     

        for (let j = 0; j < reservations[row][col].length; j++) {
            let reservation = reservations[row][col][j];
            
            let r_name_header = document.createElement("h2");
            r_name_header.setAttribute("class","seat-title");
            r_name_header.innerHTML = reservation.name;

            let r_time_para = document.createElement("p");
            r_time_para.setAttribute("class","seat-title");
            r_time_para.innerHTML = reservation.start_time+'-'+reservation.end_time;

            let slot = document.createElement("div");
            slot.setAttribute("class", "info");

            slot.appendChild(r_name_header);
            slot.appendChild(r_time_para);

            block_children[2].appendChild(slot);
        }

        block.appendChild(document.createElement("hr"));

        block.appendChild(block_children[0]);
        block.appendChild(block_children[1]);
        block.appendChild(block_children[2]);

        reservation_list.appendChild(block);
    }

    if (document.title == "View Slot") {
        addRemoveButton();
    }
}

function addRemoveButton() {
    let infoList = document.querySelectorAll(".info");

    console.log("pinged");

    infoList.forEach(info => {
        let remove = document.createElement("button");
        remove.textContent = "Remove";
        info.appendChild(remove);
    });
}

function isOccupied(reserving,existing)
{
    if (reserving.date == existing.date)
        if (!((reserving.start_time < existing.start_time && reserving.end_time <= existing.start_time) || 
            (reserving.start_time >= existing.end_time && reserving.end_time > existing.end_time)))
        {
            console.log("[room_constructor.js] Room reservation failed! Overlappting time!");
            console.log("Slot to be acquired: "+reserving.start_time+"-"+reserving.end_time);
            console.log("Occupying slot:"+existing.start_time+"-"+existing.end_time);
            return true;
        }
    return false;
}

constructRoom();
updateReservationState(); 