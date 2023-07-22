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
    gameboard.placeShip(ship, [0, 2], true)
    let board = gameboard.getCells()
    expect(board[3].contains).toBe(ship);
});

test('ship receives attack', () => {
    gameboard.fillCells(10, 10)
    const ship = new Ship(2)
    gameboard.placeShip(ship, [0, 2], true)
    gameboard.receiveAttack([0, 2])
    let board = gameboard.getCells()
    expect(board[3].contains.timesHit).toBe(1);
})

test('water receives attack', () => {
    gameboard.fillCells(10, 10)
    const ship = new Ship(2)
    gameboard.placeShip(ship, [0, 2], true)
    gameboard.receiveAttack([0, 1])
    let board = gameboard.getCells()
    expect(board[1].shot).toBe(true);
})

test('all diagonal cells around the hit cell with ship receive shot', () => {
    gameboard.fillCells()
    const ship = new Ship(2)
    gameboard.placeShip(ship, [0, 2], true)
    gameboard.shipHit([1, 1])
    expect(gameboard.getCells()).toEqual(expect.arrayContaining([
        {x: 0, y: 0, contains: null, shot: true}, 
        {x: 0, y: 2, contains: ship, shot: true}, 
        {x: 2, y: 0, contains: null, shot: true}, 
        {x: 2, y: 2, contains: null, shot: true}
    ]));
})

test('all cells around the ship receive shot when ship sinks', () => {
    gameboard.fillCells(10, 10)
    const ship = new Ship(2)
    gameboard.placeShip(ship, [0, 2], true)
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

test('only available cells to place ship are listed', () => {
    gameboard.fillCells(10, 10)
    const ship = new Ship(2)
    gameboard.placeShip(ship, [0, 2], true)
    const ship2 = new Ship(3)
    const result = gameboard.getAvailableCellsToPlaceShip(ship2.size)
    expect(result).toEqual(expect.arrayContaining([
        {x: 0, y: 5, contains: null, shot: false}, 
        {x: 0, y: 7, contains: null, shot: false}, 
        {x: 2, y: 2, contains: null, shot: false}
    ]));
})

test('not available cells to place ship are not listed', () => {
    gameboard.fillCells(10, 10)
    const ship = new Ship(2)
    gameboard.placeShip(ship, [0, 2], true)
    const ship2 = new Ship(3)
    const result = gameboard.getAvailableCellsToPlaceShip(ship2.size)
    expect(result).not.toEqual(expect.arrayContaining([
        {x: 0, y: 3, contains: ship, shot: false}, 
        {x: 0, y: 4, contains: null, shot: false}, 
        {x: 1, y: 2, contains: null, shot: false}, 
        {x: 0, y: 8, contains: null, shot: false}, 
        {x: 1, y: 9, contains: null, shot: false}
    ]));
})

