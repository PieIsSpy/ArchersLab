export class Reservation {
	/*
		Parameters:
		date: datetime
		time: string
		room: string // TODO: make a room class
		seats: int[5]
	*/
	constructor(date, time, room, seats, status) {
		this.date = date;
		this.time = time;
		this.room = room;
		this.seats = seats;
		this.status = status
	}
}