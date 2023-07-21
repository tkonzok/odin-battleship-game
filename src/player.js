class Player {
    constructor(name) {
        this.name = name,
        this.opponent = null
    }

    registerOpponent (opp) {
        this.opponent = opp
    }

    attack (coordinates) {
        this.opponent.receiveAttack(coordinates)
    }
}

export { Player }