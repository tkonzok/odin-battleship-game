class Ship {
    constructor(size) {
        this.size = size;
        this.timesHit = 0;
        this.sunk = false;
    }

    hit() {
        this.timesHit += 1
    }

    isSunk() {
        if (this.timesHit >= this.size) return true;
        return false;
    }
}

export { Ship }