"use strict";
var Canvas4;
(function (Canvas4) {
    class Meschenzelle extends Canvas4.Moveable {
        constructor(_position) {
            super(_position);
            this.infected = false;
            this.radius = 20;
        }
        draw() {
            if (this.infected == true) {
                this.drawinfectedcell();
            }
            else {
                this.drawcell();
            }
        }
        drawcell() {
            let r1 = 3;
            let r2 = 20;
            let particle = new Path2D();
            let gradient = Canvas4.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
            particle.arc(0, 0, r2, 0, 2 * Math.PI);
            //gradient.addColorStop(0, "HSLA(0, 100%, 100%, 1)");
            gradient.addColorStop(0, "rgb(105,105,105)");
            gradient.addColorStop(0.1, "rgb(176,224,230)");
            gradient.addColorStop(1, "rgb(70,130,180)");
            Canvas4.crc2.save();
            Canvas4.crc2.translate(this.position.x, this.position.y);
            Canvas4.crc2.fillStyle = gradient;
            Canvas4.crc2.fill(particle);
            Canvas4.crc2.restore();
        }
        drawinfectedcell() {
            let r1 = 3;
            let r2 = 20;
            let particle = new Path2D();
            let gradient = Canvas4.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
            particle.arc(0, 0, r2, 0, 2 * Math.PI);
            //gradient.addColorStop(0, "HSLA(0, 100%, 100%, 1)");
            gradient.addColorStop(0, "rgb(0,255,0)");
            gradient.addColorStop(0.1, "rgb(0,100,0)");
            gradient.addColorStop(1, "rgb(128,128,128)");
            Canvas4.crc2.save();
            Canvas4.crc2.translate(this.position.x, this.position.y);
            Canvas4.crc2.fillStyle = gradient;
            Canvas4.crc2.fill(particle);
            Canvas4.crc2.restore();
        }
        //bisschen abgeschaut bei Valentina Schwan 
        ishit(_positionvirus, _radiusvirus) {
            let distancex = this.position.x - _positionvirus.x;
            let distancey = this.position.y - _positionvirus.y;
            let radius = _radiusvirus + this.radius + 10;
            let distance = (distancex * distancex) + (distancey * distancey);
            if (distance <= radius * radius) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    Canvas4.Meschenzelle = Meschenzelle;
})(Canvas4 || (Canvas4 = {}));
//# sourceMappingURL=Menschenzelle.js.map