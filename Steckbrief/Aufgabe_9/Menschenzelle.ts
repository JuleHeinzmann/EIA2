namespace Canvas2 {
    export class Meschenzelle {
        position: Vector;
        velocity: Vector;
        type: number;
        size: number;

        constructor(_size: number, _position?: Vector) {
            console.log("Meschenzelle");
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
            let r1: number = 3;
            let r2: number = 20;
            let particle: Path2D = new Path2D();
            let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
    
            particle.arc(0, 0, r2, 0, 2 * Math.PI);
            //gradient.addColorStop(0, "HSLA(0, 100%, 100%, 1)");
            gradient.addColorStop(0, "rgb(105,105,105)");
            gradient.addColorStop(0.1,"rgb(176,224,230)")
            gradient.addColorStop(1, "rgb(70,130,180)");
    
            crc2.save();
        
            crc2.translate(this.position.x, this.position.y);
            crc2.fillStyle = gradient;
            crc2.fill(particle);
            crc2.restore();
        }

    }
}