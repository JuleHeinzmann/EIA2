//Ich weiß, dass das ganze noch nicht funktinoniert aber ich hatte diese Woche nicht viel Zeit meine Konzentration ist weg. Ich versuch es dann nächste Woche noch zum laufen zu bringen

import * as Http from "http";
import * as Url from "url";
import { url } from "inspector";
import * as Mongo from "mongodb";
//mongodb+srv://MyMongoDBUser:<password>@eia2-yxlor.mongodb.net/<dbname>?retryWrites=true&w=majority
export namespace HaushaltshilfeA7 {
   
    interface Order {
        [type: string]: string | string[] | undefined;
    }

    let orders: Mongo.Collection;

    let port: number | string | undefined = process.env.PORT;
    if (port == undefined)
            port = 5001; 
    
    startServer(port);
    let databaseUrl: string = "mongodb+srv://MyMongoDBUser:baumkind@eia2-yxlor.mongodb.net/Haushaltshilfe?retryWrites=true&w=majority";
    connectToDatabase(databaseUrl);

    function startServer(_port: number | string): void {
    
        let server: Http.Server = Http.createServer();

        console.log("Server is starting on port:" + _port); 

        server.listen(_port);
        server.addListener("request", handleRequest);

    }

    async function connectToDatabase(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        orders = mongoClient.db("Haushaltshilfe").collection("Orders");
        console.log("Database connection", orders != undefined);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       


    }
 
    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("What's up?");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        
        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            //for (let key in url.query) {
                //_response.write(key + ":" + url.query[key] + "<br/>");
            //}
        
            let jsonString: string = JSON.stringify(url.query);
            _response.write(jsonString);

            storeOrder(url.query);

        
        }


    
        _response.end();
    }
    
    function storeOrder(_order: Order): void {
        orders.insert(_order);
    
    }


}