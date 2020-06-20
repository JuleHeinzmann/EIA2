"use strict";
var Canvas2;
(function (Canvas2) {
    class Corona {
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
            Canvas2.crc2.translate(this.position.x, this.position.y);
            for (let i = 0; i < 9; i++) {
                Canvas2.crc2.beginPath();
                Canvas2.crc2.rotate(30);
                Canvas2.crc2.moveTo(0, 40);
                Canvas2.crc2.lineTo(10, 40);
                Canvas2.crc2.lineTo(5, 30);
                Canvas2.crc2.lineTo(0, 40);
                Canvas2.crc2.strokeStyle = "#777777";
                Canvas2.crc2.lineWidth = 1;
                Canvas2.crc2.fillStyle = "#FF0000";
                Canvas2.crc2.fill();
                Canvas2.crc2.stroke();
            }
            Canvas2.crc2.beginPath();
            Canvas2.crc2.arc(0, 0, 30, 0, 2 * Math.PI);
            Canvas2.crc2.fillStyle = "#8B0000";
            Canvas2.crc2.fill();
            Canvas2.crc2.closePath();
            Canvas2.crc2.restore();
        }
    }
    Canvas2.Corona = Corona;
})(Canvas2 || (Canvas2 = {}));
//# sourceMappingURL=Corona.js.map