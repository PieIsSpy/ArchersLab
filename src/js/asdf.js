
var ROWS = 5;
var COLS = 5;

var selected_seats = [];
var all_seats = [];
const reservations = [];

const name = "Tee, J."

for (let i = 0; i < ROWS; i++)
{
    reservations[i] = [];
    for (let j = 0; j < COLS; j++)
        reservations[i][j] = [];
}

reservations[0][1][0]={name: "Ang, B.", date: "20260608", start_time: "1200", end_time: "1300"}
reservations[0][3][0]={name: "Omandac, K. D.", date: "20260609", start_time: "1200", end_time: "1300"}
reservations[1][0][0]={name: "Devito, D.", date: "20260610", start_time: "1200", end_time: "1300"}
reservations[1][2][0]={name: "Cena, J.", date: "20260611", start_time: "1200", end_time: "1300"}
reservations[1][4][0]={name: "Mordecai, A.", date: "20260612", start_time: "1200", end_time: "1300"}
reservations[2][1][0]={name: "Rigbi, L.", date: "20260613", start_time: "1200", end_time: "1300"}

function generateSeatList(){
    for (let i = 0; i < ROWS; i++)
        for (let j = 0; j < COLS; j++)
            all_seats.push(i+"-"+j);
}

function getDateSelection()
{
    let str = document.getElementById("select-day").value;
    return (str.slice(0,4)+str.slice(5,7)+str.slice(8));
}

function complexifyTime(time)
{
    let suffix = 'AM';
    let hour = parseInt(time.slice(0,2));
    if (hour > 11)
    {
        if (hour > 12)
        {
            hour = hour - 12;
        }
        suffix = 'PM';
    }
    return hour+":"+time.slice(2,4)+" "+suffix;
}

function simplifyTime(time)
{
    switch (time) {
        case '7:00 AM':  return '0700';
        case '7:30 AM':  return '0730';
        case '8:00 AM':  return '0800';
        case '8:30 AM':  return '0830';
        case '9:00 AM':  return '0900';
        case '9:30 AM':  return '0930';
        case '10:00 AM': return '1000';
        case '10:30 AM': return '1030';
        case '11:00 AM': return '1100';
        case '11:30 AM': return '1130';
        case '12:00 PM': return '1200';
        case '12:30 PM': return '1230';
        case '1:00 PM':  return '1300';
        case '1:30 PM':  return '1330';
        case '2:00 PM':  return '1400';
        case '2:30 PM':  return '1430';
        case '3:00 PM':  return '1500';
        case '3:30 PM':  return '1530';
        case '4:00 PM':  return '1600';
        case '4:30 PM':  return '1630';
        case '5:00 PM':  return '1700';
        case '5:30 PM':  return '1730';
        case '6:00 PM':  return '1800';
        case '6:30 PM':  return '1830';
        case '7:00 PM':  return '1900';
        case '7:30 PM':  return '1930';
    }
}

/*
Using current amount of seats, call renderReservations() based on selected seats.
None - display all
Selection - display selection
*/

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

function constructRoom() {
    // Build seats according to Rows and Cols
    let seats = document.querySelector("#seat-list");

    for (let i = 0; i < ROWS; i++) {
        let row = document.createElement("div")
        row.setAttribute("class", "row")
        for (let j = 0; j < COLS; j++) {
            let seat = document.createElement("div")
            seat.setAttribute("class", "seat");
            seat.setAttribute("id",i+"-"+j)
            seat.addEventListener("click",onSeatClick);
            row.appendChild(seat)
        }

        seats.appendChild(row);
    }

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

    renderReservations();
}

function compare(a, b)
{
    if (""+a.date+a.start_time+a.end_time < ""+b.date+b.start_time+b.end_time)
        return -1;
    if (""+a.date+a.start_time+a.end_time > ""+b.date+b.start_time+b.end_time)
        return 1;
    return 0;
}

/*
Caller to update the div. Selected seats fed to this directly updates the GUI.
*/
function renderReservations()
{
    var display = selected_seats.length == 0; 
    selected_seats.sort();

    if (display)
        arr = all_seats; 
    else 
        arr = selected_seats;

    let reservation_list = document.querySelector("#reserve-list");
    reservation_list.innerHTML = '';

    for (let i = 0; i < arr.length; i++)
    {
        row = parseInt(arr[i][0]);
        col = parseInt(arr[i][2]);

        if (!display || reservations[row][col].length != 0)
        {
            let block = document.createElement("div");

            let block_children = [];

            block_children[0] = document.createElement("p");
            block_children[0].setAttribute("class","seat-title");
            block_children[0].innerHTML="SEAT <span style=\"font-weight:bold\">"+row+" "+col+"</span>";

            if (reservations[row][col].length == 0)
                block_children[0].innerHTML="SEAT <span style=\"font-weight:bold\">"+row+" "+col+"</span>"+"<span style=\"color:#6f6053;margin-left: 10px;\">N/A</span>";

            block_children[1] = document.createElement("div");
            block_children[1].setAttribute("class", "list");
        
            for (let j = 0; j < reservations[row][col].length; j++) {
                let reservation = reservations[row][col][j];
                let r_name_header = document.createElement("h3");
                r_name_header.setAttribute("class","seat-title");
                r_name_header.innerHTML = reservation.name;
                
                let r_time_para = document.createElement("p");
                r_time_para.setAttribute("class","seat-title");
                r_time_para.innerHTML =
                complexifyTime(reservation.start_time)+
                ' - '+complexifyTime(reservation.end_time);

                let slot = document.createElement("div");
                slot.setAttribute("class", "info");

                let remove = document.createElement("button");
                remove.textContent = "Remove";
                remove.setAttribute("class","remove-reservation");
                remove.setAttribute("id","remove-"+row+"-"+col+"-"+j);
                remove.addEventListener("click",removeReservation);

                slot.appendChild(r_name_header);
                slot.appendChild(r_time_para);
                slot.appendChild(remove);

                block_children[1].appendChild(slot);
            }

            block.appendChild(document.createElement("hr"));

            block.appendChild(block_children[0]);
            block.appendChild(block_children[1]);

            reservation_list.appendChild(block);
        }
    }
}

function isOccupied(reserving,existing)
{
    if (reserving.date == existing.date)
        if (!((reserving.start_time < existing.start_time && reserving.end_time <= existing.start_time) || 
            (reserving.start_time >= existing.end_time && reserving.end_time > existing.end_time)))
            return true;
    return false;
}

function reserveSeat()
{
    let available = true;
    let reservation = {name: name, date: getDateSelection(), 
                        start_time: simplifyTime(document.getElementById("select-start-time").value),
                        end_time: simplifyTime(document.getElementById("select-end-time").value)}
    for (let i = 0; i < selected_seats.length; i++)
    {
        console.log(row+" "+col)
        row = parseInt(selected_seats[i][0]);
        col = parseInt(selected_seats[i][2]);

        for (let j = 0; j < reservations[row][col].length; j++)
            if (isOccupied(reservation,reservations[row][col][j]))
                available = false;
    }

    if (available)
    {
        console.log("Reserve");
        
        for (let i = 0; i < selected_seats.length; i++)
        {
            console.log(row+" "+col)
            row = parseInt(selected_seats[i][0]);
            col = parseInt(selected_seats[i][2]);
            reservations[row][col].push(reservation);
        }

        reservations[row][col].sort(compare)
        renderReservations();
    }
    else
        console.log("Can't reserve");
}



constructRoom();
generateSeatList();
renderReservations(); 