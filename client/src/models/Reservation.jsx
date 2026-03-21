export class Reservation {
	/*
		Parameters:
		date: datetime
		time: string
		room: string
		seats: int[5]
	*/
	constructor(user, date, time, room, seats, status, reason, isAnonymous, id) {
		this.user = user;
		this.date = date;
		this.time = time;
		this.room = room;
		this.seats = seats;
		this.status = status;
		this.reason = reason;
		this.isAnonymous = isAnonymous;
		this.id = id;
	}
}

export function reservationJSON_to_Object(json) {
	return new Reservation(
		json.name,
		json.row,
		json.col,
		json.layoutID
	)
}