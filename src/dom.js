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
        btn.textContent = "START GAME";
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

        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                const cell = document.createElement('div')
                cell.classList.add('cell');
                cell.id = `playerCell[${i}, ${j}]`;
                cell.setAttribute('x', i);
                cell.setAttribute('y', j);
                playerBattlefield.appendChild(cell);
            }
        }

        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                const cell = document.createElement('div')
                cell.classList.add('cell');
                cell.classList.add('comp')
                cell.id = `compCell[${i}, ${j}]`;
                cell.setAttribute('x', i);
                cell.setAttribute('y', j);
                compBattlefield.appendChild(cell);
            }
        }
    }

    styleBackground(element, color) {
        element.style.background = `${color}`
    }

    simulateShip(element, user, cell, shipSize, horizontal, color) {
        element.style.backgroundColor = `${color}`
        for (let i = 1; i < shipSize; i++) {
            if (horizontal === true) {
                const shipCell = document.getElementById(`${user}Cell[${cell.x + i}, ${cell.y}]`);
                shipCell.style.backgroundColor = `${color}`;
            } else {
                const shipCell = document.getElementById(`${user}Cell[${cell.x}, ${cell.y + i}]`);
                shipCell.style.backgroundColor = `${color}`;
            }
        }
    }

    highlightAvailableCells(user, availableCells, allCells, shipSize = 0, horizontal = false) {
        for (const cell of availableCells) {
            const div = document.getElementById(`${user}Cell[${cell.x}, ${cell.y}]`);
            div.classList.add('available')
        }
        for (const cell of allCells) {
            const div = document.getElementById(`${user}Cell[${cell.x}, ${cell.y}]`);
            div.style.backgroundColor = '#00000000'
            if (!div.classList.contains('available')) {
                div.addEventListener('mouseover', () => {this.styleBackground(div, '#ff7fb0')});
                div.addEventListener('mouseout', () => {this.styleBackground(div, '#00000000')});
            }
        }
        for (const cell of availableCells) {
            const div = document.getElementById(`${user}Cell[${cell.x}, ${cell.y}]`);
            div.addEventListener('mouseover', () => {this.simulateShip(div, user, cell, shipSize, horizontal, '#7fffd4')})
            div.addEventListener('mouseout', () => {this.simulateShip(div, user, cell, shipSize, horizontal, '#00000000')})
        }
    }

    removeHighlight(user, availableCells, allCells) {
        for (const cell of availableCells) {
            const div = document.getElementById(`${user}Cell[${cell.x}, ${cell.y}]`);
            div.classList.remove('available')
        }
        for (const cell of allCells) {
            const div = document.getElementById(`${user}Cell[${cell.x}, ${cell.y}]`);
            div.style.backgroundColor = '#00000000'
            let clone = div.cloneNode(true)
            div.parentNode.appendChild(clone)
            div.remove()
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

    highlightActiveBoard(activePlayer = null) {
        const playerBoard = document.getElementById('player-battlefield-container')
        const compBoard = document.getElementById('comp-battlefield-container')
        playerBoard.classList.remove('active')
        compBoard.classList.remove('active')
        if (activePlayer.player === 'player') {
            compBoard.classList.add('active')
        } else if (activePlayer.player === 'computer') {
            playerBoard.classList.add('active')
        }
    }

    updateDisplay(phase, activePlayer = null, winner = null, ship = null, playerScore = 0, compScore = 0) {
        const display = document.getElementById('center-display')
        const leftScore = document.getElementById('player-score')
        const rightScore = document.getElementById('comp-score')
        const compCellsWithShip = document.querySelectorAll('div.ship.comp:not(.hit), div.ship.comp:not(.hit)')
        rightScore.textContent = compScore
        leftScore.textContent = playerScore
        if (winner) {
            compCellsWithShip.forEach((cell) => cell.classList.add('gameover'))
            display.textContent = `Game over! The winner is: ${winner}`       
        } else if (phase === 'game' && activePlayer === 'player') {
            display.textContent = `It's your turn`
        } else if (phase === 'game') {
            display.textContent = `It's computer's turn`
        } else if (phase === 'pre-game' && ship) {
            display.textContent = `Place a ship of size ${ship.size}`
        }
    }

    askForRestart() {
        const body = document.querySelector('body');
        const restartDiv = document.createElement('div');
        restartDiv.classList.add('restart-div');
        body.appendChild(restartDiv);
        
        let btn = document.createElement('button');
        btn.setAttribute("type", "button");
        btn.setAttribute("id", "restart-btn");
        btn.textContent = "RESTART";
        restartDiv.appendChild(btn);

        btn.addEventListener("click", (e) => {
            e.preventDefault();
            body.removeChild(body.lastChild);
            this.restart();
        })
    }

    restart() {
        window.location.reload()
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
            element.addEventListener('mouseup', () => {this.btnResolver(cell.x, cell.y)})
        }
    }

    removeListener(availableCells) {
        for (const cell of availableCells) {
            const element = document.getElementById(`playerCell[${cell.x}, ${cell.y}]`)
            element.removeEventListener('mouseup', this.btnResolver)
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