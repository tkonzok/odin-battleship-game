import {changeName} from './index.js'

class Startup {
    constructor() {
    }

    openForm() {
        const body = document.querySelector('body');
        const formDiv = document.createElement('div');
        formDiv.classList.add('form-div');
        body.appendChild(formDiv);
        const form = document.createElement('form');
        formDiv.appendChild(form);

        let nameLabel = document.createElement('label');
        nameLabel.setAttribute("for", "player-name");
        nameLabel.textContent = 'Enter Your Name:';
        form.appendChild(nameLabel);

        let nameInput = document.createElement('input');
        nameInput.setAttribute("type", "text");
        nameInput.setAttribute("class", "form");
        nameInput.setAttribute("id", "player-name");
        nameInput.setAttribute("value", "Player 01");
        nameInput.required = true;
        nameInput.focus();
        nameInput.select();
        form.appendChild(nameInput);
        
        let btn = document.createElement('button');
        btn.setAttribute("type", "submit");
        btn.setAttribute("id", "submit-btn");
        btn.textContent = "Start Game";
        form.appendChild(btn);

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            changeName(nameInput.value);
            body.removeChild(body.lastChild);
        })
    }
}

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
                cell.classList.add('comp')
                cell.id = `compCell[${j}, ${i}]`;
                cell.setAttribute('x', j);
                cell.setAttribute('y', i);
                compBattlefield.appendChild(cell);
            }
        }
    }

    highlightAvailableCells(user, cells) {
        for (const cell of cells) {
            const div = document.getElementById(`${user}Cell[${cell.x}, ${cell.y}]`);
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
            const div = document.getElementById(`${board}Cell[${pair[0]}, ${pair[1]}]`);
            div.classList.add('ship')
        }
    }

    renderBoard(board, cells) {
        for (const cell of cells) {
            const div = document.getElementById(`${board}Cell[${cell.x}, ${cell.y}]`);
            div.innerHTML = ''
            if (cell.shot && !cell.contains) {
                const shotDiv = document.createElement('div')
                shotDiv.classList.add('shot')
                div.appendChild(shotDiv)
            }
            if (cell.shot && cell.contains) {
                div.classList.add('hit')
            }            
        }
    }

    updateDisplay(phase, activePlayer = null, winner = null, ship = null) {
        const display = document.getElementById('display')
        if (winner) {
            display.textContent = `Game over! The winner is ${winner}`
        } else if (phase === 'game' && activePlayer.charAt(activePlayer.length - 1) === 's') {
            display.textContent = `It's ${activePlayer} turn`
        } else if (phase === 'game') {
            display.textContent = `It's ${activePlayer}'s turn`
        } else if (phase === 'pre-game') {
            display.textContent = `It's your turn to place a ship of size ${ship.size}`
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

    async place(availableCells) {
        this.receivePlacement(availableCells)
        await this.waitForPress()
        this.removeListener(availableCells)
        return [this.x, this.y]
    }
}

class Movement {
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

    receivePlacement(user, availableCells) {
        for (const cell of availableCells) {
            const element = document.getElementById(`${user}Cell[${cell.x}, ${cell.y}]`)
            element.addEventListener('click', () => {this.btnResolver(cell.x, cell.y)})
        }
    }

    removeListener(user, availableCells) {
        for (const cell of availableCells) {
            const element = document.getElementById(`${user}Cell[${cell.x}, ${cell.y}]`)
            element.removeEventListener('click', this.btnResolver)
        }
    }

    async shoot(user, availableCells) {
        this.receivePlacement(user, availableCells)
        await this.waitForPress()
        this.removeListener(user, availableCells)
        return [this.x, this.y]
    }
}

export { Startup, Battlefields, Placement, Movement }