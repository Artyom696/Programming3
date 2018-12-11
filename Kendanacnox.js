module.exports = class Kendanacnox {
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

