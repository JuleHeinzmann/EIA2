"use strict";
var Zaubercanvas;
(function (Zaubercanvas) {
    class Square extends Zaubercanvas.Moveable {
        constructor(_position) {
            super(_position);
            this.type = "Square";
        }
        draw(_crc) {
            _crc.save();
            _crc.translate(this.position.x, this.position.y);
            _crc.beginPath();
            _crc.fillStyle = "#32CD32";
            _crc.fillRect(0, 0, 40, 40);
            _crc.restore();
        }
    }
    Zaubercanvas.Square = Square;
})(Zaubercanvas || (Zaubercanvas = {}));
//# sourceMappingURL=Square.js.map