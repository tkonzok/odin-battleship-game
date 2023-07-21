class Battlefields {
    constructor() {
        this.playerContainer = document.getElementById('player-battlefield-container');
        this.compContainer = document.getElementById('comp-battlefield-container');
    }

    createBattlefiels(rows = 10, columns = 10) {
        const playerBattlefield = document.createElement('div')
        this.playerContainer.appendChild(playerBattlefield);

        const compBattlefield = document.createElement('div')
        this.compContainer.appendChild(compBattlefield);

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                const cell = document.createElement('div')
                cell.classList.add('cell');
                cell.id = `playerCell[${j}, ${i}]`;
                cell.setAttribute('x', j);
                cell.setAttribute('y', i);
                playerBattlefield.appendChild(cell);
            }
        }

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                const cell = document.createElement('div')
                cell.classList.add('cell');
                cell.id = `compCell[${j}, ${i}]`;
                cell.setAttribute('x', j);
                cell.setAttribute('y', i);
                compBattlefield.appendChild(cell);
            }
        }
    }

    highlightAvailableCells(cells) {
        for (const cell of cells) {
            const div = document.getElementById(`playerCell[${cell.x}, ${cell.y}]`);
            div.classList.add('available')
        }
    }
}

export { Battlefields }
    