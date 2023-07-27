import './normalize.css';
import './style.css';
import { Gameboard } from './gameboard'
import { Ship } from './ship'
import { Player } from './player'
import { Startup, Battlefields, Placement, Movement } from './dom'
import { CompLogic } from './complogic';

const battlefieldsDom = new Battlefields()
battlefieldsDom.createBattlefields(10, 10)

const player = new Player('Player 01', 'player');
const comp = new Player('Computer', 'computer');

const playerGameboard = new Gameboard()
const compGameboard = new Gameboard()

playerGameboard.fillCells(10, 10)
compGameboard.fillCells(10, 10)

player.registerOpponentGameboard(compGameboard)
comp.registerOpponentGameboard(playerGameboard)

const compLogic = new CompLogic(compGameboard, playerGameboard)

const sizesOfShips = [5, 4, 4, 3, 3, 2, 2]
playerGameboard.createShips(sizesOfShips)
compGameboard.createShips(sizesOfShips)

const playerShips = playerGameboard.ships
const compShips = compGameboard.ships

const startup = new Startup();
startup.openForm()

function changeName(newName) {
    player.name = newName
    battlefieldsDom.updateDisplay('pre-game', player, null, playerShips[0])
}

async function placeShip(ship, horizontal=true) {
    let availableCells = playerGameboard.getAvailableCellsToPlaceShip(ship.size, horizontal) //true = horizontal, false = vertical
    battlefieldsDom.highlightAvailableCells('player', availableCells)
    const placement = new Placement()
    const cell = await placement.place(availableCells)
    playerGameboard.placeShip(ship, cell, horizontal) //true = horizontal, false = vertical
    battlefieldsDom.placeShip('player', ship.size, cell, horizontal)  //true = horizontal, false = vertical
    battlefieldsDom.removeHighlight() 
}

function compPlaceShip(ship, horizontal=true) {
    let availableCells = compGameboard.getAvailableCellsToPlaceShip(ship.size, horizontal) //true = horizontal, false = vertical
    const cell = compLogic.randomPickCell(availableCells)
    const coordinates = [cell.x, cell.y]
    compGameboard.placeShip(ship, coordinates, horizontal) //true = horizontal, false = vertical
    battlefieldsDom.placeShip('comp', ship.size, coordinates, horizontal)  //true = horizontal, false = vertical
}

async function makeMove(activePlayer) {
    let again = false
    if (activePlayer === player) {
        const availableCells = compGameboard.getAvailableCellsToMakeMove()
        battlefieldsDom.highlightAvailableCells('comp', availableCells)
        const placement = new Movement()
        const coordinates = await placement.shoot('comp', availableCells)
        let hitShip = player.attack(coordinates)
        compGameboard.updateShipStatus()
        if (hitShip) {
            if (hitShip.isSunk() === true) {
                compGameboard.shipSinks(hitShip)
            }
            if (!compGameboard.allShipsSunk) {
                again = true
            }
        }
        battlefieldsDom.renderBoard('comp', compGameboard.getCells())
        battlefieldsDom.removeHighlight() 
    } else {
        const availableCells = playerGameboard.getCells().filter(cell => !cell.shot)
        let cell;
        if (playerGameboard.isShipAround()) {
            cell = playerGameboard.isShipAround()
        } else if (availableCells.length % 3 !== 0) {
            cell = playerGameboard.emptySpace()
            if (cell.shot === true) {
                cell = compLogic.randomPickCell(availableCells)
            }
        } else {
            cell = compLogic.randomPickCell(availableCells)
        }
        const coordinates = [cell.x, cell.y]
        await new Promise(resolve => setTimeout(resolve, 1000));
        let hitShip = comp.attack(coordinates)
        compGameboard.updateShipStatus()
        if (hitShip) {
            if (hitShip.isSunk() === true) {
                playerGameboard.shipSinks(hitShip)
            }
            if (!playerGameboard.allShipsSunk) {
                again = true
            }
        }
        playerGameboard.updateShipStatus()
        battlefieldsDom.renderBoard('player', playerGameboard.getCells())
    }     
    return again
}

for (let ship of playerShips) {
    let horizontal = true
    let rand = Math.floor(Math.random() * 2)
    if (rand === 0) {
        horizontal = false
    }
    battlefieldsDom.updateDisplay('pre-game', player, null, ship)
    await placeShip(ship, horizontal)
}

for (let ship of compShips) {
    let horizontal = true
    let rand = Math.floor(Math.random() * 2)
    if (rand === 0) {
        horizontal = false
    }
    compPlaceShip(ship, horizontal)
}

let gameOver = false
let winner = player
let activePlayer = player

while (!gameOver) {
    battlefieldsDom.updateDisplay('game', activePlayer, null, null, compGameboard.sunkShips.length, playerGameboard.sunkShips.length)
    battlefieldsDom.highlightActiveBoard(activePlayer)
    let again = await makeMove(activePlayer)
    if (!again) {
        if (playerGameboard.allShipsSunk) {
            winner = comp;
            gameOver = true
        }
        if (compGameboard.allShipsSunk) {
            winner = player;
            gameOver = true
        }
    }
    if (!again) {
        if (activePlayer === player) {
            activePlayer = comp
        } else {
            activePlayer = player
        }
    }
}

battlefieldsDom.updateDisplay(null, null, winner.name, null, compGameboard.sunkShips.length, playerGameboard.sunkShips.length)
battlefieldsDom.askForRestart()

export { changeName }