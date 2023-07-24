class CompLogic {
    constructor(compGameboard, playerGameboard) {
        this.compGameboard = compGameboard,
        this.playerGameboard = playerGameboard
    }

    getAvailableCells() {
        const currentPlayerBoard = this.playerGameboard.getCells();
        return currentPlayerBoard.filter(cell => cell.shot === false)
    }

    getNeighborCells(coordinates) {
        const currentPlayerBoard = this.playerGameboard.getCells();
        const neighborCells = currentPlayerBoard.filter(cell => 
                (cell.x === (coordinates[0] + 1 || coordinates[0] - 1) && cell.y === coordinates[1]) ||
                (cell.x === coordinates[0] && (cell.y === coordinates[1] + 1 || cell.y === coordinates[1] - 1))
            )
        return neighborCells
    }

    randomPickCell(availableCells) {
        const pick = (Math.floor(Math.random() * availableCells.length))
        return availableCells[pick]
    }
}

export { CompLogic }


