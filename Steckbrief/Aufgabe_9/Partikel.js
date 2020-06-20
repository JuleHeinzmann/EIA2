"use strict";
var Canvas2;
(function (Canvas2) {
    class Partikel {
        constructor(_size, _position) {
            //console.log("antikorb");
            console.log(this.size);
            if (_position)
                this.position = _position;
            else
                this.position = new Canvas2.Vector(0, 0);
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
            Canvas2.crc2.restore();
            Canvas2.crc2.save();
            let x = 5 * Math.random() + 5;
            let y = 5 * Math.random() + 5;
            Canvas2.crc2.translate(this.position.x, this.position.y);
            Canvas2.crc2.beginPath();
            Canvas2.crc2.ellipse(100, 50, x, y, 0, 90, 10, true);
            Canvas2.crc2.strokeStyle = "#E5D549";
            Canvas2.crc2.fillStyle = "rgba(243,130,130,0.3)";
            Canvas2.crc2.fill();
            Canvas2.crc2.closePath();
            Canvas2.crc2.stroke();
            Canvas2.crc2.restore();
        }
    }
    Canvas2.Partikel = Partikel;
})(Canvas2 || (Canvas2 = {}));
//# sourceMappingURL=Partikel.js.map