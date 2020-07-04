namespace Canvas4 {
    export class Antikorb extends Moveable {
       

        constructor(_position?: Vector) {
            super(_position);
            
        }

    

        draw(): void {
                crc2.restore();
                crc2.save();
                crc2.translate(this.position.x, this.position.y);
                crc2.beginPath();
                //crc2.rotate(Math.random() * 360)
                crc2.moveTo(0, 50);
                crc2.lineTo(0, 15);
                crc2.moveTo(0, 15);
                crc2.lineTo(15, 0);
                crc2.moveTo(0, 15);
                crc2.lineTo(-15, 0);
                crc2.lineWidth = 7;
                crc2.strokeStyle = "#FFFF66";
                crc2.closePath();
                crc2.stroke();
                crc2.restore();
        }

    }
}