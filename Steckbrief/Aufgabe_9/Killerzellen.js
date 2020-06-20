"use strict";
var Canvas2;
(function (Canvas2) {
    class Killerzelle {
        constructor(_size, _position) {
            console.log("antikorb");
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
            Canvas2.crc2.restore();
            Canvas2.crc2.save();
            let x = 2 * Math.random() + 30;
            let y = 2 * Math.random() + 40;
            Canvas2.crc2.translate(this.position.x, this.position.y);
            Canvas2.crc2.beginPath();
            let gradient = Canvas2.crc2.createLinearGradient(this.position.x, this.position.y, x, y);
            gradient.addColorStop(0, "#000000");
            gradient.addColorStop(0.5, "#FFFF52");
            gradient.addColorStop(1, "#BBE549");
            Canvas2.crc2.ellipse(100, 50, x, y, 0, 90, 10, true);
            Canvas2.crc2.strokeStyle = "#E5D549";
            Canvas2.crc2.fillStyle = gradient;
            Canvas2.crc2.fill();
            Canvas2.crc2.closePath();
            Canvas2.crc2.stroke();
        }
    }
    Canvas2.Killerzelle = Killerzelle;
})(Canvas2 || (Canvas2 = {}));
//# sourceMappingURL=Killerzellen.js.map