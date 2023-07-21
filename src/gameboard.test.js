import { Gameboard } from './gameboard'
import { Ship } from './ship'

const gameboard = new Gameboard

test('gameboard successfully initialized', () => {
    gameboard.fillCells()
    expect(gameboard.getCells()).toEqual(expect.arrayContaining([{x: 1, y: 1, contains: null}, {x: 7, y: 7, contains: null}]));
});

test('at game start not all ships are sunk', () => {
    gameboard.fillCells()
    gameboard.updateShipStatus()
    expect(gameboard.allShipsSunk).toBe(false);
});

test('ship placed correctly', () => {
    gameboard.fillCells()
    const ship = new Ship(2)
    gameboard.placeShip(ship, [[0, 2], [0, 3]])
    let board = gameboard.getCells()
    expect(board[3].contains).toBe(ship);
});

