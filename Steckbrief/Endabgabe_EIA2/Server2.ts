import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";
export namespace Zaubercanvas {
    let orders: Mongo.Collection;
    let options: Mongo.MongoClientOptions;
    let mongoClient: Mongo.MongoClient;
    let allPictures: string[] = [];
    let port: number | string | undefined = process.env.PORT;
    if (port == undefined)
        port = 5001;

    let databaseUrl: string = "mongodb+srv://MyMongoDBUser:baumkind@eia2-yxlor.mongodb.net/Endabgabe?retryWrites=true&w=majority";
    startServer(port);
    connectToDatabase(databaseUrl);

    function startServer(_port: number | string): void {
        let server: Http.Server = Http.createServer(); //startet Server auf bestimmten Port
        console.log("Server starting on port:" + _port);

        server.listen(_port);
        server.addListener("request", handleRequest); 
    }

    async function connectToDatabase(_url: string): Promise<void> { //verbinde mit Datenbank
        options = {useNewUrlParser: true, useUnifiedTopology: true};
        mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        orders = mongoClient.db("Endabgabe").collection("Images");
        console.log("Database connection ", orders != undefined);
    }

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let splitURL: string[] = _request.url.split("&"); //url zerteilen
            if (splitURL[0] == "/?savePicture") {
                (await orders).insertOne(url.query);
            }

            let cursor: Mongo.Cursor<any> = await orders.find();
            await cursor.forEach(showOrder);
            let jsonString: string = JSON.stringify(allPictures);
            let answer: string = jsonString.toString();
            _response.write(answer);
            allPictures = [];

        }
        _response.end();
    }
    

    function showOrder(_item: object): void {
        for (let key in _item) {
            allPictures.push(key);
            console.log("allpictures" + allPictures);
        }
    }
}