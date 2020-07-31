"use strict";
var Zaubercanvas;
(function (Zaubercanvas) {
    class Moveable {
        constructor(_position) {
            if (_position)
                this.position = _position;
            else
                this.position = new Zaubercanvas.Vector(30, 30);
            this.velocity = new Zaubercanvas.Vector(0, 0);
            this.velocity.random(100, 200);
            //this.size = _size; 
        }
        move(_timeslice, _crc) {
            let offset = new Zaubercanvas.Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x < 0)
                this.position.x += _crc.canvas.width;
            if (this.position.y < 0)
                this.position.y += _crc.canvas.height;
            if (this.position.x > _crc.canvas.width)
                this.position.x -= _crc.canvas.width;
            if (this.position.y > _crc.canvas.height)
                this.position.y -= _crc.canvas.height;
        }
        draw(_crc) {
            //console.log("moveable")
        }
    }
    Zaubercanvas.Moveable = Moveable;
})(Zaubercanvas || (Zaubercanvas = {}));
//# sourceMappingURL=Moveable.js.map