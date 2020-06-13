namespace Canvas {
    window.addEventListener("load", handleLoad); 
    interface Vector {
        x: number;
        y: number;
    }
    let crc2: CanvasRenderingContext2D;
    function handleLoad(_load: Event): void {
        
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        drawBackground();
        drawHumancell({ x: 200, y: 300 }, { x: 150, y: 200 });
        //createCoronaCell({ x: 200, y: 200 })
        drawCoronaCell({ x: 150, y: 200 });
        drawantikoerper({ x: 100, y: 150 });
        drawkillercell({ x: 100, y: 150 });
        drawparticles({ x: 160, y: 690 });

    }
    function drawBackground(): void {
        //console.log("hallo");
        
        let pattern: CanvasRenderingContext2D = <CanvasRenderingContext2D> document.createElement("canvas").getContext("2d");
        pattern.canvas.width = 40;
        pattern.canvas.height = 20;

        pattern.fillStyle = "rgba(120,20,0,0.2)";
        pattern.strokeStyle = "rgb(0,0,0,0.2)";
        pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
        pattern.moveTo(0, 10);
        pattern.lineTo(10, 10);
        pattern.lineTo(20, 0);
        pattern.lineTo(30, 0);
        pattern.lineTo(40, 10);
        pattern.lineTo(30, 20);
        pattern.lineTo(20, 20);
        pattern.lineTo(10, 10);
        pattern.stroke();

        crc2.fillStyle = <CanvasRenderingContext2D>crc2.createPattern(pattern.canvas, "repeat");
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    
    }
    
    function drawHumancell(_position: Vector, _size: Vector): void {

        let nParticles: number = 5;
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
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;

        for (let drawn: number = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let x: number = (Math.random() - 0.7) * _size.x ;
            let y: number = - ((Math.random() - 0.7) * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }
        crc2.restore();
    }
    function createCoronaCell(_position: Vector): void {
        crc2.restore();
        crc2.save();
        crc2.translate(_position.x, _position.y);
        for (let i: number = 0; i < 9; i++) {
            crc2.beginPath();
            crc2.rotate(30);
            crc2.moveTo(0, 40);
            crc2.lineTo(10, 40);
            crc2.lineTo(5, 30);
            crc2.lineTo(0, 40);
            crc2.strokeStyle = "#777777";
            crc2.lineWidth = 1;
            crc2.fillStyle = "#FF0000";
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
    function drawCoronaCell(_size: Vector): void {
        let nParticles: number = 5;
        for (let drawn: number = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let x: number = (Math.random() + 0.5) * _size.x ;
            let y: number = - ((Math.random() - 3.5) * _size.y);
            crc2.translate(x, y);
            createCoronaCell({ x, y});
            crc2.restore();
        }
        crc2.restore();
    }
    function createantikoerper(_position: Vector): void {
        crc2.restore();
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        crc2.rotate(Math.random() * 360);
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
    }
    function drawantikoerper(_size: Vector): void {
        let nParticles: number = 3;
        for (let drawn: number = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let x: number = (Math.random() + 0.5) * _size.x ;
            let y: number = - ((Math.random() - 1) * _size.y);
            crc2.translate(x, y);
            createantikoerper({ x, y});
            crc2.restore();
        }
        crc2.restore();
    }
    function createkillercell(_position: Vector): void {
        crc2.restore();
        crc2.save();
        let x: number = 30 * Math.random() + 15;
        let y: number = 20 * Math.random() + 15;
        console.log(x, y);
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        let gradient: CanvasGradient = crc2.createLinearGradient(_position.x, _position.y, x, y);
        gradient.addColorStop(0, "#E5D549");
        gradient.addColorStop(0.5, "#F3EC82");
        gradient.addColorStop(1, "#BBE549");
        crc2.ellipse(100, 50, x, y, 0, 90, 10, true);
        crc2.strokeStyle = "#E5D549";
        crc2.fillStyle =  gradient;
        crc2.fill();
        crc2.closePath();
        crc2.stroke();
    }
    function drawkillercell(_size: Vector): void {
        let nParticles: number = 3;
        for (let drawn: number = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let x: number = (Math.random() + 0.7) * _size.x ;
            let y: number = - ((Math.random() - 1) * _size.y);
            crc2.translate(x, y);
            createkillercell({ x, y});
            crc2.restore();
        }
        crc2.restore(); 
    }
    function createparticles(_position: Vector): void {
        crc2.restore();
        crc2.save();
        let x: number = 5 * Math.random() + 5;
        let y: number = 5 * Math.random() + 5;
        console.log(x, y);
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        crc2.ellipse(100, 50, x, y, 0, 90, 10, true);
        crc2.strokeStyle = "#E5D549";
        crc2.fillStyle =  "rgba(243,130,130,0.3)";
        crc2.fill();
        crc2.closePath();
        crc2.stroke();
    }
    function drawparticles(_size: Vector): void {
        let nParticles: number = 35;
        for (let drawn: number = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let x: number = (Math.random()) * _size.x ;
            let y: number = ((Math.random()) * _size.y);
            crc2.translate(x, y);
            createparticles({ x, y});
            console.log("position: x:" + x + "y:" + y);
            crc2.restore();
        }
        crc2.restore(); 
    }
}
