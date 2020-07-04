"use strict";
var Canvas4;
(function (Canvas4) {
    class Corona extends Canvas4.Moveable {
        constructor(_position) {
            super(_position);
            this.radius = 30;
        }
        move(_timeslice) {
            super.move(_timeslice);
        }
        draw() {
            Canvas4.crc2.restore();
            Canvas4.crc2.save();
            Canvas4.crc2.translate(this.position.x, this.position.y);
            for (let i = 0; i < 9; i++) {
                Canvas4.crc2.beginPath();
                Canvas4.crc2.rotate(30);
                Canvas4.crc2.moveTo(0, 40);
                Canvas4.crc2.lineTo(10, 40);
                Canvas4.crc2.lineTo(5, 30);
                Canvas4.crc2.lineTo(0, 40);
                Canvas4.crc2.strokeStyle = "#777777";
                Canvas4.crc2.lineWidth = 1;
                Canvas4.crc2.fillStyle = "#FF0000";
                Canvas4.crc2.fill();
                Canvas4.crc2.stroke();
            }
            Canvas4.crc2.beginPath();
            Canvas4.crc2.arc(0, 0, 30, 0, 2 * Math.PI);
            Canvas4.crc2.fillStyle = "#8B0000";
            Canvas4.crc2.fill();
            Canvas4.crc2.closePath();
            Canvas4.crc2.restore();
        }
    }
    Canvas4.Corona = Corona;
})(Canvas4 || (Canvas4 = {}));
//# sourceMappingURL=Corona.js.map