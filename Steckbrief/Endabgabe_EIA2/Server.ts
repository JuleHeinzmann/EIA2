namespace Zaubercanvas {
    let url: string = "https://endabgabeeia2.herokuapp.com/";
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
        //let response: Response = await fetch(url + ",Name: " + name + ",Canvas: " + canvasQuery.toString() + ",Figures: " + query.toString());
        await fetch(url + "?insertName&" + name);

        let responseText: string = await response.text();
        if (responseText != "") {
            alert("Your picture " + _name + " has been saved!");
        }
        else {
            alert("An error has occurred during saving");
        }
        console.log(responseText);
    }

    export async function loadPicture(): Promise<void> {
        let name: string = savedpicture.value;
        let response: Response = await fetch(url + "?" + "findPicture&" + name);
        let responseText: string = await response.text();
        console.log(responseText);
    }
}