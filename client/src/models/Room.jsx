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
    new Room("GK203", 5, 6),
    new Room("GK204", 5, 6),
    new Room("GK205", 5, 6),
    new Room("GK206", 5, 6),
    new Room("GK207", 4, 6),
    new Room("GK208", 4, 6),
    new Room("GK209", 4, 6),
    new Room("GK210", 4, 6)
]