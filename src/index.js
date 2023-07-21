import './normalize.css';
import './style.css';
import { Gameboard } from './gameboard'
import { Ship } from './ship'

const gameboard = new Gameboard()
const ship = new Ship(2)
gameboard.fillCells()
console.log(gameboard.getCells())
gameboard.placeShip(ship, [[0, 2], [0, 3]])
console.log(gameboard.getCells())
ship.hit()
console.log(gameboard.getCells())
//gameboard.shipSinks(ship)
console.log(gameboard.getCells())

