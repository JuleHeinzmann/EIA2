namespace Zaubercanvas {
    export class Circle extends Moveable {
        position: Vector;
        radius: number;
        type: string;
        constructor( _position?: Vector) {
            super(_position);
            this.radius = 20;
            this.type = "Circle";
        }
        draw(_crc: CanvasRenderingContext2D): void {
            _crc.save();
            _crc.translate(this.position.x, this.position.y);
            _crc.beginPath();
            _crc.arc(0, 0, this.radius, 0, 2 * Math.PI);
            _crc.fillStyle = "#6666FF";
            _crc.fill();
            _crc.closePath();
            _crc.restore();
        }
        move(_timeslice: number, _crc: CanvasRenderingContext2D): void {
            //console.log(this.radius);
            //das mit timeslice noch reinmachen
            if (this.radius <= 40) {
                this.radius += 1;
            }
            else {
                this.radius = 20;
            }
        }
    }
}