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

function hasRemainder(looptime)
{
    if(parseInt(looptime)%100==0) 
        return 0;
    return 1;
}

function hasNoRemainder(looptime)
{
    if(parseInt(looptime)%100==0) 
        return 1;
    return 0;
}

function adjustEndTime() {
    let time = simplifyTime(document.getElementById("select-start-time").value);
    let select_end_time = document.getElementById("select-end-time");

    let options = []
    let looptime = '0700';

    select_end_time.options.length = 0;

    for (let i = 0; i < 26; i++)
    {
        let option = document.createElement("option");
        option.innerHTML = looptime;
        looptime = ('0'+String(parseInt(looptime) + 
        hasRemainder(looptime)*(100 - parseInt(looptime) % 100) +
        hasNoRemainder(looptime)*30)).slice(-4);
        // console.log(option.innerHTML);
        options.push(option);
    }

    for (let i = 0; i < 26; i++)
    {
        if (parseInt(time) < parseInt(options[i].innerHTML))
        {    
            // let new_time = document.createElement("option");
            // new_time.innerHTML = select_end_time_options[i];
            options[i].innerHTML = complexifyTime(options[i].innerHTML);
            select_end_time.appendChild(options[i]);
        }
    }
}

function getDateSelection()
{
    let str = document.getElementById("select-day").value
    // console.log (str.slice(0,4)+str.slice(5,7)+str.slice(8));
    return (str.slice(0,4)+str.slice(5,7)+str.slice(8));
}


function adjustDay() {
	selected_seats = [];
	selected_day = getDateSelection();
	adjustRoom();
	renderReservations();
}

function searchRoom(name)
{
	for (let i = 0; i < rooms.length; i++)
	{
		if (name == rooms[i].name)
		{
			return rooms[i];
		}
	}
}

function generateSeatList(room){
    for (let i = 0; i < room.rows; i++)
        for (let j = 0; j < room.cols; j++)
            all_seats.push(i+"-"+j);
}

function adjustRoom()
{
	selected_room = searchRoom(document.getElementById("select-room").value);
	selected_seats = [];

	generateSeatList(selected_room);

    // Build seats according to Rows and Cols
    let seats = document.querySelector("#seat-list");
	seats.innerHTML = "";

    for (let i = 0; i < selected_room.rows; i++)
	{
        let row = document.createElement("div")
        row.setAttribute("class", "row")

        for (let j = 0; j < selected_room.cols; j++)
		{
            let seat = document.createElement("div")
            seat.setAttribute("class", "seat");
            seat.setAttribute("id",i+"-"+j)
            seat.addEventListener("click",onSeatClick);
            row.appendChild(seat)
        }

        seats.appendChild(row);
	}
    renderReservations();
}

