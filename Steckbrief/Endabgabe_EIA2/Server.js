"use strict";
var Zaubercanvas;
(function (Zaubercanvas) {
    let url = "https://endabgabeeia2.herokuapp.com/";
    let pictures = [];
    function insertPicture(_name) {
        let information = [];
        for (let figure of Zaubercanvas.moveables) {
            let form = {
                "positionX": Math.floor(figure.position.x),
                "positionY": Math.floor(figure.position.y),
                "type": figure.type
            };
            information.push(form);
        }
        sendData(information, _name);
    }
    Zaubercanvas.insertPicture = insertPicture;
    async function sendData(_information, _name) {
        let name = _name.replace(" ", "_");
        let canvasInfo = [];
        let canvassize = document.getElementById("choosecanvas");
        let background = document.getElementById("Background");
        let backgroundinfo = background.value;
        let canvasinfo = canvassize.value;
        canvasInfo.push(canvasinfo, backgroundinfo);
        let canvasLook = JSON.stringify(canvasInfo);
        console.log(canvasLook);
        let info = JSON.stringify(_information);
        console.log(info);
        let canvasQuery = new URLSearchParams(canvasLook);
        let query = new URLSearchParams(info);
        let response = await fetch(url + "?savePicture&" + name + "&" + canvasQuery.toString() + "&" + query.toString());
        //await fetch(url + "?insertName&" + name);
        let responseText = await response.text();
        if (responseText != "") {
            alert("Your picture " + _name + " has been saved!");
        }
        else {
            alert("An error has occurred during saving");
        }
        console.log(responseText);
    }
    async function findPictures() {
        //let response: Response = await fetch(url + "?savePicture&" );
        let response = await fetch(url);
        let responseText = await response.text();
        let pretty = responseText.replace(/\\|\[|"|_id|{|}|insertName|]/g, "");
        let prettier = pretty.replace(",,", ",");
        pictures = prettier.split(",savePicture,");
        console.log(pictures);
        for (let item of pictures) {
            console.log(item);
            if (item != "" && item != ",savePicture") {
                let information = item.split(",");
                let name = information[0];
                let select = document.getElementById("Load");
                let newoption = document.createElement("option");
                newoption.text = name;
                select.add(newoption);
            }
        }
    }
    Zaubercanvas.findPictures = findPictures;
    function loadPicture() {
        console.log("hier");
        let wanted = document.getElementById("Load");
        Zaubercanvas.moveables = [];
        let canvas = Zaubercanvas.maincanvas.getContext("2d");
        canvas.clearRect(0, 0, Zaubercanvas.maincanvas.width, Zaubercanvas.maincanvas.height);
        for (let item of pictures) {
            let information = item.split(",");
            if (information[0] == wanted.value) {
                let picturedata = item.split(",");
                console.log(picturedata);
                let canvasinfo = document.getElementById("choosecanvas");
                canvasinfo.value = picturedata[1];
                Zaubercanvas.handleChange();
                let backgroundinfo = document.getElementById("Background");
                backgroundinfo.value = picturedata[2];
                Zaubercanvas.selectBackground();
                picturedata.splice(0, 3);
                console.log(picturedata);
                for (let i = 0; i < picturedata.length; i++) {
                    let canvas = Zaubercanvas.maincanvas.getContext("2d");
                    if (picturedata[i] == "type:Star") {
                        let positionY = (picturedata[i - 1].replace("positionY:", ""));
                        let positionX = (picturedata[i - 2].replace("positionX:", ""));
                        let position = new Zaubercanvas.Vector(parseInt(positionX), parseInt(positionY));
                        let star = new Zaubercanvas.Star(position);
                        star.draw(canvas);
                        Zaubercanvas.moveables.push(star);
                    }
                    if (picturedata[i] == "type:Circle") {
                        let positionY = (picturedata[i - 1].replace("positionY:", ""));
                        let positionX = (picturedata[i - 2].replace("positionX:", ""));
                        let position = new Zaubercanvas.Vector(parseInt(positionX), parseInt(positionY));
                        let circle = new Zaubercanvas.Circle(position);
                        circle.draw(canvas);
                        Zaubercanvas.moveables.push(circle);
                    }
                    if (picturedata[i] == "type:Triangle") {
                        console.log(i);
                        let positionY = (picturedata[i - 1].replace("positionY:", ""));
                        let positionX = (picturedata[i - 2].replace("positionX:", ""));
                        let position = new Zaubercanvas.Vector(parseInt(positionX), parseInt(positionY));
                        let triangle = new Zaubercanvas.Triangle(position);
                        console.log(position);
                        triangle.draw(canvas);
                        Zaubercanvas.moveables.push(triangle);
                    }
                    if (picturedata[i] == "type:Square") {
                        let positionY = (picturedata[i - 1].replace("positionY:", ""));
                        let positionX = (picturedata[i - 2].replace("positionX:", ""));
                        let position = new Zaubercanvas.Vector(parseInt(positionX), parseInt(positionY));
                        let square = new Zaubercanvas.Square(position);
                        square.draw(canvas);
                        Zaubercanvas.moveables.push(square);
                    }
                }
            }
        }
    }
    Zaubercanvas.loadPicture = loadPicture;
})(Zaubercanvas || (Zaubercanvas = {}));
//# sourceMappingURL=Server.js.map