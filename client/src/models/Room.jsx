export class Room {
    /*
        name: string
        row: int
        col: int
    */
    constructor(name, row, col) {
        this.name = name;
        this.row = row;
        this.col = col;
    }
}

export let rooms = [
    new Room("GK201", 5, 9),
    new Room("GK202", 5, 9),
    new Room("GK203", 3, 6),
    new Room("GK204", 4, 8),
    new Room("GK205", 5, 10),
    new Room("GK206", 6, 4),
    new Room("GK207", 3, 3),
    new Room("GK208", 8, 9),
    new Room("GK209", 6, 7),
    new Room("GK210", 5, 10)
]