function constructRoom() {

	adjustRoom();

    document.getElementById("reserve-btn").addEventListener("click",reserveSeat);
    document.getElementById("error-reserve").addEventListener("click",reserveSeat);

    document.getElementById("error-ok").addEventListener("click",hideError);

    document.getElementById("select-start-time").addEventListener("change",adjustEndTime);
    document.getElementById("select-day").addEventListener("change",adjustDay);
	document.getElementById("select-room").addEventListener("change",adjustRoom);

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
    let view_user = (selected_seats.length == 0);
    selected_seats.sort();

    if (view_user)
    {
        arr = all_seats;
        document.getElementById("confirmed-text").innerHTML = "YOUR CURRENT RESERVATIONS";
    }    
    else 
    {
        arr = selected_seats;
        document.getElementById("confirmed-text").innerHTML = "CONFIRMED RESERVATIONS";
    }

    let reservation_list = document.querySelector("#reserve-list");
    reservation_list.innerHTML = '';

	let na_block = document.createElement("div"); // Block for all N/As

	let naaaa_text = document.createElement("p");
	naaaa_text.innerHTML = "<span style=\"color:#6f6053;font-weight:bold;\">N/A</span>"

	na_block.appendChild(naaaa_text);

    for (let i = 0; i < arr.length; i++)
    {
        row = parseInt(arr[i][0]);
        col = parseInt(arr[i][2]);

		reservations = selected_room.reservations[row][col];

        let render = false;

        if ((reservations.length != 0 && view_user) || !view_user)
        {
            if (view_user)
                for (let j = 0; j < reservations.length; j++)
                    if (reservations[j].name == name && reservations[j].date == getDateSelection())
					{
						// console.log(reservations[j].name +" "+ name);
						// console.log(reservations[j].date +" "+ getDateSelection());
						render = true;
                        break;
					}

            if (!view_user || render)
            {
                let block = document.createElement("div");

                let block_children = [];

                block_children[0] = document.createElement("p");
                block_children[0].setAttribute("class","seat-title");

                block_children[1] = document.createElement("div");
                block_children[1].setAttribute("class", "list");
                let na=true;
				console.log("Showing reservations:");
                for (let j = 0; j < reservations.length; j++)
				{
					console.log(reservations[j].name);
                    if (((view_user && reservations[j].name == name) || (!view_user))&& reservations[j].date == getDateSelection())
                    {
						// console.log(reservations[j].date+"=="+getDateSelection());
                        let profile_div = document.createElement("div");
                        let img = document.createElement("img");

                        profile_div.className = "profile-div"

                        let img_link = document.createElement("a")
                        img_link.setAttribute("href", "other_profile.html");
                        
                        img.className = "mini-profile"
                        img.setAttribute("src", "./img/profile_icon.png");

                        img_link.appendChild(img)

                        let r_name_header = document.createElement("h3");
                        let profile_link = document.createElement("a");

                        profile_link.setAttribute("href", "other_profile.html");
                        profile_link.innerHTML = reservations[j].name;

                        r_name_header.setAttribute("class","seat-title");
                        r_name_header.appendChild(profile_link);

                        profile_div.appendChild(r_name_header);
                        profile_div.appendChild(img_link);

                        if (reservations[j].name == name)
                            r_name_header.innerHTML = "<span style=\"color:#FFFFFF;background-color:#006341;\">"+reservations[j].name+"</span>";

                        let r_time_para = document.createElement("p");
                        r_time_para.setAttribute("class","seat-title");
                        r_time_para.innerHTML =
                        complexifyTime(reservations[j].start_time)+
                        ' - '+complexifyTime(reservations[j].end_time);

                        let slot = document.createElement("div");
                        slot.setAttribute("class", "info");

                        slot.appendChild(profile_div);
                        slot.appendChild(r_time_para);

                        block_children[1].appendChild(slot);
						na=false;
                    }
                }


				if (na)
				{
					let p = document.createElement("p");
                    p.setAttribute("class", "seat-title");
					p.innerHTML="SEAT <span style=\"font-weight:bold\">"+row+" "+col+"</span>";
					na_block.appendChild(p);
				}	
				else {
					block.appendChild(document.createElement("hr"));
                	block_children[0].innerHTML="SEAT <span style=\"font-weight:bold\">"+row+" "+col+"</span>";
					block.appendChild(block_children[0]);
					block.appendChild(block_children[1]);
                	reservation_list.appendChild(block);
				}
            }
        }
    }

	reservation_list.appendChild(document.createElement("hr"));
	
	if (na_block.children.length > 0)
	{
		reservation_list.appendChild(na_block);
	}
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

function reserveSeat(event)
{
    let veto = event.currentTarget.id == "error-reserve";

    let unavailable_seats = [];
    let available = true;
    let reservation = {name: name, date: getDateSelection(), 
                        start_time: simplifyTime(document.getElementById("select-start-time").value),
                        end_time: simplifyTime(document.getElementById("select-end-time").value)}
    for (let i = 0; i < selected_seats.length; i++)
    {
        row = parseInt(selected_seats[i][0]);
        col = parseInt(selected_seats[i][2]);
		
		existing_reservations = selected_room.reservations[row][col];

        for (let j = 0; j < existing_reservations.length; j++)
            if (isOccupied(reservation,existing_reservations[j]))
            {
                available = false;
                unavailable_seats.push(" SEAT "+row+"-"+col);
            }
    }

    if (available || veto)
    {
        console.log("Reserving reservation "+reservation);
        
        for (let i = 0; i < selected_seats.length; i++)
        {
            row = parseInt(selected_seats[i][0]);
            col = parseInt(selected_seats[i][2]);
			
			existing_reservations = selected_room.reservations[row][col];
            
            for (let j = 0; j < existing_reservations.length; j++)
                if (existing_reservations[j].name == name && isOccupied(reservation,existing_reservations[j]))
				{
					available = false;
				}
			
            if (available)
            {
                existing_reservations.push(reservation);
                existing_reservations.sort(compare)
            }
			else
				available = true;
        }

		console.log(existing_reservations);

        renderReservations();
    }
    else
    {
        document.getElementById("error-msg").innerHTML=
        "Can't reserve. Existing conflicts in these seats: "+unavailable_seats;
        displayError();
    }
}

function displayError() {
    let modal = document.querySelector(".error-bg");
    modal.style.display = "block";
}

function hideError() {
    let modal = document.querySelector(".error-bg");
    modal.style.display = "none";
}

const name = "Tee, J.";

var selected_seats = [];
var all_seats = [];
var selected_room;
var selected_day;

const rooms = [];

rooms[0] = {
	name: "GK201",
	reservations: [],
	rows: 5,
	cols: 5
}

rooms[1] = {
	name: "GK301",
	reservations: [],
	rows: 7,
	cols: 5
}

rooms[2] = {
	name: "GK302",
	reservations: [],
	rows: 10,
	cols: 4
}

rooms[3] = {
	name: "GK306",
	reservations: [],
	rows: 4,
	cols: 8
}

rooms[4] = {
	name: "GK401",
	reservations: [],
	rows: 5,
	cols: 6
}

rooms[5] = {
	name: "GK403",
	reservations: [],
	rows: 7,
	cols: 9
}

for (let h = 0; h < rooms.length; h++)
{
	for (let i = 0; i < rooms[h].rows; i++)
	{
		rooms[h].reservations[i] = [];
		for (let j = 0; j < rooms[h].cols; j++)
			rooms[h].reservations[i][j] = [];
	}
}

rooms[0].reservations[1][2][0]={name: "Tan, J.", date: "20260216", start_time: "0700", end_time: "0800"}
rooms[0].reservations[3][1][0]={name: "Lim, A.", date: "20260216", start_time: "0900", end_time: "1000"}
rooms[0].reservations[0][4][0]={name: "Dy, M.", date: "20260216", start_time: "1400", end_time: "1500"}
rooms[0].reservations[2][2][0]={name: "Sy, K.", date: "20260216", start_time: "1000", end_time: "1100"}
rooms[0].reservations[4][0][0]={name: "Ang, L.", date: "20260216", start_time: "1600", end_time: "1700"}
rooms[0].reservations[1][3][0]={name: "Go, R.", date: "20260216", start_time: "0800", end_time: "0900"}
rooms[0].reservations[0][0][0]={name: "Chua, B.", date: "20260216", start_time: "1100", end_time: "1200"}
rooms[0].reservations[3][4][0]={name: "Yap, S.", date: "20260216", start_time: "1300", end_time: "1400"}
rooms[0].reservations[2][0][0]={name: "Chen, T.", date: "20260217", start_time: "0700", end_time: "0830"}
rooms[0].reservations[0][1][0]={name: "Lee, D.", date: "20260217", start_time: "0900", end_time: "1000"}
rooms[0].reservations[4][2][0]={name: "Cruz, J.", date: "20260217", start_time: "1500", end_time: "1600"}
rooms[0].reservations[1][1][0]={name: "Santos, M.", date: "20260217", start_time: "1030", end_time: "1130"}
rooms[0].reservations[3][0][0]={name: "Reyes, A.", date: "20260217", start_time: "1200", end_time: "1300"}
rooms[0].reservations[2][4][0]={name: "Garcia, P.", date: "20260217", start_time: "1400", end_time: "1500"}
rooms[0].reservations[0][3][0]={name: "Torres, L.", date: "20260217", start_time: "1600", end_time: "1700"}
rooms[0].reservations[4][4][0]={name: "Lopez, K.", date: "20260217", start_time: "1700", end_time: "1800"}
rooms[0].reservations[1][0][0]={name: "Gonzales, H.", date: "20260218", start_time: "0800", end_time: "0900"}
rooms[0].reservations[3][3][0]={name: "Ong, C.", date: "20260218", start_time: "1000", end_time: "1100"}
rooms[0].reservations[0][2][0]={name: "Co, E.", date: "20260218", start_time: "1300", end_time: "1400"}
rooms[0].reservations[2][1][0]={name: "Sison, F.", date: "20260218", start_time: "0900", end_time: "1000"}
rooms[0].reservations[4][3][0]={name: "Tan, J.", date: "20260218", start_time: "1500", end_time: "1600"}
rooms[0].reservations[1][4][0]={name: "Lim, A.", date: "20260218", start_time: "1100", end_time: "1200"}
rooms[0].reservations[3][2][0]={name: "Dy, M.", date: "20260218", start_time: "1400", end_time: "1500"}
rooms[0].reservations[2][3][0]={name: "Sy, K.", date: "20260218", start_time: "1600", end_time: "1700"}
rooms[0].reservations[0][1][1]={name: "Ang, L.", date: "20260219", start_time: "0700", end_time: "0800"}
rooms[0].reservations[4][1][0]={name: "Go, R.", date: "20260219", start_time: "0930", end_time: "1030"}
rooms[0].reservations[1][2][1]={name: "Chua, B.", date: "20260219", start_time: "1200", end_time: "1300"}
rooms[0].reservations[3][4][1]={name: "Yap, S.", date: "20260219", start_time: "1400", end_time: "1500"}
rooms[0].reservations[2][0][1]={name: "Chen, T.", date: "20260219", start_time: "1000", end_time: "1100"}
rooms[0].reservations[0][4][1]={name: "Lee, D.", date: "20260219", start_time: "1500", end_time: "1600"}
rooms[0].reservations[4][0][1]={name: "Cruz, J.", date: "20260219", start_time: "1700", end_time: "1800"}
rooms[0].reservations[2][2][1]={name: "Santos, M.", date: "20260219", start_time: "1300", end_time: "1400"}
rooms[0].reservations[1][3][1]={name: "Reyes, A.", date: "20260220", start_time: "0800", end_time: "0900"}
rooms[0].reservations[3][1][1]={name: "Garcia, P.", date: "20260220", start_time: "1000", end_time: "1100"}
rooms[0].reservations[0][0][1]={name: "Torres, L.", date: "20260220", start_time: "1100", end_time: "1200"}
rooms[0].reservations[2][4][1]={name: "Lopez, K.", date: "20260220", start_time: "1300", end_time: "1400"}
rooms[0].reservations[4][2][1]={name: "Gonzales, H.", date: "20260220", start_time: "1500", end_time: "1600"}
rooms[0].reservations[1][1][1]={name: "Ong, C.", date: "20260220", start_time: "1600", end_time: "1700"}
rooms[0].reservations[3][0][1]={name: "Co, E.", date: "20260220", start_time: "0900", end_time: "1000"}
rooms[0].reservations[2][3][1]={name: "Sison, F.", date: "20260220", start_time: "1400", end_time: "1500"}
rooms[1].reservations[2][3][0]={name: "Tan, J.", date: "20260216", start_time: "0700", end_time: "0800"}
rooms[1].reservations[5][1][0]={name: "Lim, A.", date: "20260216", start_time: "0900", end_time: "1000"}
rooms[1].reservations[0][4][0]={name: "Dy, M.", date: "20260216", start_time: "1100", end_time: "1200"}
rooms[1].reservations[4][2][0]={name: "Sy, K.", date: "20260216", start_time: "1300", end_time: "1400"}
rooms[1].reservations[6][0][0]={name: "Ang, L.", date: "20260216", start_time: "1500", end_time: "1600"}
rooms[1].reservations[1][3][0]={name: "Go, R.", date: "20260216", start_time: "1700", end_time: "1800"}
rooms[1].reservations[3][0][0]={name: "Chua, B.", date: "20260216", start_time: "0800", end_time: "0900"}
rooms[1].reservations[2][1][0]={name: "Yap, S.", date: "20260216", start_time: "1000", end_time: "1100"}
rooms[1].reservations[5][4][0]={name: "Chen, T.", date: "20260217", start_time: "0730", end_time: "0830"}
rooms[1].reservations[0][2][0]={name: "Lee, D.", date: "20260217", start_time: "0930", end_time: "1030"}
rooms[1].reservations[4][3][0]={name: "Cruz, J.", date: "20260217", start_time: "1200", end_time: "1300"}
rooms[1].reservations[6][1][0]={name: "Santos, M.", date: "20260217", start_time: "1400", end_time: "1500"}
rooms[1].reservations[1][0][0]={name: "Reyes, A.", date: "20260217", start_time: "1600", end_time: "1700"}
rooms[1].reservations[3][4][0]={name: "Garcia, P.", date: "20260217", start_time: "1000", end_time: "1100"}
rooms[1].reservations[2][0][0]={name: "Torres, L.", date: "20260217", start_time: "1300", end_time: "1400"}
rooms[1].reservations[5][2][0]={name: "Lopez, K.", date: "20260217", start_time: "1500", end_time: "1600"}
rooms[1].reservations[0][3][0]={name: "Gonzales, H.", date: "20260218", start_time: "0800", end_time: "0900"}
rooms[1].reservations[4][1][0]={name: "Ong, C.", date: "20260218", start_time: "1000", end_time: "1100"}
rooms[1].reservations[6][4][0]={name: "Co, E.", date: "20260218", start_time: "1200", end_time: "1300"}
rooms[1].reservations[1][2][0]={name: "Sison, F.", date: "20260218", start_time: "1400", end_time: "1500"}
rooms[1].reservations[3][3][0]={name: "Tan, J.", date: "20260218", start_time: "1600", end_time: "1700"}
rooms[1].reservations[2][4][0]={name: "Lim, A.", date: "20260218", start_time: "0900", end_time: "1000"}
rooms[1].reservations[5][0][0]={name: "Dy, M.", date: "20260218", start_time: "1100", end_time: "1200"}
rooms[1].reservations[0][1][0]={name: "Sy, K.", date: "20260218", start_time: "1300", end_time: "1400"}
rooms[1].reservations[4][0][0]={name: "Ang, L.", date: "20260219", start_time: "0700", end_time: "0800"}
rooms[1].reservations[6][3][0]={name: "Go, R.", date: "20260219", start_time: "0900", end_time: "1000"}
rooms[1].reservations[1][1][0]={name: "Chua, B.", date: "20260219", start_time: "1100", end_time: "1200"}
rooms[1].reservations[3][2][0]={name: "Yap, S.", date: "20260219", start_time: "1300", end_time: "1400"}
rooms[1].reservations[2][2][0]={name: "Chen, T.", date: "20260219", start_time: "1500", end_time: "1600"}
rooms[1].reservations[5][3][0]={name: "Lee, D.", date: "20260219", start_time: "1700", end_time: "1800"}
rooms[1].reservations[0][0][0]={name: "Cruz, J.", date: "20260219", start_time: "1000", end_time: "1100"}
rooms[1].reservations[4][4][0]={name: "Santos, M.", date: "20260219", start_time: "1200", end_time: "1300"}
rooms[1].reservations[6][2][0]={name: "Reyes, A.", date: "20260220", start_time: "0800", end_time: "0900"}
rooms[1].reservations[1][4][0]={name: "Garcia, P.", date: "20260220", start_time: "1000", end_time: "1100"}
rooms[1].reservations[3][1][0]={name: "Torres, L.", date: "20260220", start_time: "1200", end_time: "1300"}
rooms[1].reservations[2][4][0]={name: "Lopez, K.", date: "20260220", start_time: "1400", end_time: "1500"}
rooms[1].reservations[5][4][1]={name: "Gonzales, H.", date: "20260220", start_time: "1600", end_time: "1700"}
rooms[1].reservations[0][4][1]={name: "Ong, C.", date: "20260220", start_time: "0900", end_time: "1000"}
rooms[1].reservations[4][0][1]={name: "Co, E.", date: "20260220", start_time: "1100", end_time: "1200"}
rooms[1].reservations[6][0][1]={name: "Sison, F.", date: "20260220", start_time: "1300", end_time: "1400"}
rooms[2].reservations[3][2][0]={name: "Tan, J.", date: "20260216", start_time: "0700", end_time: "0800"}
rooms[2].reservations[8][1][0]={name: "Lim, A.", date: "20260216", start_time: "0900", end_time: "1000"}
rooms[2].reservations[1][3][0]={name: "Dy, M.", date: "20260216", start_time: "1100", end_time: "1200"}
rooms[2].reservations[6][0][0]={name: "Sy, K.", date: "20260216", start_time: "1300", end_time: "1400"}
rooms[2].reservations[0][2][0]={name: "Ang, L.", date: "20260216", start_time: "1500", end_time: "1600"}
rooms[2].reservations[9][3][0]={name: "Go, R.", date: "20260216", start_time: "1700", end_time: "1800"}
rooms[2].reservations[4][1][0]={name: "Chua, B.", date: "20260216", start_time: "1000", end_time: "1100"}
rooms[2].reservations[7][2][0]={name: "Yap, S.", date: "20260216", start_time: "1200", end_time: "1300"}
rooms[2].reservations[2][0][0]={name: "Chen, T.", date: "20260217", start_time: "0700", end_time: "0830"}
rooms[2].reservations[5][3][0]={name: "Lee, D.", date: "20260217", start_time: "0900", end_time: "1000"}
rooms[2].reservations[3][1][0]={name: "Cruz, J.", date: "20260217", start_time: "1100", end_time: "1200"}
rooms[2].reservations[8][2][0]={name: "Santos, M.", date: "20260217", start_time: "1300", end_time: "1400"}
rooms[2].reservations[1][0][0]={name: "Reyes, A.", date: "20260217", start_time: "1500", end_time: "1600"}
rooms[2].reservations[6][3][0]={name: "Garcia, P.", date: "20260217", start_time: "1700", end_time: "1800"}
rooms[2].reservations[0][1][0]={name: "Torres, L.", date: "20260217", start_time: "1400", end_time: "1500"}
rooms[2].reservations[9][0][0]={name: "Lopez, K.", date: "20260217", start_time: "0800", end_time: "0900"}
rooms[2].reservations[4][2][0]={name: "Gonzales, H.", date: "20260218", start_time: "0800", end_time: "0900"}
rooms[2].reservations[7][1][0]={name: "Ong, C.", date: "20260218", start_time: "1000", end_time: "1100"}
rooms[2].reservations[2][3][0]={name: "Co, E.", date: "20260218", start_time: "1200", end_time: "1300"}
rooms[2].reservations[5][0][0]={name: "Sison, F.", date: "20260218", start_time: "1400", end_time: "1500"}
rooms[2].reservations[3][0][0]={name: "Tan, J.", date: "20260218", start_time: "1600", end_time: "1700"}
rooms[2].reservations[8][3][0]={name: "Lim, A.", date: "20260218", start_time: "1100", end_time: "1200"}
rooms[2].reservations[1][2][0]={name: "Dy, M.", date: "20260218", start_time: "0900", end_time: "1000"}
rooms[2].reservations[6][1][0]={name: "Sy, K.", date: "20260218", start_time: "1300", end_time: "1400"}
rooms[2].reservations[0][0][0]={name: "Ang, L.", date: "20260219", start_time: "0700", end_time: "0800"}
rooms[2].reservations[9][1][0]={name: "Go, R.", date: "20260219", start_time: "0930", end_time: "1030"}
rooms[2].reservations[4][3][0]={name: "Chua, B.", date: "20260219", start_time: "1200", end_time: "1300"}
rooms[2].reservations[7][0][0]={name: "Yap, S.", date: "20260219", start_time: "1400", end_time: "1500"}
rooms[2].reservations[2][2][0]={name: "Chen, T.", date: "20260219", start_time: "1600", end_time: "1700"}
rooms[2].reservations[5][1][0]={name: "Lee, D.", date: "20260219", start_time: "1000", end_time: "1100"}
rooms[2].reservations[3][3][0]={name: "Cruz, J.", date: "20260219", start_time: "1300", end_time: "1400"}
rooms[2].reservations[8][0][0]={name: "Santos, M.", date: "20260219", start_time: "1500", end_time: "1600"}
rooms[2].reservations[1][1][0]={name: "Reyes, A.", date: "20260220", start_time: "0800", end_time: "0900"}
rooms[2].reservations[6][2][0]={name: "Garcia, P.", date: "20260220", start_time: "1000", end_time: "1100"}
rooms[2].reservations[0][3][0]={name: "Torres, L.", date: "20260220", start_time: "1200", end_time: "1300"}
rooms[2].reservations[9][2][0]={name: "Lopez, K.", date: "20260220", start_time: "1400", end_time: "1500"}
rooms[2].reservations[4][0][0]={name: "Gonzales, H.", date: "20260220", start_time: "1600", end_time: "1700"}
rooms[2].reservations[7][3][0]={name: "Ong, C.", date: "20260220", start_time: "0900", end_time: "1000"}
rooms[2].reservations[2][1][0]={name: "Co, E.", date: "20260220", start_time: "1100", end_time: "1200"}
rooms[2].reservations[5][2][0]={name: "Sison, F.", date: "20260220", start_time: "1300", end_time: "1400"}
rooms[3].reservations[1][4][0]={name: "Tan, J.", date: "20260216", start_time: "0700", end_time: "0800"}
rooms[3].reservations[3][2][0]={name: "Lim, A.", date: "20260216", start_time: "0900", end_time: "1000"}
rooms[3].reservations[0][6][0]={name: "Dy, M.", date: "20260216", start_time: "1100", end_time: "1200"}
rooms[3].reservations[2][3][0]={name: "Sy, K.", date: "20260216", start_time: "1300", end_time: "1400"}
rooms[3].reservations[1][0][0]={name: "Ang, L.", date: "20260216", start_time: "1500", end_time: "1600"}
rooms[3].reservations[3][7][0]={name: "Go, R.", date: "20260216", start_time: "1700", end_time: "1800"}
rooms[3].reservations[0][1][0]={name: "Chua, B.", date: "20260216", start_time: "0800", end_time: "0900"}
rooms[3].reservations[2][5][0]={name: "Yap, S.", date: "20260216", start_time: "1000", end_time: "1100"}
rooms[3].reservations[1][6][0]={name: "Chen, T.", date: "20260217", start_time: "0730", end_time: "0830"}
rooms[3].reservations[3][0][0]={name: "Lee, D.", date: "20260217", start_time: "0930", end_time: "1030"}
rooms[3].reservations[0][4][0]={name: "Cruz, J.", date: "20260217", start_time: "1200", end_time: "1300"}
rooms[3].reservations[2][2][0]={name: "Santos, M.", date: "20260217", start_time: "1400", end_time: "1500"}
rooms[3].reservations[1][7][0]={name: "Reyes, A.", date: "20260217", start_time: "1600", end_time: "1700"}
rooms[3].reservations[3][3][0]={name: "Garcia, P.", date: "20260217", start_time: "1000", end_time: "1100"}
rooms[3].reservations[0][0][0]={name: "Torres, L.", date: "20260217", start_time: "1300", end_time: "1400"}
rooms[3].reservations[2][6][0]={name: "Lopez, K.", date: "20260217", start_time: "1500", end_time: "1600"}
rooms[3].reservations[1][2][0]={name: "Gonzales, H.", date: "20260218", start_time: "0800", end_time: "0900"}
rooms[3].reservations[3][5][0]={name: "Ong, C.", date: "20260218", start_time: "1000", end_time: "1100"}
rooms[3].reservations[0][3][0]={name: "Co, E.", date: "20260218", start_time: "1200", end_time: "1300"}
rooms[3].reservations[2][0][0]={name: "Sison, F.", date: "20260218", start_time: "1400", end_time: "1500"}
rooms[3].reservations[1][5][0]={name: "Tan, J.", date: "20260218", start_time: "1600", end_time: "1700"}
rooms[3].reservations[3][1][0]={name: "Lim, A.", date: "20260218", start_time: "0900", end_time: "1000"}
rooms[3].reservations[0][7][0]={name: "Dy, M.", date: "20260218", start_time: "1100", end_time: "1200"}
rooms[3].reservations[2][4][0]={name: "Sy, K.", date: "20260218", start_time: "1300", end_time: "1400"}
rooms[3].reservations[1][1][0]={name: "Ang, L.", date: "20260219", start_time: "0700", end_time: "0800"}
rooms[3].reservations[3][4][0]={name: "Go, R.", date: "20260219", start_time: "0900", end_time: "1000"}
rooms[3].reservations[0][2][0]={name: "Chua, B.", date: "20260219", start_time: "1100", end_time: "1200"}
rooms[3].reservations[2][7][0]={name: "Yap, S.", date: "20260219", start_time: "1300", end_time: "1400"}
rooms[3].reservations[1][3][0]={name: "Chen, T.", date: "20260219", start_time: "1500", end_time: "1600"}
rooms[3].reservations[3][6][0]={name: "Lee, D.", date: "20260219", start_time: "1700", end_time: "1800"}
rooms[3].reservations[0][5][0]={name: "Cruz, J.", date: "20260219", start_time: "1000", end_time: "1100"}
rooms[3].reservations[2][1][0]={name: "Santos, M.", date: "20260219", start_time: "1200", end_time: "1300"}
rooms[3].reservations[1][6][1]={name: "Reyes, A.", date: "20260220", start_time: "0800", end_time: "0900"}
rooms[3].reservations[3][0][1]={name: "Garcia, P.", date: "20260220", start_time: "1000", end_time: "1100"}
rooms[3].reservations[0][1][1]={name: "Torres, L.", date: "20260220", start_time: "1200", end_time: "1300"}
rooms[3].reservations[2][3][1]={name: "Lopez, K.", date: "20260220", start_time: "1400", end_time: "1500"}
rooms[3].reservations[1][0][1]={name: "Gonzales, H.", date: "20260220", start_time: "1600", end_time: "1700"}
rooms[3].reservations[3][7][1]={name: "Ong, C.", date: "20260220", start_time: "0900", end_time: "1000"}
rooms[3].reservations[0][6][1]={name: "Co, E.", date: "20260220", start_time: "1100", end_time: "1200"}
rooms[3].reservations[2][2][1]={name: "Sison, F.", date: "20260220", start_time: "1300", end_time: "1400"}
rooms[4].reservations[2][3][0]={name: "Tan, J.", date: "20260216", start_time: "0700", end_time: "0800"}
rooms[4].reservations[0][1][0]={name: "Lim, A.", date: "20260216", start_time: "0900", end_time: "1000"}
rooms[4].reservations[4][5][0]={name: "Dy, M.", date: "20260216", start_time: "1100", end_time: "1200"}
rooms[4].reservations[1][2][0]={name: "Sy, K.", date: "20260216", start_time: "1300", end_time: "1400"}
rooms[4].reservations[3][4][0]={name: "Ang, L.", date: "20260216", start_time: "1500", end_time: "1600"}
rooms[4].reservations[2][0][0]={name: "Go, R.", date: "20260216", start_time: "1700", end_time: "1800"}
rooms[4].reservations[0][3][0]={name: "Chua, B.", date: "20260216", start_time: "0800", end_time: "0900"}
rooms[4].reservations[4][1][0]={name: "Yap, S.", date: "20260216", start_time: "1000", end_time: "1100"}
rooms[4].reservations[1][4][0]={name: "Chen, T.", date: "20260217", start_time: "0730", end_time: "0830"}
rooms[4].reservations[3][2][0]={name: "Lee, D.", date: "20260217", start_time: "0930", end_time: "1030"}
rooms[4].reservations[2][5][0]={name: "Cruz, J.", date: "20260217", start_time: "1200", end_time: "1300"}
rooms[4].reservations[0][0][0]={name: "Santos, M.", date: "20260217", start_time: "1400", end_time: "1500"}
rooms[4].reservations[4][3][0]={name: "Reyes, A.", date: "20260217", start_time: "1600", end_time: "1700"}
rooms[4].reservations[1][1][0]={name: "Garcia, P.", date: "20260217", start_time: "1000", end_time: "1100"}
rooms[4].reservations[3][5][0]={name: "Torres, L.", date: "20260217", start_time: "1300", end_time: "1400"}
rooms[4].reservations[2][2][0]={name: "Lopez, K.", date: "20260217", start_time: "1500", end_time: "1600"}
rooms[4].reservations[0][4][0]={name: "Gonzales, H.", date: "20260218", start_time: "0800", end_time: "0900"}
rooms[4].reservations[4][0][0]={name: "Ong, C.", date: "20260218", start_time: "1000", end_time: "1100"}
rooms[4].reservations[1][3][0]={name: "Co, E.", date: "20260218", start_time: "1200", end_time: "1300"}
rooms[4].reservations[3][1][0]={name: "Sison, F.", date: "20260218", start_time: "1400", end_time: "1500"}
rooms[4].reservations[2][4][0]={name: "Tan, J.", date: "20260218", start_time: "1600", end_time: "1700"}
rooms[4].reservations[0][2][0]={name: "Lim, A.", date: "20260218", start_time: "0900", end_time: "1000"}
rooms[4].reservations[4][4][0]={name: "Dy, M.", date: "20260218", start_time: "1100", end_time: "1200"}
rooms[4].reservations[1][5][0]={name: "Sy, K.", date: "20260218", start_time: "1300", end_time: "1400"}
rooms[4].reservations[3][0][0]={name: "Ang, L.", date: "20260219", start_time: "0700", end_time: "0800"}
rooms[4].reservations[2][1][0]={name: "Go, R.", date: "20260219", start_time: "0900", end_time: "1000"}
rooms[4].reservations[0][5][0]={name: "Chua, B.", date: "20260219", start_time: "1100", end_time: "1200"}
rooms[4].reservations[4][2][0]={name: "Yap, S.", date: "20260219", start_time: "1300", end_time: "1400"}
rooms[4].reservations[1][0][0]={name: "Chen, T.", date: "20260219", start_time: "1500", end_time: "1600"}
rooms[4].reservations[3][3][0]={name: "Lee, D.", date: "20260219", start_time: "1700", end_time: "1800"}
rooms[4].reservations[2][5][1]={name: "Cruz, J.", date: "20260219", start_time: "1000", end_time: "1100"}
rooms[4].reservations[0][0][1]={name: "Santos, M.", date: "20260219", start_time: "1200", end_time: "1300"}
rooms[4].reservations[4][1][1]={name: "Reyes, A.", date: "20260220", start_time: "0800", end_time: "0900"}
rooms[4].reservations[1][2][1]={name: "Garcia, P.", date: "20260220", start_time: "1000", end_time: "1100"}
rooms[4].reservations[3][4][1]={name: "Torres, L.", date: "20260220", start_time: "1200", end_time: "1300"}
rooms[4].reservations[2][0][1]={name: "Lopez, K.", date: "20260220", start_time: "1400", end_time: "1500"}
rooms[4].reservations[0][3][1]={name: "Gonzales, H.", date: "20260220", start_time: "1600", end_time: "1700"}
rooms[4].reservations[4][5][1]={name: "Ong, C.", date: "20260220", start_time: "0900", end_time: "1000"}
rooms[4].reservations[1][4][1]={name: "Co, E.", date: "20260220", start_time: "1100", end_time: "1200"}
rooms[4].reservations[3][2][1]={name: "Sison, F.", date: "20260220", start_time: "1300", end_time: "1400"}
rooms[5].reservations[3][4][0]={name: "Tan, J.", date: "20260216", start_time: "0700", end_time: "0800"}
rooms[5].reservations[1][7][0]={name: "Lim, A.", date: "20260216", start_time: "0900", end_time: "1000"}
rooms[5].reservations[5][2][0]={name: "Dy, M.", date: "20260216", start_time: "1100", end_time: "1200"}
rooms[5].reservations[0][8][0]={name: "Sy, K.", date: "20260216", start_time: "1300", end_time: "1400"}
rooms[5].reservations[6][0][0]={name: "Ang, L.", date: "20260216", start_time: "1500", end_time: "1600"}
rooms[5].reservations[2][5][0]={name: "Go, R.", date: "20260216", start_time: "1700", end_time: "1800"}
rooms[5].reservations[4][3][0]={name: "Chua, B.", date: "20260216", start_time: "0800", end_time: "0900"}
rooms[5].reservations[1][1][0]={name: "Yap, S.", date: "20260216", start_time: "1000", end_time: "1100"}
rooms[5].reservations[3][6][0]={name: "Chen, T.", date: "20260217", start_time: "0730", end_time: "0830"}
rooms[5].reservations[0][4][0]={name: "Lee, D.", date: "20260217", start_time: "0930", end_time: "1030"}
rooms[5].reservations[5][8][0]={name: "Cruz, J.", date: "20260217", start_time: "1200", end_time: "1300"}
rooms[5].reservations[2][2][0]={name: "Santos, M.", date: "20260217", start_time: "1400", end_time: "1500"}
rooms[5].reservations[6][7][0]={name: "Reyes, A.", date: "20260217", start_time: "1600", end_time: "1700"}
rooms[5].reservations[4][5][0]={name: "Garcia, P.", date: "20260217", start_time: "1000", end_time: "1100"}
rooms[5].reservations[1][3][0]={name: "Torres, L.", date: "20260217", start_time: "1300", end_time: "1400"}
rooms[5].reservations[3][0][0]={name: "Lopez, K.", date: "20260217", start_time: "1500", end_time: "1600"}
rooms[5].reservations[0][6][0]={name: "Gonzales, H.", date: "20260218", start_time: "0800", end_time: "0900"}
rooms[5].reservations[5][1][0]={name: "Ong, C.", date: "20260218", start_time: "1000", end_time: "1100"}
rooms[5].reservations[2][8][0]={name: "Co, E.", date: "20260218", start_time: "1200", end_time: "1300"}
rooms[5].reservations[6][4][0]={name: "Sison, F.", date: "20260218", start_time: "1400", end_time: "1500"}
rooms[5].reservations[4][2][0]={name: "Tan, J.", date: "20260218", start_time: "1600", end_time: "1700"}
rooms[5].reservations[1][5][0]={name: "Lim, A.", date: "20260218", start_time: "0900", end_time: "1000"}
rooms[5].reservations[3][7][0]={name: "Dy, M.", date: "20260218", start_time: "1100", end_time: "1200"}
rooms[5].reservations[0][0][0]={name: "Sy, K.", date: "20260218", start_time: "1300", end_time: "1400"}
rooms[5].reservations[5][3][0]={name: "Ang, L.", date: "20260219", start_time: "0700", end_time: "0800"}
rooms[5].reservations[2][6][0]={name: "Go, R.", date: "20260219", start_time: "0900", end_time: "1000"}
rooms[5].reservations[6][1][0]={name: "Chua, B.", date: "20260219", start_time: "1100", end_time: "1200"}
rooms[5].reservations[4][8][0]={name: "Yap, S.", date: "20260219", start_time: "1300", end_time: "1400"}
rooms[5].reservations[1][4][0]={name: "Chen, T.", date: "20260219", start_time: "1500", end_time: "1600"}
rooms[5].reservations[3][2][0]={name: "Lee, D.", date: "20260219", start_time: "1700", end_time: "1800"}
rooms[5].reservations[0][5][0]={name: "Cruz, J.", date: "20260219", start_time: "1000", end_time: "1100"}
rooms[5].reservations[5][7][0]={name: "Santos, M.", date: "20260219", start_time: "1200", end_time: "1300"}
rooms[5].reservations[2][3][0]={name: "Reyes, A.", date: "20260220", start_time: "0800", end_time: "0900"}
rooms[5].reservations[6][5][0]={name: "Garcia, P.", date: "20260220", start_time: "1000", end_time: "1100"}
rooms[5].reservations[4][0][0]={name: "Torres, L.", date: "20260220", start_time: "1200", end_time: "1300"}
rooms[5].reservations[1][8][0]={name: "Lopez, K.", date: "20260220", start_time: "1400", end_time: "1500"}
rooms[5].reservations[3][1][0]={name: "Gonzales, H.", date: "20260220", start_time: "1600", end_time: "1700"}
rooms[5].reservations[0][7][0]={name: "Ong, C.", date: "20260220", start_time: "0900", end_time: "1000"}
rooms[5].reservations[5][4][0]={name: "Co, E.", date: "20260220", start_time: "1100", end_time: "1200"}
rooms[5].reservations[2][2][1]={name: "Sison, F.", date: "20260220", start_time: "1300", end_time: "1400"}

constructRoom();
renderReservations();