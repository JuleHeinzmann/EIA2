namespace Zaubercanvas {
    export class Square extends Moveable {
        position: Vector;
        type: string;
        constructor( _position?: Vector) {
            super(_position);
            this.type = "Square";
        }
        draw(_crc: CanvasRenderingContext2D): void {
            _crc.save();
            _crc.translate(this.position.x, this.position.y);
            _crc.beginPath();
            _crc.fillStyle = "#32CD32";
            _crc.fillRect(0, 0, 40, 40);
            _crc.restore();
        }
    }
}