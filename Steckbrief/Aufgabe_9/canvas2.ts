namespace Canvas2 {
    window.addEventListener("load", handleLoad); 
    export let crc2: CanvasRenderingContext2D;
    let partixel: Partikel[] = [];
    let coronas : Corona[] = [];
    let killerzellis: Killerzelle[] = [];
    let anits: Antikorb[] = [];
    let Menschenzellis: Meschenzelle[] = [];
    function handleLoad(_load:Event): void {
        
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        //drawBackground();
        createMenschenzellen(10);
        createAntikob(5);
        createKillerzelle(3);
        createCorona(10);
        createPartikel(20);
        window.setInterval(update, 20);
       

    }
    function drawBackground(): void {
        
        let pattern: CanvasRenderingContext2D = <CanvasRenderingContext2D> document.createElement('canvas').getContext('2d');
        pattern.canvas.width = 40;
        pattern.canvas.height = 20;

        pattern.fillStyle = "rgba(120,20,0,0.2)";
        pattern.strokeStyle = "rgb(0,0,0,0.2)"
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

        crc2.fillStyle = <CanvasRenderingContext2D>crc2.createPattern(pattern.canvas, 'repeat');
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    
    }
    function createMenschenzellen(_anzahl: number) : void {
        for (let i:number = 0; i < _anzahl; i++) {
            let x: number = Math.random()  * 300 ;
             let y: number = ((Math.random()) * 300);
             let position: Vector = new Vector(x,y)
            let Zelle: Meschenzelle = new Meschenzelle(3,position);
            Menschenzellis.push(Zelle);
        }
    }
    function createAntikob(_anzahl: number) : void {
        for (let i:number = 0; i < _anzahl; i++) {
            let x: number = Math.random()  * 200 ;
             let y: number = ((Math.random()+ 1.3) * 300);
             let position: Vector = new Vector(x,y)
            let Antikob: Antikorb = new Antikorb(1,position);
            anits.push(Antikob);
        }
    }
    function createKillerzelle(_anzahl:number): void {
        for (let i:number = 0; i < _anzahl; i++) {
            let x: number = Math.random()  * 200 ;
             let y: number = ((Math.random()+ 1.3) * 300);
             let position: Vector = new Vector(x,y)
            let killerzelle: Killerzelle = new Killerzelle(1,position);
            killerzellis.push(killerzelle);
        }
    }
    function createCorona(_anzahl:number): void {
        for (let i:number = 0; i < _anzahl; i++) {
            let x: number = Math.random()  * 200 ;
             let y: number = ((Math.random()+ 1.3) * 300);
             let position: Vector = new Vector(x,y)
            let corona: Corona = new Corona(1,position);
            coronas.push(corona);
        }
    }
    function createPartikel(_anzahl:number): void {
        for (let i:number = 0; i < _anzahl; i++) {
            let x: number = Math.random()  * 200 ;
             let y: number = ((Math.random()+0.5) * 300);
             let position: Vector = new Vector(x,y)
            let partikel: Partikel = new Partikel(1,position);
            partixel.push(partikel)
            
            
        } 
    }
    function update(): void {
        drawBackground();
        for (let menschenzellen of Menschenzellis){
            menschenzellen.move(1/1000000000);
            menschenzellen.draw();
        }
        for (let killer of killerzellis){
            killer.move(1/10000);
            killer.draw();
        }
        for (let anti of anits){
            anti.move(1/100000);
            anti.draw();
        }
        for (let coro of coronas){
            coro.move(1/500);
            coro.draw();
        }
        for (let partikel of partixel) {
            partikel.move(1 / 100);
            partikel.draw();
        }
        
    }
    
    
}
