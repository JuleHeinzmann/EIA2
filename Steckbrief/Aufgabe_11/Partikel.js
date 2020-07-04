"use strict";
var Canvas4;
(function (Canvas4) {
    class Partikel extends Canvas4.Moveable {
        constructor(_position) {
            super(_position);
        }
        move(_timeslice) {
            super.move(_timeslice);
        }
        draw() {
            Canvas4.crc2.restore();
            Canvas4.crc2.save();
            let x = 5 * Math.random() + 5;
            let y = 5 * Math.random() + 5;
            Canvas4.crc2.translate(this.position.x, this.position.y);
            Canvas4.crc2.beginPath();
            Canvas4.crc2.ellipse(100, 50, x, y, 0, 90, 10, true);
            Canvas4.crc2.strokeStyle = "#E5D549";
            Canvas4.crc2.fillStyle = "rgba(243,130,130,0.3)";
            Canvas4.crc2.fill();
            Canvas4.crc2.closePath();
            Canvas4.crc2.stroke();
            Canvas4.crc2.restore();
        }
    }
    Canvas4.Partikel = Partikel;
})(Canvas4 || (Canvas4 = {}));
//# sourceMappingURL=Partikel.js.map