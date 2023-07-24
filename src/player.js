class Player {
    constructor(name) {
        this.name = name,
        this.opponent = null
    }

    registerOpponentGameboard (opp) {
        this.opponent = opp
    }

    attack (coordinates) {
        let ship = this.opponent.receiveAttack(coordinates)
        return ship
    }
}

export { Player }