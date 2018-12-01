class LivingCreature {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
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
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
}


class Grass extends LivingCreature {
    mult() {
        var empty = random(this.chooseCell(0))
        this.multiply++
        if (empty && this.multiply > 4) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 1
            var newGr = new Grass(newX, newY)
            grassArr.push(newGr)
            this.multiply = 0
        }
    }
}
// ---------------------------------------------------------------------------------
class Xotaker extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 6;
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
    chooseCell(character) {
        this.getNewDirections();
        return super.chooseCell(character);
    }
    mult() {
        var empty = random(this.chooseCell(0))
        if (empty && this.energy > 10) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 2
            var newXt = new Xotaker(newX, newY)
            xotakerArr.push(newXt)
        }
    }
    move() {
        var empty = random(this.chooseCell(0))
        this.energy--
        if (empty) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 2
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
    }
    eat() {
        var food = random(this.chooseCell(1))
        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 2
            matrix[this.y][this.x] = 0
            for (var i in grassArr) {
                if (grassArr[i].x == newX && grassArr[i].y == newY) {
                    grassArr.splice(i, 1)
                }
            }
            this.x = newX
            this.y = newY
            this.energy += 2
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in xotakerArr) {
                if (xotakerArr[i].x == this.x && xotakerArr[i].y == this.y) {
                    xotakerArr.splice(i, 1)
                }
            }
        }
    }
}
// -------------------------------------------------------------------------------------------------
class Gishatich extends LivingCreature {
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
// ----------------------------------------------------------------------------------------
class XotaGishatich extends LivingCreature{
    constructor(x, y) {
        super(x, y)
        this.energy = 8
        this.directions = []
    }
    stanalNorKordinatner() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }
    yntrelVandak(ch) {
        this.stanalNorKordinatner();
        return super.chooseCell(ch);
    }
    sharjvel() {
        var datarkVandakner = this.yntrelVandak(0);
        var norVandak = random(datarkVandakner);

        if (norVandak) {
            this.energy--
            matrix[this.y][this.x] = 0;
            matrix[norVandak[1]][norVandak[0]] = 4;

            this.x = norVandak[0];
            this.y = norVandak[1];
        }
        if (this.energy <= 0) {
            this.mernel();
        }
    }
    utel() {
        var datarkVandakner = this.yntrelVandak(3);
        var norVandak = random(datarkVandakner);
        var datarkVandaknererku = this.yntrelVandak(2);
        var norVandakerku = random(datarkVandaknererku);

        if (norVandak) {
            this.energy++
            matrix[this.y][this.x] = 0
            matrix[norVandak[1]][norVandak[0]] = 4

            this.x = norVandak[0]
            this.y = norVandak[1]

            for (var i in gishatichArr) {
                var xotakerObj = gishatichArr[i];
                if (xotakerObj.x == this.x && xotakerObj.y == this.y) {
                    gishatichArr.splice(i, 1);
                }
            }
        }
        else if (norVandakerku) {
            this.energy++
            matrix[this.y][this.x] = 0;
            matrix[norVandakerku[1]][norVandakerku[0]] = 4;

            this.x = norVandakerku[0];
            this.y = norVandakerku[1];

            for (var i in xotakerArr) {
                var xotakerObj = xotakerArr[i];
                // error  ----------------------------------------------------------------------------------          
                if (xotakerObj.x == this.x && xotakerObj.y == this.y) {
                    xotakerArr.splice(i, 1);
                }
            }
        }
        else {
            this.sharjvel();
        }
        if (this.energy >= 10) {
            this.bazmanal();
        }
    }
    bazmanal() {
        var datarkVandakner = this.yntrelVandak(3);
        var norVandak = random(datarkVandakner);

        if (norVandak) {
            var norx = norVandak[0];
            var nory = norVandak[1];
            matrix[nory][norx] = 4;

            var norXotaGishatich = new XotaGishatich(norx, nory);
            xotgishatichArr.push(norXotaGishatich);
            this.energy = 8
            for (var i in gishatichArr) {
                var xotagishatichObj = gishatichArr[i];
                if (xotagishatichObj.x == norx && xotagishatichObj.y == nory) {
                    gishatichArr.splice(i, 1);
                }
            }
        }
    }
    mernel() {
        matrix[this.y][this.x] = 0;
        for (var i in xotgishatichArr) {
            if (this.y == xotgishatichArr[i].y && this.x == xotgishatichArr[i].x) {
                xotgishatichArr.splice(i, 1);
            }
        }
    }
}

// -------------------------------------------------------------------
class Kendanacnox {
    constructor() {

    }
    kendanacnel() {
        var x = Math.floor(Math.random() * matrix[0].length - 1) + 1
        var y = Math.floor(Math.random() * matrix.length - 1) + 1

        if (grassArr.length == 0 && matrix[y][x] == 0) {
            matrix[y][x] = 1
            var norXot = new Grass(x, y)
            grassArr.push(norXot)
        }
        if (xotakerArr.length == 0 && matrix[y][x] == 0) {
            matrix[y][x] = 2
            var norXotaker = new Xotaker(x, y)
            xotakerArr.push(norXotaker)
        }
        if (gishatichArr.length == 0 && matrix[y][x] == 0) {
            matrix[y][x] = 3
            var norGishatich = new Gishatich(x, y)
            gishatichArr.push(norGishatich)
        }
        if (xotgishatichArr.length == 0 && matrix[y][x] == 0) {
            matrix[y][x] = 4
            var norXotagishatich = new XotaGishatich(x, y)
            xotgishatichArr.push(norXotagishatich)
        }

    }
}



