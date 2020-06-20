namespace Canvas2 {
    export class Corona {
        position: Vector;
        velocity: Vector;
        type: number;
        size: number;

        constructor(_size: number, _position?: Vector) {
            console.log("antikorb");
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
            for (let i = 0; i < 9; i++) {
                crc2.beginPath();
                crc2.rotate(30);
                crc2.moveTo(0, 40);
                crc2.lineTo(10, 40);
                crc2.lineTo(5,30);
                crc2.lineTo(0,40)
                crc2.strokeStyle = "#777777";
                crc2.lineWidth = 1;
                crc2.fillStyle ="#FF0000"
                crc2.fill();
                crc2.stroke();
            }
            crc2.beginPath();
            crc2.arc(0, 0, 30, 0, 2 * Math.PI);
            crc2.fillStyle = "#8B0000";
            crc2.fill();
            crc2.closePath();
            crc2.restore();
        }

        
    }
}