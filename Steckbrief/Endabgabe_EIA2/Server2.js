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
    //let allPictures: string[];
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    let databaseUrl = "mongodb+srv://MyMongoDBUser:baumkind@eia2-yxlor.mongodb.net/Endabgabe?retryWrites=true&w=majority";
    startServer(port);
    connectToDatabase(databaseUrl);
    function startServer(_port) {
        let server = Http.createServer();
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
        console.log("HEy?");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            for (let key in url.query) {
                _response.write(key + ":" + url.query[key] + "<br/>");
            }
            let jsonString = JSON.stringify(url.query);
            _response.write(jsonString);
            storeOrder(url.query);
            // let picture: Mongo.Collection<any> = mongoClient.db("Endabgabe").collection("Images");
            // let cursor: Mongo.Cursor<any> = await picture.find();
            // await cursor.forEach(showOrder);
            // let jsonString: string = JSON.stringify(allPictures);
            // let answer: string = jsonString.toString();
            // _response.write(answer);
            //allPictures = [];
        }
        _response.end();
    }
    function storeOrder(_order) {
        orders.insertOne(_order);
    }
    // function showOrder(_item: object): void {
    //     for (let key in _item) {
    //         allPictures.push(key);
    //     }
    // }
})(Zaubercanvas = exports.Zaubercanvas || (exports.Zaubercanvas = {}));
//# sourceMappingURL=Server2.js.map