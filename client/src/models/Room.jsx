export class Room {
    /*
        name: string
        row: int
        col: int
    */
    constructor(name, row, col, layoutID) {
        this.name = name;
        this.row = row;
        this.col = col;
        this.layoutID = layoutID;
    }
}

export let rooms = [
    // new Room("A1904", 5, 9, 1),
    // new Room("C314", 6, 6, 2),
    // new Room("G210", 5, 6, 2),
    // new Room("G211", 5, 6, 1),
    // new Room("G302A", 4, 6, 3),
    // new Room("G302B", 4, 6, 3),
    // new Room("G304A", 4, 6, 3),
    // new Room("G304B", 5, 9, 1),
    // new Room("G306A", 4, 6, 3),
    // new Room("G306B", 4, 6, 3),
    // new Room("G404A", 5, 6, 3),
    // new Room("G404B", 5, 6, 3),
    // new Room("J212", 5, 4, 4),
    // new Room("L212", 3, 6, 2),
    // new Room("L229", 6, 9, 1),
    // new Room("L320", 5, 8, 5),
    // new Room("L335", 6, 8, 5),
    // new Room("V103", 5, 6, 2),
    // new Room("V205", 4, 6, 3),
    // new Room("V206", 4, 6, 3),
    // new Room("V208A", 4, 6, 3),
    // new Room("V208B", 4, 6, 3),
    // new Room("V301", 4, 9, 1),
    // new Room("V310", 5, 6, 2),
    new Room("Y602", 5, 9, 1)
];