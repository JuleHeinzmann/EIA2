"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Zaubercanvas;
(function (Zaubercanvas) {
    let orders;
    let options;
    let mongoClient;
    let allPictures = [];
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    let databaseUrl = "mongodb+srv://MyMongoDBUser:baumkind@eia2-yxlor.mongodb.net/Endabgabe?retryWrites=true&w=majority";
    startServer(port);
    connectToDatabase(databaseUrl);
    function startServer(_port) {
        let server = Http.createServer(); //startet Server auf bestimmten Port
        console.log("Server starting on port:" + _port);
        server.listen(_port);
        server.addListener("request", handleRequest);
    }
    async function connectToDatabase(_url) {
        options = { useNewUrlParser: true, useUnifiedTopology: true };
        mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        orders = mongoClient.db("Endabgabe").collection("Images");
        console.log("Database connection ", orders != undefined);
    }
    async function handleRequest(_request, _response) {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let splitURL = _request.url.split("&"); //url zerteilen
            if (splitURL[0] == "/?savePicture") {
                (await orders).insertOne(url.query);
            }
            let cursor = await orders.find();
            await cursor.forEach(showOrder);
            let jsonString = JSON.stringify(allPictures);
            let answer = jsonString.toString();
            _response.write(answer);
            allPictures = [];
        }
        _response.end();
    }
    function showOrder(_item) {
        for (let key in _item) {
            allPictures.push(key);
            console.log("allpictures" + allPictures);
        }
    }
})(Zaubercanvas = exports.Zaubercanvas || (exports.Zaubercanvas = {}));
//# sourceMappingURL=Server2.js.map