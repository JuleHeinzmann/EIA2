"use strict";
var Canvas4;
(function (Canvas4) {
    class Killerzelle extends Canvas4.Moveable {
        constructor(_position) {
            super(_position);
        }
        draw() {
            Canvas4.crc2.restore();
            Canvas4.crc2.save();
            let x = 2 * Math.random() + 30;
            let y = 2 * Math.random() + 40;
            Canvas4.crc2.translate(this.position.x, this.position.y);
            Canvas4.crc2.beginPath();
            let gradient = Canvas4.crc2.createLinearGradient(this.position.x, this.position.y, x, y);
            gradient.addColorStop(0, "#000000");
            gradient.addColorStop(0.5, "#FFFF52");
            gradient.addColorStop(1, " #BBE549");
            Canvas4.crc2.ellipse(100, 50, x, y, 0, 90, 10, true);
            Canvas4.crc2.strokeStyle = "#E5D549";
            Canvas4.crc2.fillStyle = gradient;
            Canvas4.crc2.fill();
            Canvas4.crc2.closePath();
            Canvas4.crc2.stroke();
        }
    }
    Canvas4.Killerzelle = Killerzelle;
})(Canvas4 || (Canvas4 = {}));
//# sourceMappingURL=Killerzellen.js.map