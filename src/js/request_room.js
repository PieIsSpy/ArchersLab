import { hideModal, displayModal } from "./modal_handler.js";
import { checkInputs } from "./input_checker.js";

let requestList = []

let dateSelected = 0;
let roomSelected = 0;

let rooms = [
    {
        "Date": "2026/02/23",
        "Rooms": [
            {"Room":"G404", "Seats":30, "Status":"Free"},
            {"Room":"G405", "Seats":30, "Status":"Requested"},
            {"Room":"G406", "Seats":40, "Status":"Free"},
            {"Room":"G407", "Seats":15, "Status":"Free"},
            {"Room":"G408", "Seats":15, "Status":"Free"},
        ]
    },
    {
        "Date": "2026/02/24",
        "Rooms": [
            {"Room":"G404", "Seats":30, "Status":"Free"},
            {"Room":"G405", "Seats":30, "Status":"Requested"},
            {"Room":"G406", "Seats":40, "Status":"Free"},
            {"Room":"G407", "Seats":15, "Status":"Requested"},
            {"Room":"G408", "Seats":15, "Status":"Free"},
        ]
    },
    {
        "Date": "2026/02/25",
        "Rooms": [
            {"Room":"G404", "Seats":30, "Status":"Requested"},
            {"Room":"G405", "Seats":30, "Status":"Requested"},
            {"Room":"G406", "Seats":40, "Status":"Requested"},
            {"Room":"G407", "Seats":15, "Status":"Requested"},
            {"Room":"G408", "Seats":15, "Status":"Requested"},
        ]
    },
    {
        "Date": "2026/02/26",
        "Rooms": [
            {"Room":"G404", "Seats":30, "Status":"Free"},
            {"Room":"G405", "Seats":30, "Status":"Free"},
            {"Room":"G406", "Seats":40, "Status":"Free"},
            {"Room":"G407", "Seats":15, "Status":"Free"},
            {"Room":"G408", "Seats":15, "Status":"Free"},
        ]
    }
]

function listRooms(i) {
    let table = document.querySelector("#reservationTable");
    let removables = document.querySelectorAll(".removables");

    console.log("length: " + removables.length)
    if (removables.length > 0) {
        removables.forEach(removable => {
            table.removeChild(removable)
            removable = []
        });
    }

    rooms[i]["Rooms"].forEach((x, i) => {
        let row = document.createElement("tr");
        row.className = "removables"

        for (const [key, value] of Object.entries(x)) {
            let col = document.createElement("td");
            let container = document.createElement("div");
            container.className = "cells";
            container.textContent = value;

            col.appendChild(container);
            row.appendChild(col);
        };
        let button = document.createElement("button");
        button.textContent = "Reserve";
        button.className = "cells";
        button.onclick = () => {
            if (x['Status'] == "Free") {
                console.log("true")
                roomSelected = i;
                console.log("room: " + roomSelected)
                requestRoom(x['Room']);
            }
        };
        row.appendChild(button);

        table.appendChild(row);
    });
    console.log("done")
}

function setPending(date, room) {
    let table = document.querySelector("#pending");
    let time = document.querySelector("#time")
    let row = document.createElement("tr");

    let infos = [rooms[date]['Date'], rooms[date]['Rooms'][room]['Room'], time.value, rooms[date]['Rooms'][room]['Seats'], "Pending"]

    infos.forEach(info => {
        let col = document.createElement("td");
        let container = document.createElement("div");
        container.className = "cells";
        container.textContent = info;

        col.appendChild(container);
        row.appendChild(col);
    });
    
    let button = document.createElement("button");
    button.style = "background-color: red; color: white";
    button.textContent = "Cancel";
    button.className = "cells";
    let index = requestList.length
    button.onclick = () => deleteRequest(index, row);
    row.appendChild(button);

    table.appendChild(row);
    requestList.push(row);
}

function requestRoom(text) {
    displayModal();
    let room = document.querySelector("#room");
    room.textContent = text
}

function confirmRequest() {
    if (checkInputs()) {
        setPending(dateSelected, roomSelected);
        hideModal();
    }
}

function appendListeners() {
    let options = document.querySelectorAll("option")

    options.forEach(option => {
        option.addEventListener("click", () => {
            const index = rooms.findIndex(x => x.Date === option.textContent);
            dateSelected = index;
            console.log("date: " + dateSelected)
            listRooms(index);
        })
    });
}

function deleteRequest(i, row){
    if (confirm("Are you sure you want to cancel your request") == true) {
        alert("Request cancelled!")
        let table = document.querySelector("#pending");
        table.removeChild(row)


        requestList.splice(i,1);
        document.getElementById("pending").innerHTML = "";
        listRequests();
    } else {
    }
}

function listRequests() {
    let table = document.querySelector("#pending");
    let headers = ["Room", "Date", "Time", "Number of Seats", "Status", "Actions"]

    let headerRow = document.createElement("tr");
    headers.forEach(header => {
        let col = document.createElement("th");
        col.textContent = header;
        headerRow.appendChild(col);
    });
    table.appendChild(headerRow);

    requestList.forEach(request => {
        table.appendChild(request)
    });
}

listRooms(0);
listRequests();
appendListeners();
window.confirmRequest = confirmRequest;