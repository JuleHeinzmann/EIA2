"use strict";
var Canvas4;
(function (Canvas4) {
    class Antikorb extends Canvas4.Moveable {
        constructor(_position) {
            super(_position);
        }
        draw() {
            Canvas4.crc2.restore();
            Canvas4.crc2.save();
            Canvas4.crc2.translate(this.position.x, this.position.y);
            Canvas4.crc2.beginPath();
            //crc2.rotate(Math.random() * 360)
            Canvas4.crc2.moveTo(0, 50);
            Canvas4.crc2.lineTo(0, 15);
            Canvas4.crc2.moveTo(0, 15);
            Canvas4.crc2.lineTo(15, 0);
            Canvas4.crc2.moveTo(0, 15);
            Canvas4.crc2.lineTo(-15, 0);
            Canvas4.crc2.lineWidth = 7;
            Canvas4.crc2.strokeStyle = "#FFFF66";
            Canvas4.crc2.closePath();
            Canvas4.crc2.stroke();
            Canvas4.crc2.restore();
        }
    }
    Canvas4.Antikorb = Antikorb;
})(Canvas4 || (Canvas4 = {}));
//# sourceMappingURL=Antikoerper.js.map