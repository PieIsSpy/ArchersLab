import { currentUser } from "./User";
import { users } from "./User";

export class Reservation {
	/*
		Parameters:
		date: datetime
		time: string
		room: string
		seats: int[5]
	*/
	constructor(user, date, time, room, seats, status, isAnnonymous) {
		this.user = user;
		this.date = date;
		this.time = time;
		this.room = room;
		this.seats = seats;
		this.status = status
		this.isAnnonymous = isAnnonymous;
	}
}

export let reservations = [
	new Reservation(currentUser, new Date("2025-02-16T11:14:00"), "6:00AM-7:00AM", "GK201", [11, 12], "Upcoming", 0),
	new Reservation(users[1], new Date("2025-02-16T11:14:00"), "7:00AM-8:00AM", "GK201", [11, 12], "Cancelled", 0),
]