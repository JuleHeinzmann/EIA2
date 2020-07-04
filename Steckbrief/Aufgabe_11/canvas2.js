"use strict";
var Canvas4;
(function (Canvas4) {
    window.addEventListener("load", handleLoad);
    let moveables = [];
    function handleLoad(_load) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Canvas4.crc2 = canvas.getContext("2d");
        //drawBackground();
        createMenschenzellen(10);
        createAntikob(5);
        createKillerzelle(3);
        createCorona(10);
        createPartikel(20);
        window.setInterval(update, 20);
        canvas.addEventListener("click", handleClick);
    }
    function drawBackground() {
        let pattern = document.createElement("canvas").getContext("2d");
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
        Canvas4.crc2.fillStyle = Canvas4.crc2.createPattern(pattern.canvas, "repeat");
        Canvas4.crc2.fillRect(0, 0, Canvas4.crc2.canvas.width, Canvas4.crc2.canvas.height);
    }
    function createMenschenzellen(_anzahl) {
        for (let i = 0; i < _anzahl; i++) {
            let x = Math.random() * 300;
            let y = ((Math.random()) * 300);
            let position = new Canvas4.Vector(x, y);
            let Zelle = new Canvas4.Meschenzelle(position);
            moveables.push(Zelle);
        }
    }
    function createAntikob(_anzahl) {
        for (let i = 0; i < _anzahl; i++) {
            let x = Math.random() * 200;
            let y = ((Math.random() + 1.3) * 300);
            let position = new Canvas4.Vector(x, y);
            let Antikob = new Canvas4.Antikorb(position);
            moveables.push(Antikob);
        }
    }
    function createKillerzelle(_anzahl) {
        for (let i = 0; i < _anzahl; i++) {
            let x = Math.random() * 200;
            let y = ((Math.random() + 1.3) * 300);
            let position = new Canvas4.Vector(x, y);
            let killerzelle = new Canvas4.Killerzelle(position);
            moveables.push(killerzelle);
        }
    }
    function createCorona(_anzahl) {
        for (let i = 0; i < _anzahl; i++) {
            let x = Math.random() * 200;
            let y = ((Math.random() + 1.3) * 300);
            let position = new Canvas4.Vector(x, y);
            let corona = new Canvas4.Corona(position);
            moveables.push(corona);
        }
    }
    function createPartikel(_anzahl) {
        for (let i = 0; i < _anzahl; i++) {
            let x = Math.random() * 200;
            let y = ((Math.random() + 0.5) * 300);
            let position = new Canvas4.Vector(x, y);
            let partikel = new Canvas4.Partikel(position);
            moveables.push(partikel);
        }
    }
    function update() {
        drawBackground();
        for (let cells of moveables) {
            if (cells instanceof Canvas4.Corona) {
                cells.move(1 / 300);
            }
            if (cells instanceof Canvas4.Partikel) {
                cells.move(1 / 100);
            }
            cells.draw();
        }
        infection();
    }
    function infection() {
        for (let moveable of moveables) {
            if (moveable instanceof Canvas4.Corona) {
                let radiusvirus = moveable.radius;
                let positionvirus = moveable.position;
                let cellhit = getcell(positionvirus, radiusvirus);
                if (cellhit) {
                    cellhit.infected = true;
                }
            }
        }
    }
    function getcell(_positionvirus, _radiusvirus) {
        for (let moveable of moveables) {
            if (moveable instanceof Canvas4.Meschenzelle && moveable.ishit(_positionvirus, _radiusvirus)) {
                return moveable;
            }
        }
        return null;
    }
    function handleClick(_event) {
        let positionx = _event.x;
        let positiony = _event.y;
        for (let moveable of moveables) {
            if (moveable instanceof Canvas4.Meschenzelle && (positionx - moveable.position.x) <= moveable.radius && (positiony - moveable.position.y) <= moveable.radius
                && (positiony - moveable.position.y) >= 0 && (positionx - moveable.position.x) >= 0) {
                //console.log((positionx - moveable.position.x));
                moveable.infected = false;
            }
        }
    }
})(Canvas4 || (Canvas4 = {}));
//# sourceMappingURL=canvas2.js.map