import { Gameboard } from './gameboard'
import { Ship } from './ship'
import { Player } from './player'
import { CompLogic } from './complogic'

const playerGameboard = new Gameboard
playerGameboard.fillCells()
const compGameboard = new Gameboard
compGameboard.fillCells()
const ship = new Ship(2)

const compLogic = new CompLogic(compGameboard, playerGameboard)

const player = new Player('Player')
player.registerOpponent(compGameboard)
const comp = new Player('Computer')
comp.registerOpponent(playerGameboard)

playerGameboard.placeShip(ship, [[0, 2], [0, 3]])
comp.attack([0, 3])

test('pick available cell to attack', () => {
    const availableCells = compLogic.getAvailableCells()
    expect(availableCells).toEqual(expect.arrayContaining([{x: 0, y: 1, contains: null, shot: false}, {x: 0, y: 0, contains: null, shot: false}]));
});

test('not picking cell which was shot before', () => {
    const availableCells = compLogic.getAvailableCells()
    expect(availableCells).not.toEqual(expect.arrayContaining([{x: 0, y: 3, contains: ship, shot: true}]));
});

test('get available neighbor cells', () => {
    const neighborCells = compLogic.getNeighborCells([0, 2])
    expect(neighborCells).toEqual(expect.arrayContaining([{x: 0, y: 1, contains: null, shot: false}, {x: 1, y: 2, contains: null, shot: false}, {x: 0, y: 3, contains: ship, shot: true}]));
});

test('not get neighbor cells out of board', () => {
    const neighborCells = compLogic.getNeighborCells([0, 2])
    expect(neighborCells).not.toEqual(expect.arrayContaining([{x: -1, y: 2, contains: null, shot: false}]));
});

for (let i = 0; i < 10; i++) {
    test('return one random available cell', () => {
        const availableCells = compLogic.getAvailableCells()
        const pick = compLogic.randomPickCell(availableCells)
        const pickIsValid = availableCells.filter(x => x == pick)
        expect(pickIsValid[0]).toBe(pick);
    });
}
