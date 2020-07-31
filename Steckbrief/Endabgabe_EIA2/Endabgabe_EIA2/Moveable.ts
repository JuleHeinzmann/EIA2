namespace Zaubercanvas {
    export class Moveable {
        position: Vector;
        velocity: Vector;
        //size: number;
        type: string;

        constructor( _position?: Vector) {
      
            if (_position)
                this.position = _position;
            else
                this.position = new Vector(30, 30);
                
            this.velocity = new Vector(0, 0);
            this.velocity.random(100, 200);
            //this.size = _size; 
        }

        move(_timeslice: number, _crc: CanvasRenderingContext2D): void {
            let offset: Vector = new Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);

            if (this.position.x < 0)
                this.position.x += _crc.canvas.width;
            if (this.position.y < 0)
                this.position.y += _crc.canvas.height;
            if (this.position.x > _crc.canvas.width)
                this.position.x -= _crc.canvas.width;
            if (this.position.y > _crc.canvas.height)
                this.position.y -= _crc.canvas.height;
        }
        draw(_crc: CanvasRenderingContext2D): void {
            //console.log("moveable")
        }

    }
}