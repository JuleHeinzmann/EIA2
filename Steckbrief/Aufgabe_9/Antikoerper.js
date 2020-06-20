"use strict";
var Canvas2;
(function (Canvas2) {
    class Antikorb {
        constructor(_size, _position) {
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
            Canvas2.crc2.translate(this.position.x, this.position.y);
            Canvas2.crc2.beginPath();
            //crc2.rotate(Math.random() * 360)
            Canvas2.crc2.moveTo(0, 50);
            Canvas2.crc2.lineTo(0, 15);
            Canvas2.crc2.moveTo(0, 15);
            Canvas2.crc2.lineTo(15, 0);
            Canvas2.crc2.moveTo(0, 15);
            Canvas2.crc2.lineTo(-15, 0);
            Canvas2.crc2.lineWidth = 7;
            Canvas2.crc2.strokeStyle = "#FFFF66";
            Canvas2.crc2.closePath();
            Canvas2.crc2.stroke();
            Canvas2.crc2.restore();
        }
    }
    Canvas2.Antikorb = Antikorb;
})(Canvas2 || (Canvas2 = {}));
//# sourceMappingURL=Antikoerper.js.map