"use strict";
var Zaubercanvas;
(function (Zaubercanvas) {
    class Circle extends Zaubercanvas.Moveable {
        constructor(_position) {
            super(_position);
            this.radius = 20;
            this.type = "Circle";
        }
        draw(_crc) {
            _crc.save();
            _crc.translate(this.position.x, this.position.y);
            _crc.beginPath();
            _crc.arc(0, 0, this.radius, 0, 2 * Math.PI);
            _crc.fillStyle = "#6666FF";
            _crc.fill();
            _crc.closePath();
            _crc.restore();
        }
        move(_timeslice, _crc) {
            //console.log(this.radius);
            //das mit timeslice noch reinmachen
            if (this.radius <= 40) {
                this.radius += 1;
            }
            else {
                this.radius = 20;
            }
        }
    }
    Zaubercanvas.Circle = Circle;
})(Zaubercanvas || (Zaubercanvas = {}));
//# sourceMappingURL=Circle.js.map