var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Grass = require('./Grass.js');
var Xotaker = require('./Xotaker.js');
var Gishatich = require('./Gishatich.js');
var XotaGishatich = require('./Xotagishatich.js');
var Kendanacnox = require('./Kendanacnox.js');
var messages = [];
                   

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);



var matrix = []
var qanak = Math.floor(Math.random() * 60) + 20
for (var y = 0; y < qanak; y++) {
    matrix[y] = [];
    for (var x = 0; x < qanak; x++) {
        if (Math.random() < 0.1) {
            matrix[y][x] = 1;

        }
        else if (Math.random() < 0.01) {
            matrix[y][x] = 2;
        }
        else if (Math.random() < 0.02) {
            matrix[y][x] = 3;
        }
        else if (Math.random() < 0.02) {
            matrix[y][x] = 4;
        }
        else {
            matrix[y][x] = 0;
        }
    }
}


var side = 10

var grassArr = []
var xotakerArr = []
var gishatichArr = []
var xotgishatichArr = []
var kendanacnox = new Kendanacnox()


for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {

        if (matrix[y][x] == 1) {
            var a = new Grass(x, y);
            grassArr.push(a)
        }
        else if (matrix[y][x] == 2) {
            var a = new Xotaker(x, y);
            xotakerArr.push(a)
        }
        else if (matrix[y][x] == 3) {
            var a = new Gishatich(x, y);
            gishatichArr.push(a)
        }
        else if (matrix[y][x] == 4) {
            var a = new XotaGishatich(x, y);
            xotgishatichArr.push(a)
        }

    }
}

// function setup() {
//     frameRate(10);
//     var myCanvas = createCanvas(matrix[0].length * side, matrix.length * side);
//     myCanvas.parent("canvas");
//     background('#acacac');
// }

function draw() {
    // for (var y = 0; y < matrix.length; y++) {
    //     for (var x = 0; x < matrix[y].length; x++) {

    //         if (matrix[y][x] == 1) {
    //             fill("green")
    //         }
    //         else if (matrix[y][x] == 2) {
    //             fill("yellow")
    //         }
    //         else if (matrix[y][x] == 3) {
    //             fill("red")
    //         }
    //         else if (matrix[y][x] == 4) {
    //             fill("black")
    //         }
    //         else if (matrix[y][x] == 0) {
    //             fill("#acacac")
    //         }

    //         rect(x * side, y * side, side, side)





    //     }
    // }
    for (var i in grassArr) {
        grassArr[i].mult()
    }
    for (var i in xotakerArr) {
        xotakerArr[i].move()
        xotakerArr[i].mult()
        xotakerArr[i].eat()
        xotakerArr[i].die()
    }
    for (var i in gishatichArr) {
        gishatichArr[i].utel();
    }
    for (var i in xotgishatichArr) {
        xotgishatichArr[i].utel();
    }
    kendanacnox.kendanacnel()

}
var test = setInterval(draw, 200);
console.log(test);


