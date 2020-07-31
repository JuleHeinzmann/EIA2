"use strict";
var Zaubercanvas;
(function (Zaubercanvas) {
    window.addEventListener("load", handleLoad);
    let chosenform;
    Zaubercanvas.moveables = [];
    let backgroundImage;
    let trash = false;
    let maincanvas;
    function handleLoad() {
        drawforms();
        document.getElementById("choosecanvas")?.addEventListener("change", handleChange);
        document.getElementById("Background")?.addEventListener("change", selectBackground);
        document.getElementById("triangle")?.addEventListener("click", chooseform);
        document.getElementById("circle")?.addEventListener("click", chooseform);
        document.getElementById("star")?.addEventListener("click", chooseform);
        document.getElementById("square")?.addEventListener("click", chooseform);
        maincanvas = document.getElementById("maincanvas");
        maincanvas.addEventListener("click", function () { placefrom(event); });
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
        let target = event?.target;
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
    function selectBackground() {
        //let maincanvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("maincanvas");
        let target = event?.target;
        let canvas = maincanvas.getContext("2d");
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
    function chooseform() {
        let target = event?.target;
        chosenform = target.id;
    }
    function placefrom(_event) {
        if (trash == false) {
            //let maincanvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("maincanvas");
            let canvas = maincanvas.getContext("2d");
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
        let canvas = maincanvas.getContext("2d");
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
            let canvasRect = maincanvas.getBoundingClientRect();
            let offsetX = poisitonx - canvasRect.left;
            let offsetY = positiony - canvasRect.top;
            for (let item of Zaubercanvas.moveables) {
                if (item.position.x - 25 < offsetX &&
                    item.position.x + 25 > offsetX &&
                    item.position.y - 25 < offsetY &&
                    item.position.y + 25 > offsetY) {
                    let index = Zaubercanvas.moveables.indexOf(item);
                    Zaubercanvas.moveables.splice(index, 1);
                    trash = false;
                }
            }
        }
    }
    function deletemode(_event) {
        if (_event.key == "d") {
            trash = true;
        }
    }
    function getName() {
        let pictuteName = prompt("Geb name ein");
        Zaubercanvas.insertPicture(pictuteName);
    }
})(Zaubercanvas || (Zaubercanvas = {}));
//# sourceMappingURL=zaubercanvas.js.map