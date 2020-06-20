"use strict";
var Canvas2;
(function (Canvas2) {
    class Meschenzelle {
        constructor(_size, _position) {
            console.log("Meschenzelle");
            console.log(this.size);
            if (_position)
                this.position = _position;
            else
                this.position = new Canvas2.Vector(30, 30);
            this.velocity = new Canvas2.Vector(0, 0);
            this.velocity.random(100, 200);
            this.type = Math.floor(Math.random() * 4);
            this.size = _size;
        }
        move(_timeslice) {
            let offset = new Canvas2.Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x < 0)
                this.position.x += Canvas2.crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += Canvas2.crc2.canvas.height;
            if (this.position.x > Canvas2.crc2.canvas.width)
                this.position.x -= Canvas2.crc2.canvas.width;
            if (this.position.y > Canvas2.crc2.canvas.height)
                this.position.y -= Canvas2.crc2.canvas.height;
        }
        draw() {
            let r1 = 3;
            let r2 = 20;
            let particle = new Path2D();
            let gradient = Canvas2.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
            particle.arc(0, 0, r2, 0, 2 * Math.PI);
            //gradient.addColorStop(0, "HSLA(0, 100%, 100%, 1)");
            gradient.addColorStop(0, "rgb(105,105,105)");
            gradient.addColorStop(0.1, "rgb(176,224,230)");
            gradient.addColorStop(1, "rgb(70,130,180)");
            Canvas2.crc2.save();
            Canvas2.crc2.translate(this.position.x, this.position.y);
            Canvas2.crc2.fillStyle = gradient;
            Canvas2.crc2.fill(particle);
            Canvas2.crc2.restore();
        }
    }
    Canvas2.Meschenzelle = Meschenzelle;
})(Canvas2 || (Canvas2 = {}));
//# sourceMappingURL=Menschenzelle.js.map