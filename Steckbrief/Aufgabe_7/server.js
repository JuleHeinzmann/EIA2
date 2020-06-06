"use strict";
//Ich weiß, dass das ganze noch nicht funktinoniert aber ich hatte diese Woche nicht viel Zeit meine Konzentration ist weg. Ich versuch es dann nächste Woche noch zum laufen zu bringen
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
//mongodb+srv://MyMongoDBUser:<password>@eia2-yxlor.mongodb.net/<dbname>?retryWrites=true&w=majority
var HaushaltshilfeA7;
(function (HaushaltshilfeA7) {
    let orders;
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    startServer(port);
    let databaseUrl = "mongodb+srv://MyMongoDBUser:baumkind@eia2-yxlor.mongodb.net/Haushaltshilfe?retryWrites=true&w=majority";
    connectToDatabase(databaseUrl);
    function startServer(_port) {
        let server = Http.createServer();
        console.log("Server is starting on port:" + _port);
        server.listen(_port);
        server.addListener("request", handleRequest);
    }
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        orders = mongoClient.db("Haushaltshilfe").collection("Orders");
        console.log("Database connection", orders != undefined);
    }
    function handleRequest(_request, _response) {
        console.log("What's up?");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            //for (let key in url.query) {
            //_response.write(key + ":" + url.query[key] + "<br/>");
            //}
            let jsonString = JSON.stringify(url.query);
            _response.write(jsonString);
            storeOrder(url.query);
        }
        _response.end();
    }
    function storeOrder(_order) {
        orders.insert(_order);
    }
})(HaushaltshilfeA7 = exports.HaushaltshilfeA7 || (exports.HaushaltshilfeA7 = {}));
//# sourceMappingURL=server.js.map