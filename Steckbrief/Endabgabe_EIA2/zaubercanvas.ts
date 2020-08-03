namespace Zaubercanvas {
    window.addEventListener("load", handleLoad);
    let chosenform: string;
    export let moveables: Moveable[] = [];
    let backgroundImage: ImageData;
    let trash: boolean = false;
    export let maincanvas: HTMLCanvasElement;
    export let savedpicture: HTMLInputElement;
    function handleLoad(): void {
        drawforms();
        findPictures();
        document.getElementById("choosecanvas")?.addEventListener("change", handleChange);
        document.getElementById("Background")?.addEventListener("change", selectBackground);
        document.getElementById("triangle")?.addEventListener("click", chooseform);
        document.getElementById("circle")?.addEventListener("click", chooseform);
        document.getElementById("star")?.addEventListener("click", chooseform);
        document.getElementById("square")?.addEventListener("click", chooseform);
        maincanvas = <HTMLCanvasElement>document.getElementById("maincanvas");
        maincanvas.addEventListener("click", function(): void {placefrom(<MouseEvent>event); });
        document.getElementById("maincanvas")?.addEventListener("click", function(): void {deleteform(<MouseEvent>event, trash); });
        document.addEventListener("keydown", function(): void {deletemode(<KeyboardEvent> event); });
        document.getElementById("save")?.addEventListener("click", getName);
        savedpicture = <HTMLInputElement>document.getElementById("Load");
        savedpicture.addEventListener("change", loadPicture);
        window.setInterval(update, 20);
    }
    function drawforms(): void {
        let canvastriangle: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("triangle");
        let positionsquare: Vector = new Vector(30, 30);
        let positioncircle: Vector = new Vector(50, 50);
        let positiontriangle: Vector = new Vector(30, 60);
        let triangle: Triangle = new Triangle(positiontriangle);
        let crc2: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvastriangle.getContext("2d");
        triangle.draw(crc2);
        let canvascircle: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("circle");
        let crc1: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvascircle.getContext("2d");
        let circle: Circle = new Circle(positioncircle);
        circle.draw(crc1);
        let canvassquare: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("square");
        let crc3: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvassquare.getContext("2d");
        let square: Square = new Square(positionsquare);
        square.draw(crc3);
        let canvasstar: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("star");
        let crc4: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvasstar.getContext("2d");
        let star: Star = new Star(positioncircle);
        star.draw(crc4);
    }

    export function handleChange(): void {
        //let maincanvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("maincanvas");
        //let target: HTMLSelectElement = <HTMLSelectElement> event?.target;
        let target: HTMLSelectElement = <HTMLSelectElement> document.getElementById("choosecanvas");
        if (target.value == "Klein") {
            maincanvas.height = 200;
            maincanvas.width = 400;
        }
        if (target.value == "Mittel") {
            maincanvas.height = 350;
            maincanvas.width = 600;
        }
        if (target.value == "Groß") {
            maincanvas.height = 550;
            maincanvas.width = 1000;
        }
        
    }
    export function selectBackground(): void {
        //let maincanvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("maincanvas");
        //let target: HTMLSelectElement = <HTMLSelectElement> event?.target;
        let target: HTMLSelectElement = <HTMLSelectElement> document.getElementById("Background");
        let canvas: CanvasRenderingContext2D = <CanvasRenderingContext2D>maincanvas.getContext("2d");
        if (target.value == "blue") {
            canvas.fillStyle = "#AEEEEE";
            canvas.fillRect(0, 0, maincanvas.width, maincanvas.height);
        }
        if (target.value == "yellow") {
            canvas.fillStyle = "#FFFACD";
            canvas.fillRect(0, 0, maincanvas.width, maincanvas.height);
        }
        if (target.value == "grey") {
            canvas.fillStyle = "#D0D0D0";
            canvas.fillRect(0, 0, maincanvas.width, maincanvas.height);
        }
        if (target.value == "beige") {
            canvas.fillStyle = "#EFEBDC";
            canvas.fillRect(0, 0, maincanvas.width, maincanvas.height);
        }
        backgroundImage = canvas.getImageData(0, 0, maincanvas.width, maincanvas.height);
    }
    function chooseform(): void {
        let target: HTMLCanvasElement = <HTMLCanvasElement> event?.target;
        chosenform = target.id;
    }
    function placefrom(_event: MouseEvent): void {
        if (trash == false) {
            //let maincanvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("maincanvas");
            let canvas: CanvasRenderingContext2D = <CanvasRenderingContext2D>maincanvas.getContext("2d");
            let x: number = _event.offsetX;
            let y: number = _event.offsetY;
            let position: Vector = new Vector(x, y);
            console.log(position);
            console.log(canvas);
            if (chosenform == "circle") {
                let circle: Circle = new Circle(position);
                circle.draw(canvas);
                moveables.push(circle);
            }
            if (chosenform == "triangle") {
                let triangle: Triangle = new Triangle(position);
                triangle.draw(canvas);
                moveables.push(triangle);
            }
            if (chosenform == "square") {
                let square: Square = new Square(position);
                square.draw(canvas);
                moveables.push(square);
            }
            if (chosenform == "star") {
                let star: Star = new Star(position);
                star.draw(canvas);
                moveables.push(star);
            }
        }
    }
    function update(): void {
        //let maincanvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("maincanvas");
        let canvas: CanvasRenderingContext2D = <CanvasRenderingContext2D>maincanvas.getContext("2d");
        if (backgroundImage) {
            canvas.putImageData(backgroundImage, 0, 0);
        }
        
        for (let item of moveables) {
            if (item instanceof Square) {
                item.move(1 / 200, canvas);
            }
            if (item instanceof Triangle) {
                item.move(1 / 200, canvas);
            }
            if (item instanceof Circle) {
                item.move(1 / 500, canvas);
            }
            if (item instanceof Star) {
                item.move(1 / 5, canvas);
            }
            item.draw(canvas);
    
        }
    }
    //ähnlich wie Luzia Gunzenhauser
    function deleteform (_event: MouseEvent, _trash: boolean): void {
        console.log(trash);
        if ( trash == true) {
            let poisitonx: number = _event.clientX;
            let positiony: number = _event.clientY;
            //let maincanvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("maincanvas");
            let canvasRect: ClientRect | DOMRect = maincanvas.getBoundingClientRect();
            let offsetX: number = poisitonx - canvasRect.left;
            let offsetY: number = positiony - canvasRect.top;
            for (let item of moveables) {
                if (item.position.x - 25 < offsetX &&
                    item.position.x + 25 > offsetX &&
                    item.position.y - 25 < offsetY &&
                    item.position.y + 25 > offsetY) {
                        let index: number = moveables.indexOf(item);
                        moveables.splice(index, 1);
                        trash = false;
                    }
            }
        }

    }
    function deletemode(_eve