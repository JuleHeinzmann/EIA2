"use strict";
var Canvas2;
(function (Canvas2) {
    window.addEventListener("load", handleLoad);
    let partixel = [];
    let coronas = [];
    let killerzellis = [];
    let anits = [];
    let Menschenzellis = [];
    function handleLoad(_load) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Canvas2.crc2 = canvas.getContext("2d");
        //drawBackground();
        createMenschenzellen(10);
        createAntikob(5);
        createKillerzelle(3);
        createCorona(10);
        createPartikel(20);
        window.setInterval(update, 20);
    }
    function drawBackground() {
        let pattern = document.createElement('canvas').getContext('2d');
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
        Canvas2.crc2.fillStyle = Canvas2.crc2.createPattern(pattern.canvas, 'repeat');
        Canvas2.crc2.fillRect(0, 0, Canvas2.crc2.canvas.width, Canvas2.crc2.canvas.height);
    }
    function createMenschenzellen(_anzahl) {
        for (let i = 0; i < _anzahl; i++) {
            let x = Math.random() * 300;
            let y = ((Math.random()) * 300);
            let position = new Canvas2.Vector(x, y);
            let Zelle = new Canvas2.Meschenzelle(3, position);
            Menschenzellis.push(Zelle);
        }
    }
    function createAntikob(_anzahl) {
        for (let i = 0; i < _anzahl; i++) {
            let x = Math.random() * 200;
            let y = ((Math.random() + 1.3) * 300);
            let position = new Canvas2.Vector(x, y);
            let Antikob = new Canvas2.Antikorb(1, position);
            anits.push(Antikob);
        }
    }
    function createKillerzelle(_anzahl) {
        for (let i = 0; i < _anzahl; i++) {
            let x = Math.random() * 200;
            let y = ((Math.random() + 1.3) * 300);
            let position = new Canvas2.Vector(x, y);
            let killerzelle = new Canvas2.Killerzelle(1, position);
            killerzellis.push(killerzelle);
        }
    }
    function createCorona(_anzahl) {
        for (let i = 0; i < _anzahl; i++) {
            let x = Math.random() * 200;
            let y = ((Math.random() + 1.3) * 300);
            let position = new Canvas2.Vector(x, y);
            let corona = new Canvas2.Corona(1, position);
            coronas.push(corona);
        }
    }
    function createPartikel(_anzahl) {
        for (let i = 0; i < _anzahl; i++) {
            let x = Math.random() * 200;
            let y = ((Math.random() + 0.5) * 300);
            let position = new Canvas2.Vector(x, y);
            let partikel = new Canvas2.Partikel(1, position);
            partixel.push(partikel);
        }
    }
    function update() {
        drawBackground();
        for (let menschenzellen of Menschenzellis) {
            menschenzellen.move(1 / 1000000000);
            menschenzellen.draw();
        }
        for (let killer of killerzellis) {
            killer.move(1 / 10000);
            killer.draw();
        }
        for (let anti of anits) {
            anti.move(1 / 100000);
            anti.draw();
        }
        for (let coro of coronas) {
            coro.move(1 / 500);
            coro.draw();
        }
        for (let partikel of partixel) {
            partikel.move(1 / 100);
            partikel.draw();
        }
    }
})(Canvas2 || (Canvas2 = {}));
//# sourceMappingURL=canvas2.js.map