namespace Canvas4 {
    export class Meschenzelle extends Moveable{
        
        infected: boolean = false;
        radius: number;

        constructor( _position?: Vector) {
            super(_position);
            this.radius = 20;
        }

        

        draw(): void {
            if (this.infected == true) {
                this.drawinfectedcell();
            }
            else {
                this.drawcell();
            }
        }

        drawcell(): void {
            let r1: number = 3;
            let r2: number = 20;
            let particle: Path2D = new Path2D();
            let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
    
            particle.arc(0, 0, r2, 0, 2 * Math.PI);
            //gradient.addColorStop(0, "HSLA(0, 100%, 100%, 1)");
            gradient.addColorStop(0, "rgb(105,105,105)");
            gradient.addColorStop(0.1, "rgb(176,224,230)");
            gradient.addColorStop(1, "rgb(70,130,180)");
    
            crc2.save();
        
            crc2.translate(this.position.x, this.position.y);
            crc2.fillStyle = gradient;
            crc2.fill(particle);
            crc2.restore();
        
        }
        drawinfectedcell(): void {
            let r1: number = 3;
            let r2: number = 20;
            let particle: Path2D = new Path2D();
            let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
    
            particle.arc(0, 0, r2, 0, 2 * Math.PI);
            //gradient.addColorStop(0, "HSLA(0, 100%, 100%, 1)");
            gradient.addColorStop(0, "rgb(0,255,0)");
            gradient.addColorStop(0.1, "rgb(0,100,0)");
            gradient.addColorStop(1, "rgb(128,128,128)");
    
            crc2.save();
        
            crc2.translate(this.position.x, this.position.y);
            crc2.fillStyle = gradient;
            crc2.fill(particle);
            crc2.restore();
        

    }

    //bisschen abgeschaut bei Valentina Schwan 
    ishit(_positionvirus: Vector, _radiusvirus: number ): boolean {
        let distancex: number = this.position.x - _positionvirus.x;
        let distancey: number = this.position.y - _positionvirus.y;
        let radius: number = _radiusvirus + this.radius + 10;
        let distance: number = (distancex * distancex) + (distancey * distancey);
        if (distance <= radius * radius) {
            return true;
        }
        else {
            return false;
        }
    }
}

}