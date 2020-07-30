import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";
export namespace Zaubercanvas {
    let orders: Mongo.Collection;
    let options: Mongo.MongoClientOptions;
    let mongoClient: Mongo.MongoClient;
    let port: number | string | undefined = process.env.PORT;
    if (port == undefined)
        port = 5001;

    let databaseUrl: string = "mongodb+srv://MyMongoDBUser:baumkind@eia2-yxlor.mongodb.net/Endabgabe?retryWrites=true&w=majority";

    startServer(port);
    connectToDatabase(databaseUrl);

    function startServer(_port: number | string): void {
        let server: Http.Server = Http.createServer();
        console.log("Server starting on port:" + _port);

        server.listen(_port);
        server.addListener("request", handleRequest);
    }

    async function connectToDatabase(_url: string): Promise<void> {
        options = {useNewUrlParser: true, useUnifiedTopology: true};
        mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        orders = mongoClient.db("Endabgabe").collection("Images");
        console.log("Database connection ", orders != undefined);
    }

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        console.log("What's up?");

        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let splitURL: string[] = _request.url.split("&");
            // for (let key in url.query) {
            //     _response.write(key + ":" + url.query[key] + "<br/>");
            // }
            if (splitURL[0] == "/?insertName") {
                let pictures: Mongo.Collection = mongoClient.db("Endabgabe").collection("Images");
                (await pictures).insertOne(url.query);

            }
            if (splitURL[0] == "/?savePicture") {
                let newCollection: Promise<Mongo.Collection> = mongoClient.db("Endabgabe").createCollection(splitURL[1]);
                (await newCollection).insertOne(url.query);
            }
            // let jsonString: string = JSON.stringify(url.query);
            // _response.write(jsonString);

            //storeOrder(url.query);
        }

        _response.end();
    }

    // function storeOrder(_order: any): void {
    //     orders.insert(_order);
    // }

}