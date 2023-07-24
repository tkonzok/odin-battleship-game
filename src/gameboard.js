import { Ship } from './ship';

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

    createShips(lengths) {
        for (let length of lengths) {
            const ship = new Ship(length)
            this.ships.push(ship)
        }
    }

    getAvailableCellsToPlaceShip(size, horizontal=true) {
        const rows = this.rows
        const columns = this.columns
        const allCells = this.cells
        const cellsAround = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
        
        function removeCellsWithShip(cells) {
            return cells.filter(cell => !cell.contains)
        }

        function availableShipPositions(cells) {
            let availablePositions = []
            for (let cell of cells) {
                let shipCells = []
                if (horizontal === true) {
                    for (let i = 0; i < size; i++) {
                        shipCells.push(cells.filter(c => c.x === (cell.x + i) && c.y === cell.y)[0])
                    }
                } else {
                    for (let i = 0; i < size; i++) {
                        shipCells.push(cells.filter(c => c.x === cell.x && c.y === (cell.y + i))[0])
                    }
                }
                if (!shipCells.includes(undefined)) {
                    let cellAvailable = true
                    for (let shipCell of shipCells) {
                        if (shipCell.contains) {
                            cellAvailable = false
                        }
                    }
                    if (cellAvailable) {
                        availablePositions.push(cell)
                    }
                }
            }
            return availablePositions
        }

        function getCellsAround(cell) {
            return cellsAround.map(coordinates => [coordinates[0] + cell.x, coordinates[1] + cell.y])  
        }  

        function removeCellsWithShipAround(cells) {
            let notAvailableCells = []
            for (const cell of cells) {
                let surroundingCells = getCellsAround(cell) //list of coordinates
                for (const surrCell of surroundingCells) {
                    const surrIndex = allCells.findIndex(obj => obj.x == surrCell[0] && obj.y == surrCell[1])
                    if (surrIndex != -1) {
                        if (allCells[surrIndex].contains) {
                            notAvailableCells.push(cell) // not available coordinates
                        }
                    }
                }
            }
            let availableCells = cells.filter(x => !notAvailableCells.includes(x))
            return availableCells
        }
        
        let availableCells = removeCellsWithShip(allCells);
        availableCells = removeCellsWithShipAround(availableCells)
        availableCells = availableShipPositions(availableCells)
        return availableCells
    }

    getAvailableCellsToMakeMove() {
        const allCells = this.cells
        
        function removeCellsWithShot(cells) {
            return cells.filter(cell => cell.shot === false)
        }

        let availableCells = removeCellsWithShot(allCells);
        return availableCells
    }

    isShipAround() {
        const rows = this.rows
        const columns = this.columns
        const cellsAround = [[-1, 0], [0, 1], [0, -1], [1, 0]]
        let shipAround = null
        const shipCells = this.cells.filter(cell => cell.contains && cell.shot)
        for (const cell of shipCells) {
            const surroundingCells = cellsAround
                .map(valuePair => [valuePair[0] + cell.x, valuePair[1] + cell.y])
                .filter(valuePair => valuePair[0] >= 0 && valuePair[1] >= 0 && valuePair[0] < rows && valuePair[1] < columns);
            for (const surrCell of surroundingCells) {
                const index = this.cells.findIndex(obj => obj.x == surrCell[0] && obj.y == surrCell[1])
                if(this.cells[index].shot === false) {
                    shipAround = this.cells[index]
                }
            }
        }
        return shipAround
    }

    placeShip(ship, cell, horizontal) {
        let arrayOfCoordinates = [cell]
        if (horizontal) {
            for (let i = 1; i < ship.size ; i++) {
                arrayOfCoordinates.push([cell[0] + i, cell[1]])
            }
        } else {
            for (let i = 1; i < ship.size ; i++) {
                arrayOfCoordinates.push([cell[0], cell[1] + i])
            }
        }
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
        cell.shot = true
        if (cell.contains) {
            let ship = cell.contains
            ship.hit()
            this.shipHit(cell)
            return ship;
        }
    }

    updateShipStatus() {
        for (const ship of this.ships) {
            if (ship.isSunk()) {
                const index = this.ships.findIndex(x => x == ship);
                this.sunkShips.push(ship);
                this.ships.splice(index, 1)
            }
        }
        this.allShipsSunk = (this.ships.length == 0 && this.sunkShips.length != 0)
    }

    shipHit(cell) {
        const rows = this.rows
        const columns = this.columns
        const allCells = this.cells
        const cellsAround = [[-1, -1], [-1, 1], [1, -1], [1, 1]]
        let emptyCellsAround = []
        const surroundingCells = cellsAround
            .map(valuePair => [valuePair[0] + cell.x, valuePair[1] + cell.y])
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
        console.log('sipSinks')
        console.log(ship)
    }
}

export { Gameboard }