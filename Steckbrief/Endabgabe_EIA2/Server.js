"use strict";
var Zaubercanvas;
(function (Zaubercanvas) {
    let url = "https://endabgabeeia2.herokuapp.com/";
    let pictures = [];
    function insertPicture(_name) {
        //Für jede Figur in moveables wird die x- und y-Position und der Typ der Figur in information gepusht
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
    //teilweise bei Alida Kohler geschaut
    async function sendData(_information, _name) {
        let name = _name.replace(" ", "_");
        let canvasInfo = [];
        let canvassize = document.getElementById("choosecanvas");
        let background = document.getElementById("Background");
        let backgroundinfo = background.value;
        let canvasinfo = canvassize.value;
        canvasInfo.push(canvasinfo, backgroundinfo);
        let canvasLook = JSON.stringify(canvasInfo); //macht JSON string aus Infos zur Canvasgröße und Hintergrundfarbe
        //console.log(canvasLook);
        let info = JSON.stringify(_information); //macht JSON string aus infos zu den Figuren
        //console.log(info);
        let canvasQuery = new URLSearchParams(canvasLook);
        let query = new URLSearchParams(info);
        let response = await fetch(url + "?savePicture&" + name + "&" + canvasQuery.toString() + "&" + query.toString());
        let responseText = await response.text();
        if (responseText != "") {
            alert("Dein Bild " + _name + "wurde gespeichert");
        }
        else {
            alert("Es gab einen Fehler beim Speichern des Bildes.");
        }
        console.log(responseText);
    }
    async function findPictures() {
        //fügt die Namen der schon gespeicherten Bilder dem select Element hinzu
        //let response: Response = await fetch(url + "?savePicture&" );
        let response = await fetch(url);
        let responseText = await response.text();
        let pretty = responseText.replace(/\\|\[|"|_id|{|}|insertName|]/g, "");
        let prettier = pretty.replace(",,", ",");
        pictures = prettier.split(",savePicture,");
        //console.log(pictures);
        for (let item of pictures) {
            //console.log(item);
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
        //console.log(pictures);
        //lädt ein vorher gespeicheretes Bild
        let wanted = document.getElementById("Load");
        Zaubercanvas.moveables = [];
        let canvas = Zaubercanvas.maincanvas.getContext("2d");
        canvas.clearRect(0, 0, Zaubercanvas.maincanvas.width, Zaubercanvas.maincanvas.height); //vorher plazierte Figuren sollen weg, wenn man ein Bild lädt
        for (let item of pictures) {
            let information = item.split(",");
            if (information[0] == wanted.value) {
                let canvasinfo = document.getElementById("choosecanvas");
                canvasinfo.value = information[1]; //Größe des Canvas
                Zaubercanvas.handleChange();
                let backgroundinfo = document.getElementById("Background");
                backgroundinfo.value = information[2]; //Hintergrundfarbe des Canvas
                Zaubercanvas.selectBackground();
                information.splice(0, 3);
                for (let i = 0; i < information.length; i++) {
                    let canvas = Zaubercanvas.maincanvas.getContext("2d");
                    if (information[i] == "type:Star") {
                        let positionY = (information[i - 1].replace("positionY:", ""));
                        let positionX = (information[i - 2].replace("positionX:", ""));
                        let position = new Zaubercanvas.Vector(parseInt(positionX), parseInt(positionY));
                        let star = new Zaubercanvas.Star(position);
                        star.draw(canvas);
                        Zaubercanvas.moveables.push(star);
                    }
                    if (information[i] == "type:Circle") {
                        let positionY = (information[i - 1].replace("positionY:", ""));
                        let positionX = (information[i - 2].replace("positionX:", ""));
                        let position = new Zaubercanvas.Vector(parseInt(positionX), parseInt(positionY));
                        let circle = new Zaubercanvas.Circle(position);
                        circle.draw(canvas);
                        Zaubercanvas.moveables.push(circle);
                    }
                    if (information[i] == "type:Triangle") {
                        console.log(i);
                        let positionY = (information[i - 1].replace("positionY:", ""));
                        let positionX = (information[i - 2].replace("positionX:", ""));
                        let position = new Zaubercanvas.Vector(parseInt(positionX), parseInt(positionY));
                        let triangle = new Zaubercanvas.Triangle(position);
                        triangle.draw(canvas);
                        Zaubercanvas.moveables.push(triangle);
                    }
                    if (information[i] == "type:Square") {
                        let positionY = (information[i - 1].replace("positionY:", ""));
                        let positionX = (information[i - 2].replace("positionX:", ""));
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