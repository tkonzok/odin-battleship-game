class Battlefields {
    constructor() {
        this.playerContainer = document.getElementById('player-battlefield-container');
        this.compContainer = document.getElementById('comp-battlefield-container');
        this.columns = 0
    }

    createBattlefields(rows = 10, columns = 10) {
        const playerBattlefield = document.createElement('div')
        this.playerContainer.appendChild(playerBattlefield);

        const compBattlefield = document.createElement('div')
        this.compContainer.appendChild(compBattlefield);

        this.columns = columns;

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

    removeHighlight() {
        const cells = document.querySelectorAll('.available');
        for (let cell of cells) {
            cell.classList.remove('available')
        }
    }

    placeShip(board, size, cell, horizontal = true) {
        let coordinates = [cell];
        if (horizontal) {
            for (let i = 1; i < size; i++) {
                coordinates.push([cell[0] + i, cell[1]])
            }
        } else {
            for (let i = 1; i < size; i++) {
                coordinates.push([cell[0], cell[1] + i])
            }
        }
        for (const pair of coordinates) {
            if (board === 'Player') {
                const div = document.getElementById(`playerCell[${pair[0]}, ${pair[1]}]`);
                div.classList.add('ship')
            } else {
                const div = document.getElementById(`compCell[${pair[0]}, ${pair[1]}]`);
                div.classList.add('ship')
            }
        }
    }
}

class Placement {
    constructor() {
        this.waitForPressResolve;
        this.x = 99;
        this.y = 99;
    }
    
    waitForPress() {
        return new Promise(resolve => this.waitForPressResolve = resolve);
    }

    btnResolver(coordX, coordY) {
        this.x = coordX;
        this.y = coordY;
        if (this.waitForPressResolve) this.waitForPressResolve();
    }

    receivePlacement(availableCells) {
        for (const cell of availableCells) {
            const element = document.getElementById(`playerCell[${cell.x}, ${cell.y}]`)
            element.addEventListener('click', () => {this.btnResolver(cell.x, cell.y)})
        }
    }

    removeListener(availableCells) {
        for (const cell of availableCells) {
            const element = document.getElementById(`playerCell[${cell.x}, ${cell.y}]`)
            element.removeEventListener('click', this.btnResolver)
        }
    }

    async doIt(availableCells) {
        this.receivePlacement(availableCells)
        await this.waitForPress()
        this.removeListener(availableCells)
        return [this.x, this.y]
    }
}

export { Battlefields, Placement }