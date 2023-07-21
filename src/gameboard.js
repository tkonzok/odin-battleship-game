class Gameboard {
    constructor() {
        this.cells = [];
        this.missedAttacks = [];
        this.ships = [];
        this.sunkShips = []
        this.allShipsSunk = false;
    }

    fillCells() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.cells.push({x: i, y: j, contains: null})
            }
        }
    }

    getCells() {
        return this.cells
    }

    placeShip(ship, arrayOfCoordinates) {
        for (const coordinates of arrayOfCoordinates) {
            const cell = this.cells.find(cell => {
                return (cell.x === coordinates[0] && cell.y === coordinates[1])
            })
            cell.contains = ship
            console.log(cell)
        }
    }

    // receiveAttack(x, y) {
        // determine whether or not the attack hit a ship
        // if hit send hit() function to correct ship
        // if not hit record coordinates as missed shot
    // }

    updateShipStatus() {
        this.allShipsSunk = (this.ships.length == 0 && this.sunkShips.length != 0)
    }
}

export { Gameboard }