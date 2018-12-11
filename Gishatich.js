var LivingCreature = require('./LivingCreature.js');
module.exports = class Gishatich extends LivingCreature {
    constructor(x, y) {
        super(x,y)
        this.energy = 10
        this.directions = [];
    }
    getNewDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    yntrelVandak(ch) {
        this.getNewDirections();
        return super.chooseCell(ch)
    }
    sharjvel() {
        var datarkVandakner = this.yntrelVandak(0);
        var norVandak = random(datarkVandakner);

        if (norVandak) {
            this.mernelukyanq--
            matrix[this.y][this.x] = 0
            matrix[norVandak[1]][norVandak[0]] = 3

            this.x = norVandak[0]
            this.y = norVandak[1]
            this.energy -= 2
        }

        if (this.energy <= 0) {
            this.mernel()
        }
    }
    utel() {
        var datarkVandakner = this.yntrelVandak(2)
        var norVandak = random(datarkVandakner)

        if (norVandak) {
            this.kyanq++
            this.mernelukyanq = 20
            matrix[this.y][this.x] = 0;
            matrix[norVandak[1]][norVandak[0]] = 3

            this.x = norVandak[0]
            this.y = norVandak[1]

            for (var i in xotakerArr) {
                var xotakerObj = xotakerArr[i]
                if (xotakerObj.x == this.x && xotakerObj.y == this.y) {
                    xotakerArr.splice(i, 1);
                }
            }
            this.energy += 2
        }
        else {
            this.sharjvel();
        }
        if (this.energy >= 13) {
            this.bazmanal();
        }
    }
    bazmanal() {
        var datarkVandakner = this.yntrelVandak(2);
        var norVandak = random(datarkVandakner);

        if (norVandak) {
            var norx = norVandak[0];
            var nory = norVandak[1];
            matrix[nory][norx] = 3;

            var norGishatich = new Gishatich(norx, nory);
            gishatichArr.push(norGishatich);
            this.energy = 5
            for (var i in xotakerArr) {
                var xotakerObj = xotakerArr[i];
                if (xotakerObj.x == norx && xotakerObj.y == nory) {
                    xotakerArr.splice(i, 1);
                }
            }
        }
    }
    mernel() {

        matrix[this.y][this.x] = 0;
        for (var i in gishatichArr) {
            if (this.y == gishatichArr[i].y && this.x == gishatichArr[i].x) {
                gishatichArr.splice(i, 1);
            }
        }
    }
}