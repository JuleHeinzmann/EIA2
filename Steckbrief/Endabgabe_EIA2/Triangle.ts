namespace Zaubercanvas {
    export class Triangle extends Moveable {
        position: Vector;
        rotation: number;
        type: string;
        constructor( _position?: Vector) {
            super(_position);
            this.rotation = 0;
            this.type = "Triangle";
        }
        draw(_crc: CanvasRenderingContext2D): void {
            _crc.save();
            _crc.translate(this.position.x, this.position.y);
            _crc.rotate(this.rotation * Math.PI / 180);
            _crc.beginPath();
            _crc.moveTo(0, 0);
            _crc.lineTo(40, 0);
            _crc.lineTo(20, -30);
            _crc.lineTo(0, 0);
            _crc.fillStyle = "yellow";
            _crc.fill();
            _crc.restore();
        }
        move(_timeslice: number, _crc: CanvasRenderingContext2D): void {
            this.rotation += Math.floor(_timeslice * 1000);
        }
    }
}