import './normalize.css';
import './style.css';
import { Gameboard } from './gameboard'
import { Ship } from './ship'
import { Player } from './player'
import { Battlefields, Placement } from './dom'
import { CompLogic } from './complogic';

const battlefieldsDom = new Battlefields()
battlefieldsDom.createBattlefields(10, 10)

const player = new Player('Player');
const comp = new Player('Comp');

const playerGameboard = new Gameboard()
const compGameboard = new Gameboard()

playerGameboard.fillCells(10, 10)
compGameboard.fillCells(10, 10)

player.registerOpponentGameboard(compGameboard)
comp.registerOpponentGameboard(playerGameboard)

const compLogic = new CompLogic(compGameboard, playerGameboard)

const sizesOfShips = [7, 6, 5, 4, 3, 2, 1]
playerGameboard.createShips(sizesOfShips)
compGameboard.createShips(sizesOfShips)

const playerShips = playerGameboard.ships
const compShips = compGameboard.ships

async function placeShip(ship, horizontal=true) {
    let availableCells = playerGameboard.getAvailableCellsToPlaceShip(ship.size, horizontal) //true = horizontal, false = vertical
    battlefieldsDom.highlightAvailableCells(availableCells)
    const placement = new Placement()
    const cell = await placement.doIt(availableCells)
    console.log(cell)
    playerGameboard.placeShip(ship, cell, horizontal) //true = horizontal, false = vertical
    battlefieldsDom.placeShip('Player', ship.size, cell, horizontal)  //true = horizontal, false = vertical
    battlefieldsDom.removeHighlight() 
}

function compPlaceShip(ship, horizontal=true) {
    let availableCells = compGameboard.getAvailableCellsToPlaceShip(ship.size, horizontal) //true = horizontal, false = vertical
    const cell = compLogic.randomPickCell(availableCells)
    console.log(cell)
    const coordinates = [cell.x, cell.y]
    compGameboard.placeShip(ship, coordinates, horizontal) //true = horizontal, false = vertical
    battlefieldsDom.placeShip('Comp', ship.size, coordinates, horizontal)  //true = horizontal, false = vertical
}

for (let ship of playerShips) {
    let horizontal = true
    let rand = Math.floor(Math.random() * 2)
    if (rand === 0) {
        horizontal = false
    }
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