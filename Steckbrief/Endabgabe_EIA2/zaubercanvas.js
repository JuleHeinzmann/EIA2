"use strict";
var Zaubercanvas;
(function (Zaubercanvas) {
    window.addEventListener("load", handleLoad);
    let chosenform;
    Zaubercanvas.moveables = [];
    let backgroundImage;
    let trash = false;
    function handleLoad() {
        drawforms();
        Zaubercanvas.findPictures();
        document.getElementById("choosecanvas")?.addEventListener("change", handleChange);
        document.getElementById("Background")?.addEventListener("change", selectBackground);
        document.getElementById("triangle")?.addEventListener("click", chooseform);
        document.getElementById("circle")?.addEventListener("click", chooseform);
        document.getElementById("star")?.addEventListener("click", chooseform);
        document.getElementById("square")?.addEventListener("click", chooseform);
        Zaubercanvas.maincanvas = document.getElementById("maincanvas");
        Zaubercanvas.maincanvas.addEventListener("click", function () { placefrom(event); });
        document.getElementById("maincanvas")?.addEventListener("click", function () { deleteform(event, trash); });
        document.addEventListener("keydown", function () { deletemode(event); });
        document.getElementById("save")?.addEventListener("click", getName);
        Zaubercanvas.savedpicture = document.getElementById("Load");
        Zaubercanvas.savedpicture.addEventListener("change", Zaubercanvas.loadPicture);
        window.setInterval(update, 20);
    }
    function drawforms() {
        let canvastriangle = document.getElementById("triangle");
        let positionsquare = new Zaubercanvas.Vector(30, 30);
        let positioncircle = new Zaubercanvas.Vector(50, 50);
        let positiontriangle = new Zaubercanvas.Vector(30, 60);
        let triangle = new Zaubercanvas.Triangle(positiontriangle);
        let crc2 = canvastriangle.getContext("2d");
        triangle.draw(crc2);
        let canvascircle = document.getElementById("circle");
        let crc1 = canvascircle.getContext("2d");
        let circle = new Zaubercanvas.Circle(positioncircle);
        circle.draw(crc1);
        let canvassquare = document.getElementById("square");
        let crc3 = canvassquare.getContext("2d");
        let square = new Zaubercanvas.Square(positionsquare);
        square.draw(crc3);
        let canvasstar = document.getElementById("star");
        let crc4 = canvasstar.getContext("2d");
        let star = new Zaubercanvas.Star(positioncircle);
        star.draw(crc4);
    }
    function handleChange() {
        //let maincanvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("maincanvas");
        //let target: HTMLSelectElement = <HTMLSelectElement> event?.target;
        let target = document.getElementById("choosecanvas");
        if (target.value == "Klein") {
            Zaubercanvas.maincanvas.height = 200;
            Zaubercanvas.maincanvas.width = 400;
        }
        if (target.value == "Mittel") {
            Zaubercanvas.maincanvas.height = 350;
            Zaubercanvas.maincanvas.width = 600;
        }
        if (target.value == "Groß") {
            Zaubercanvas.maincanvas.height = 550;
            Zaubercanvas.maincanvas.width = 1000;
        }
    }
    Zaubercanvas.handleChange = handleChange;
    function selectBackground() {
        //let maincanvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("maincanvas");
        //let target: HTMLSelectElement = <HTMLSelectElement> event?.target;
        let target = document.getElementById("Background");
        let canvas = Zaubercanvas.maincanvas.getContext("2d");
        if (target.value == "blue") {
            canvas.fillStyle = "#AEEEEE";
            canvas.fillRect(0, 0, Zaubercanvas.maincanvas.width, Zaubercanvas.maincanvas.height);
        }
        if (target.value == "yellow") {
            canvas.fillStyle = "#FFFACD";
            canvas.fillRect(0, 0, Zaubercanvas.maincanvas.width, Zaubercanvas.maincanvas.height);
        }
        if (target.value == "grey") {
            canvas.fillStyle = "#D0D0D0";
            canvas.fillRect(0, 0, Zaubercanvas.maincanvas.width, Zaubercanvas.maincanvas.height);
        }
        if (target.value == "beige") {
            canvas.fillStyle = "#EFEBDC";
            canvas.fillRect(0, 0, Zaubercanvas.maincanvas.width, Zaubercanvas.maincanvas.height);
        }
        backgroundImage = canvas.getImageData(0, 0, Zaubercanvas.maincanvas.width, Zaubercanvas.maincanvas.height);
    }
    Zaubercanvas.selectBackground = selectBackground;
    function chooseform() {
        let target = event?.target;
        chosenform = target.id;
    }
    function placefrom(_event) {
        if (trash == false) {
            //let maincanvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("maincanvas");
            let canvas = Zaubercanvas.maincanvas.getContext("2d");
            let x = _event.offsetX;
            let y = _event.offsetY;
            let position = new Zaubercanvas.Vector(x, y);
            console.log(position);
            console.log(canvas);
            if (chosenform == "circle") {
                let circle = new Zaubercanvas.Circle(position);
                circle.draw(canvas);
                Zaubercanvas.moveables.push(circle);
            }
            if (chosenform == "triangle") {
                let triangle = new Zaubercanvas.Triangle(position);
                triangle.draw(canvas);
                Zaubercanvas.moveables.push(triangle);
            }
            if (chosenform == "square") {
                let square = new Zaubercanvas.Square(position);
                square.draw(canvas);
                Zaubercanvas.moveables.push(square);
            }
            if (chosenform == "star") {
                let star = new Zaubercanvas.Star(position);
                star.draw(canvas);
                Zaubercanvas.moveables.push(star);
            }
        }
    }
    function update() {
        //let maincanvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("maincanvas");
        let canvas = Zaubercanvas.maincanvas.getContext("2d");
        if (backgroundImage) {
            canvas.putImageData(backgroundImage, 0, 0);
        }
        for (let item of Zaubercanvas.moveables) {
            if (item instanceof Zaubercanvas.Square) {
                item.move(1 / 200, canvas);
            }
            if (item instanceof Zaubercanvas.Triangle) {
                item.move(1 / 200, canvas);
            }
            if (item instanceof Zaubercanvas.Circle) {
                item.move(1 / 500, canvas);
            }
            if (item instanceof Zaubercanvas.Star) {
                item.move(1 / 5, canvas);
            }
            item.draw(canvas);
        }
    }
    //ähnlich wie Luzia Gunzenhauser
    function deleteform(_event, _trash) {
        console.log(trash);
        if (trash == true) {
            let poisitonx = _event.clientX;
            let positiony = _event.clientY;
            //let maincanvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("maincanvas");
            let canvasRect = Zaubercanvas.maincanvas.getBoundingClientRect();
            let offsetX = poisitonx - canvasRect.left;
            let offsetY = positiony - canvasRect.top;
            for (let item of Zaubercanvas.moveables) {
                if (item.position.x - 25 < offsetX &&
                    item.position.x + 25 > offsetX &&
                    item.position.y - 25 < offsetY