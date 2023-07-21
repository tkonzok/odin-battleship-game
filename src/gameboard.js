class Gameboard {
    constructor() {
        this.rows = 0;
        this.columns = 0;
        this.cells = [];
        this.ships = [];
        this.sunkShips = []
        this.allShipsSunk = false;
    }

    fillCells(rows=10, columns=10) {
        this.rows = rows;
        this.columns = columns;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                this.cells.push({x: i, y: j, contains: null, shot: false})
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
        }
    }

    receiveAttack(coordinates) {
        const cell = this.cells.find(cell => {
            return (cell.x === coordinates[0] && cell.y === coordinates[1])
        })
        if (cell.contains) {
            cell.contains.hit()
        }
        cell.shot = true
    }

    updateShipStatus() {
        this.allShipsSunk = (this.ships.length == 0 && this.sunkShips.length != 0)
    }

    shipSinks(ship) {
        const rows = this.rows
        const columns = this.columns
        const allCells = this.cells
        const cells = allCells.filter(cell => cell.contains === ship)
        const cellsAround = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
        let emptyCellsAround = []
        for (const cell of cells) {
            const surroundingCells = cellsAround
                .map(valuePair => [valuePair[0] + cell.x, valuePair[1] + cell.y])
                .filter(valuePair => valuePair[0] >= 0 && valuePair[1] >= 0 && valuePair[0] < rows && valuePair[1] < columns);
            for (const cell of surroundingCells) {
                const index = allCells.findIndex(obj => obj.x == cell[0] && obj.y == cell[1])
                if (!emptyCellsAround.includes(index) && !allCells[index].contains) {
                    emptyCellsAround.push(index)
                }
            }
        }
        emptyCellsAround = emptyCellsAround.map(x => allCells[x])
        for (const cell of emptyCellsAround) {
            cell.shot = true
        }
    }
}

export { Gameboard }