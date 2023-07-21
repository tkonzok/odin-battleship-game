import { Gameboard } from './gameboard'
import { Player } from './player'

const playerGameboard = new Gameboard
playerGameboard.fillCells()
const compGameboard = new Gameboard
compGameboard.fillCells()

const player = new Player('Tobias')
player.registerOpponent(compGameboard)

test('get player name', () => {
    expect(player.name).toBe('Tobias');
});

test('attacks gameboard', () => {
    player.attack([0, 2])
    expect(compGameboard.getCells()).toEqual(expect.arrayContaining([{x: 0, y: 2, contains: null, shot: true}, {x: 0, y: 3, contains: null, shot: false}]));
});