import './normalize.css';
import './style.css';
import { Gameboard } from './gameboard'
import { Ship } from './ship'
import { Player } from './player'
import { Battlefields } from './dom'

const battlefields = new Battlefields()
battlefields.createBattlefiels(8, 10)

const playerGameboard = new Gameboard()
const compGameboard = new Gameboard()

playerGameboard.fillCells(8, 10)
compGameboard.fillCells(8, 10)

const ship = new Ship(4)
let availableCells = playerGameboard.getAvailableCellsToPlaceShip(ship.size, false) //true = horizontal, false = vertical
battlefields.highlightAvailableCells(availableCells)
