namespace Zaubercanvas {
    let url: string = "https://endabgabeeia2.herokuapp.com/";
    let pictures: string[] = [];
    export interface Picture {
        positionX: number;
        positionY: number;
        type: string;
    }
    export function insertPicture(_name: string): void {
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

    async function sendData(_information: Picture[], _name: string): Promise<void> {
        let name: string = _name.replace(" ", "_");
        let canvasInfo: string[] = [];
        let canvassize: HTMLSelectElement = <HTMLSelectElement> document.getElementById("choosecanvas");
        let background: HTMLSelectElement = <HTMLSelectElement> document.getElementById("Background");
        let backgroundinfo: string = background.value;
        let canvasinfo: string = canvassize.value;
        canvasInfo.push(canvasinfo, backgroundinfo);
        let canvasLook: string = JSON.stringify(canvasInfo);
        console.log(canvasLook);
        let info: string = JSON.stringify(_information);
        console.log(info);
        let canvasQuery: URLSearchParams = new URLSearchParams(canvasLook);
        let query: URLSearchParams = new URLSearchParams(info);
        let response: Response = await fetch(url + "?savePicture&" + name + "&" + canvasQuery.toString() + "&" + query.toString());
        //await fetch(url + "?insertName&" + name);

        let responseText: string = await response.text();
        if (responseText != "") {
            alert("Your picture " + _name + " has been saved!");
        }
        else {
            alert("An error has occurred during saving");
        }
        console.log(responseText);
    }
    export async function findPictures(): Promise<void> {
        //let response: Response = await fetch(url + "?savePicture&" );
        let response: Response = await fetch(url);
        let responseText: string = await response.text();
        let pretty: string = responseText.replace(/\\|\[|"|_id|{|}|insertName|]/g, "");
        let prettier: string = pretty.replace(",,", ",");
        pictures = prettier.split(",savePicture,");
        console.log(pictures);
        for (let item of pictures) {
            console.log(item);
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
        console.log("hier");
        let wanted: HTMLSelectElement = <HTMLSelectElement> document.getElementById("Load");
        moveables = [];
        let canvas: CanvasRenderingContext2D = <CanvasRenderingContext2D>maincanvas.getContext("2d");
        canvas.clearRect(0, 0, maincanvas.width, maincanvas.height);
        for (let item of pictures) {
            let information: string[] = item.split(",");
            if (information[0] == wanted.value) {
                let picturedata: string[] = item.split(",");
                console.log(picturedata);
                let canvasinfo: HTMLSelectElement = <HTMLSelectElement> document.getElementById("choosecanvas");
                canvasinfo.value = picturedata[1];
                handleChange();
                let backgroundinfo: HTMLSelectElement = <HTMLSelectElement> document.getElementById("Background");
                backgroundinfo.value = picturedata[2];
                selectBackground();
                picturedata.splice(0, 3);
                console.log(picturedata);
                for (let i: number = 0; i < picturedata.length; i++) {
                    let canvas: CanvasRenderingContext2D = <CanvasRenderingContext2D>maincanvas.getContext("2d");
                    if (picturedata[i] == "type:Star") {
                       let positionY: string = (picturedata[i - 1].replace("positionY:", "")); 
                       let positionX: string = (picturedata[i - 2].replace("positionX:", "")); 
                       let position: Vector = new Vector(parseInt(positionX), parseInt(positionY));
                       let star: Star = new Star(position);
                       star.draw(canvas);
                       moveables.push(star);
                    }
                    if (picturedata[i] == "type:Circle") {
                        let positionY: string = (picturedata[i - 1].replace("positionY:", "")); 
                        let positionX: string = (picturedata[i - 2].replace("positionX:", "")); 
                        let position: Vector = new Vector(parseInt(positionX), parseInt(positionY));
                        let circle: Circle = new Circle(position);
                        circle.draw(canvas);
                        moveables.push(circle);
                    }
                    if (picturedata[i] == "type:Triangle") {
                        console.log(i);
                        let positionY: string = (picturedata[i - 1].replace("positionY:", "")); 
                        let positionX: string = (picturedata[i - 2].replace("positionX:", "")); 
                        let position: Vector = new Vector(parseInt(positionX), parseInt(positionY));
                        let triangle: Triangle = new Triangle(position);
                        console.log(position);
                        triangle.draw(canvas);
                        moveables.push(triangle);
                    }
                    if (picturedata[i] == "type:Square") {
                        let positionY: string = (picturedata[i - 1].replace("positionY:", "")); 
                        let positionX: string = (picturedata[i - 2].replace("positionX:", "")); 
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