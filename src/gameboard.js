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
        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                this.cells.push({x: i, y: j, contains: null, shot: false})
            }
        }
    }

    getCells() {
        return this.cells
    }

    getAvailableCellsToPlaceShip(size, horizontal=true) {
        const rows = this.rows
        const columns = this.columns
        const allCells = this.cells
        let emptyCells = allCells.filter(cell => !cell.contains)
        if (horizontal === true) {
            emptyCells = emptyCells.filter(cell => cell.x <= columns - size)
        } else {
            emptyCells = emptyCells.filter(cell => cell.y <= rows - size)
        }
        const cellsAround = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
        let notAvailableCells = []
        for (const cell of emptyCells) {
            let surroundingCells = []
            if (horizontal === true) {
                surroundingCells = cellsAround
                .map(valuePair => [valuePair[0] + cell.x, valuePair[1] + cell.y])
                .filter(valuePair => valuePair[0] >= 0 && valuePair[1] >= 0 && valuePair[0] < rows && valuePair[1] < (columns - size + 1));
            } else {
                surroundingCells = cellsAround
                .map(valuePair => [valuePair[0] + cell.x, valuePair[1] + cell.y])
                .filter(valuePair => valuePair[0] >= 0 && valuePair[1] >= 0 && valuePair[0] < (rows - size + 1) && valuePair[1] < columns);
            }
            for (const cell of surroundingCells) {
                const index = allCells.findIndex(obj => obj.x == cell[0] && obj.y == cell[1])
                if (!notAvailableCells.includes(index) && allCells[index].contains) {
                    notAvailableCells.push(index)
                }
            }
        }
        notAvailableCells = notAvailableCells.map(x => allCells[x])
        let availableCells = emptyCells.filter(x => !notAvailableCells.includes(x))
        notAvailableCells = []
        if (horizontal === true) {
            for (const cell of availableCells) {
                const index = allCells.findIndex(obj => obj.x == cell[0] && obj.y == cell[1])
                for (let i = 1; i < size; i++) {
                    if (!notAvailableCells.includes(index) && !availableCells.includes(allCells[index + i])) {
                        notAvailableCells.push(index)
                    }
                }
            }
        } else {
            for (const cell of availableCells) {
                const index = allCells.findIndex(obj => obj.x == cell[0] && obj.y == cell[1])
                for (let i = 1; i < size; i++) {
                    if (!notAvailableCells.includes(index) && !availableCells.includes(allCells[index + i * columns])) {
                        notAvailableCells.push(index)
                    }
                }
            }
        }
        availableCells = availableCells.filter(x => !notAvailableCells.includes(x))
        return availableCells
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

    shipHit(coordinates) {
        const rows = this.rows
        const columns = this.columns
        const allCells = this.cells
        const cell = allCells.filter(cell => (cell.x === coordinates[0] && cell.y === coordinates[1]))
        const cellsAround = [[-1, -1], [-1, 1], [1, -1], [1, 1]]
        let emptyCellsAround = []
        const surroundingCells = cellsAround
            .map(valuePair => [valuePair[0] + cell[0].x, valuePair[1] + cell[0].y])
            .filter(valuePair => valuePair[0] >= 0 && valuePair[1] >= 0 && valuePair[0] < rows && valuePair[1] < columns);
        for (const cell of surroundingCells) {
            const index = allCells.findIndex(obj => obj.x == cell[0] && obj.y == cell[1])
            if (!emptyCellsAround.includes(index) && !allCells[index].contains) {
                emptyCellsAround.push(index)
            }
        }
        emptyCellsAround = emptyCellsAround.map(x => allCells[x])
        for (const cell of emptyCellsAround) {
            cell.shot = true
        }
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