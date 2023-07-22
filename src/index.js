import './normalize.css';
import './style.css';
import { Gameboard } from './gameboard'
import { Ship } from './ship'
import { Player } from './player'
import { Battlefields, placement } from './dom'

const battlefieldsDom = new Battlefields()
battlefieldsDom.createBattlefiels(10, 10)

const player = new Player('Player');
const comp = new Player('Comp');

const playerGameboard = new Gameboard()
const compGameboard = new Gameboard()

playerGameboard.fillCells(10, 10)
compGameboard.fillCells(10, 10)

player.registerOpponentGameboard(compGameboard)
comp.registerOpponentGameboard(playerGameboard)

const sizesOfShips = [5, 4, 4, 3, 3, 2, 2]

async function placeAllShips(sizesOfShips) {
    for (let i = 0; i < sizesOfShips.length; i++) {
        const ship = new Ship(sizesOfShips[i])
        let availableCells = playerGameboard.getAvailableCellsToPlaceShip(ship.size, true) //true = horizontal, false = vertical
        battlefieldsDom.highlightAvailableCells(availableCells)
        const cell = await receivePlacement(availableCells)
        playerGameboard.placeShip(ship, cell, true) //true = horizontal, false = vertical
        battlefieldsDom.placeShip(ship.size, cell, true)  //true = horizontal, false = vertical
        console.log(cell)
        console.log(playerGameboard)
        battlefieldsDom.removeHighlight()
    }  
}

async function receivePlacement(availableCells) {
    const coo = await placement.doIt(availableCells)
    return coo
}

placeAllShips(sizesOfShips)