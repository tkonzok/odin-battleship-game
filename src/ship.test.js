import { Ship } from './ship'

const ship = new Ship(5)
ship.hit()

test('ship size matches initialization', () => {
    expect(ship.size).toBe(5);
});

test('ship not sunk', () => {
    expect(ship.isSunk()).toBe(false);
});

test('ship hit one time after hit one time', () => {
    expect(ship.timesHit).toBe(1);
});

test('ship sunk after five hits', () => {
    ship.hit()
    ship.hit()
    ship.hit()
    ship.hit()
    expect(ship.isSunk()).toBe(true);
});