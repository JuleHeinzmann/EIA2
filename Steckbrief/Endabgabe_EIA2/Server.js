"use strict";
var Zaubercanvas;
(function (Zaubercanvas) {
    let url = "https://endabgabeeia2.herokuapp.com/";
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
        //let response: Response = await fetch(url + ",Name: " + name + ",Canvas: " + canvasQuery.toString() + ",Figures: " + query.toString());
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
    async function loadPicture() {
        let name = Zaubercanvas.savedpicture.value;
        let response = await fetch(url + "?" + "findPicture&" + name);
        let responseText = await response.text();
        console.log(responseText);
    }
    Zaubercanvas.loadPicture = loadPicture;
})(Zaubercanvas || (Zaubercanvas = {}));
//# sourceMappingURL=Server.js.map