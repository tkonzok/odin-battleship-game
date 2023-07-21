import { Gameboard } from './gameboard'
import { Ship } from './ship'

const gameboard = new Gameboard

test('gameboard successfully initialized', () => {
    const x = 10;
    const y = 10
    gameboard.fillCells(x, y)
    expect(gameboard.getCells()).toEqual(expect.arrayContaining([{x: 1, y: 1, contains: null, shot: false}, {x: x-1, y: y-1, contains: null, shot: false}]));
});

test('at game start not all ships are sunk', () => {
    gameboard.fillCells(10, 10)
    gameboard.updateShipStatus()
    expect(gameboard.allShipsSunk).toBe(false);
});

test('ship placed correctly', () => {
    gameboard.fillCells(10, 10)
    const ship = new Ship(2)
    gameboard.placeShip(ship, [[0, 2], [0, 3]])
    let board = gameboard.getCells()
    expect(board[3].contains).toBe(ship);
});

test('ship receives attack', () => {
    gameboard.fillCells(10, 10)
    const ship = new Ship(2)
    gameboard.placeShip(ship, [[0, 2], [0, 3]])
    gameboard.receiveAttack([0, 2])
    let board = gameboard.getCells()
    expect(board[3].contains.timesHit).toBe(1);
})

test('water receives attack', () => {
    gameboard.fillCells(10, 10)
    const ship = new Ship(2)
    gameboard.placeShip(ship, [[0, 2], [0, 3]])
    gameboard.receiveAttack([0, 1])
    let board = gameboard.getCells()
    expect(board[1].shot).toBe(true);
})

test('all cells around the ship receive shot when ship sinks', () => {
    gameboard.fillCells(10, 10)
    const ship = new Ship(2)
    gameboard.placeShip(ship, [[0, 2], [0, 3]])
    gameboard.shipSinks(ship)
    expect(gameboard.getCells()).toEqual(expect.arrayContaining([
        {x: 1, y: 1, contains: null, shot: true}, 
        {x: 1, y: 2, contains: null, shot: true}, 
        {x: 1, y: 3, contains: null, shot: true}, 
        {x: 1, y: 4, contains: null, shot: true}, 
        {x: 0, y: 1, contains: null, shot: true}, 
        {x: 0, y: 4, contains: null, shot: true}
    ]));
})