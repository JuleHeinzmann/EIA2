namespace Canvas2 {
    export class Antikorb {
        position: Vector;
        velocity: Vector;
        type: number;
        size: number;

        constructor(_size: number, _position?: Vector) {
            console.log(this.size)

            if (_position)
                this.position = _position;
            else
                this.position = new Vector(30, 30);
                
            this.velocity = new Vector(0, 0);
            this.velocity.random(100, 200);

            this.type = Math.floor(Math.random() * 4);
            this.size = _size;
        }

        move(_timeslice: number): void {
            
            let offset: Vector = new Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);

            if (this.position.x < 0)
                this.position.x += crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += crc2.canvas.height;
            if (this.position.x > crc2.canvas.width)
                this.position.x -= crc2.canvas.width;
            if (this.position.y > crc2.canvas.height)
                this.position.y -= crc2.canvas.height;
        }

        draw(): void {
                crc2.restore();
                crc2.save();
                crc2.translate(this.position.x, this.position.y);
                crc2.beginPath();
                //crc2.rotate(Math.random() * 360)
                crc2.moveTo(0,50);
                crc2.lineTo(0,15);
                crc2.moveTo(0,15);
                crc2.lineTo(15,0);
                crc2.moveTo(0,15);
                crc2.lineTo(-15,0)
                crc2.lineWidth = 7;
                crc2.strokeStyle = "#FFFF66"
                crc2.closePath();
                crc2.stroke();
                crc2.restore();
        }

    }
}