namespace Zaubercanvas {
    let url: string = "https://endabgabeeia2.herokuapp.com/";
    let pictures: string[] = [];
    export interface Picture {
        positionX: number;
        positionY: number;
        type: string;
    }
    export function insertPicture(_name: string): void {
        //Für jede Figur in moveables wird die x- und y-Position und der Typ der Figur in information gepusht
        let information: Picture[] = [];
        for (let figure of moveables) {
            let form: Picture = {
                "positionX": Math.floor(figure.position.x),
                "positionY": Math.floor(figure.position.y),
                "type": figure.type
            };
            information.push(form);
        }
        sendData(information, _name);
    }
    //teilweise bei Alida Kohler geschaut
    async function sendData(_information: Picture[], _name: string): Promise<void> {
        let name: string = _name.replace(" ", "_");
        let canvasInfo: string[] = [];
        let canvassize: HTMLSelectElement = <HTMLSelectElement> document.getElementById("choosecanvas");
        let background: HTMLSelectElement = <HTMLSelectElement> document.getElementById("Background");
        let backgroundinfo: string = background.value;
        let canvasinfo: string = canvassize.value;
        canvasInfo.push(canvasinfo, backgroundinfo);
        let canvasLook: string = JSON.stringify(canvasInfo); //macht JSON string aus Infos zur Canvasgröße und Hintergrundfarbe
        //console.log(canvasLook);
        let info: string = JSON.stringify(_information); //macht JSON string aus infos zu den Figuren
        //console.log(info);
        let canvasQuery: URLSearchParams = new URLSearchParams(canvasLook);
        let query: URLSearchParams = new URLSearchParams(info);
        let response: Response = await fetch(url + "?savePicture&" + name + "&" + canvasQuery.toString() + "&" + query.toString());

        let responseText: string = await response.text();
        if (responseText != "") {
            alert("Dein Bild " + _name + "wurde gespeichert");
        }
        else {
            alert("Es gab einen Fehler beim Speichern des Bildes.");
        }
        console.log(responseText);
    }
    export async function findPictures(): Promise<void> {
        //fügt die Namen der schon gespeicherten Bilder dem select Element hinzu
        //let response: Response = await fetch(url + "?savePicture&" );
        let response: Response = await fetch(url);
        let responseText: string = await response.text();
        let pretty: string = responseText.replace(/\\|\[|"|_id|{|}|insertName|]/g, "");
        let prettier: string = pretty.replace(",,", ",");
        pictures = prettier.split(",savePicture,");
        //console.log(pictures);
        for (let item of pictures) {
            //console.log(item);
            if (item != "" && item != ",savePicture") {
            let information: string[] = item.split(",");
            let name: string = information[0];
            let select: HTMLSelectElement = <HTMLSelectElement> document.getElementById("Load");
            let newoption: HTMLOptionElement  = document.createElement("option");
            newoption.text = name;
            select.add(newoption);

            }
        }
    }
    export function loadPicture(): void {
        //console.log(pictures);
        //lädt ein vorher gespeicheretes Bild
        let wanted: HTMLSelectElement = <HTMLSelectElement> document.getElementById("Load");
        moveables = []; 
        let canvas: CanvasRenderingContext2D = <CanvasRenderingContext2D>maincanvas.getContext("2d");
        canvas.clearRect(0, 0, maincanvas.width, maincanvas.height); //vorher plazierte Figuren sollen weg, wenn man ein Bild lädt
        for (let item of pictures) {
            let information: string[] = item.split(",");
            if (information[0] == wanted.value) {
                let canvasinfo: HTMLSelectElement = <HTMLSelectElement> document.getElementById("choosecanvas");
                canvasinfo.value = information[1]; //Größe des Canvas
                handleChange();
                let backgroundinfo: HTMLSelectElement = <HTMLSelectElement> document.getElementById("Background");
                backgroundinfo.value = information[2]; //Hintergrundfarbe des Canvas
                selectBackground();
                information.splice(0, 3);
                for (let i: number = 0; i < information.length; i++) {
                    let canvas: CanvasRenderingContext2D = <CanvasRenderingContext2D>maincanvas.getContext("2d");
                    if (information[i] == "type:Star") {
                       let positionY: string = (information[i - 1].replace("positionY:", "")); 
                       let positionX: string = (information[i - 2].replace("positionX:", "")); 
                       let position: Vector = new Vector(parseInt(positionX), parseInt(positionY));
                       let star: Star = new Star(position);
                       star.draw(canvas);
                       moveables.push(star);
                    }
                    if (information[i] == "type:Circle") {
                        let positionY: string = (information[i - 1].replace("positionY:", "")); 
                        let positionX: string = (information[i - 2].replace("positionX:", "")); 
                        let position: Vector = new Vector(parseInt(positionX), parseInt(positionY));
                        let circle: Circle = new Circle(position);
                        circle.draw(canvas);
                        moveables.push(circle);
                    }
                    if (information[i] == "type:Triangle") {
                        console.log(i);
                        let positionY: string = (information[i - 1].replace("positionY:", "")); 
                        let positionX: string = (information[i - 2].replace("positionX:", "")); 
                        let position: Vector = new Vector(parseInt(positionX), parseInt(positionY));
                        let triangle: Triangle = new Triangle(position);
                        triangle.draw(canvas);
                        moveables.push(triangle);
                    }
                    if (information[i] == "type:Square") {
                        let positionY: string = (information[i - 1].replace("positionY:", "")); 
                        let positionX: string = (information[i - 2].replace("positionX:", "")); 
                        let position: Vector = new Vector(parseInt(positionX), parseInt(positionY));
                        let square: Square = new Square(position);
                        square.draw(canvas);
                        moveables.push(square);
                    }

                }
            }
        }
    }
}