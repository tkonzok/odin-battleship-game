class Player {
    constructor(name) {
        this.name = name,
        this.opponent = null
    }

    registerOpponentGameboard (opp) {
        this.opponent = opp
    }

    attack (coordinates) {
        this.opponent.receiveAttack(coordinates)
    }
}

export { Player }