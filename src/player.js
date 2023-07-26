class Player {
    constructor(name, player) {
        this.name = name,
        this.player = player
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