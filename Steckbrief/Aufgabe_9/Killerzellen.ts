namespace Canvas2 {
    export class Killerzelle {
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
            let x: number = 2* Math.random() + 30;
            let y:number =  2* Math.random() +40;
            crc2.translate(this.position.x, this.position.y);
            crc2.beginPath();
            let gradient: CanvasGradient = crc2.createLinearGradient(this.position.x,this.position.y,x,y);
            gradient.addColorStop(0, "#000000");
            gradient.addColorStop(0.5, "#FFFF52")
            gradient.addColorStop(1,"#BBE549")
            crc2.ellipse(100,50,x,y,0,90,10,true);
            crc2.strokeStyle = "#E5D549"
            crc2.fillStyle =  gradient;
            crc2.fill();
            crc2.closePath();
            crc2.stroke();
        }

    }
}