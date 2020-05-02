namespace Sequenzmemory {

let oneMin: number = 60000;
let threeMin: number = 180000;
let thirtySec: number = 30000;
let own: string;
let position: number = 0;
window.addEventListener("load", handleLoad)

function handleLoad(): void {
document.querySelector("#eine_minute").addEventListener("click", Spielzeit);
document.querySelector("#drei_minuten").addEventListener("click", Spielzeit);
document.querySelector("#merken_1").addEventListener("click", Merkzeit);
document.querySelector("#merken_2").addEventListener("click", Merkzeit);
document.querySelector("#hilfe").addEventListener("click", function(){alert("Press H for a tip"); });
document.querySelector("#start").addEventListener("click", StartGame);
document.querySelector("#s1").addEventListener("click", chooseSequenz);
document.querySelector("#s2").addEventListener("click", chooseSequenz);
document.querySelector("#s3").addEventListener("click", chooseSequenz);
document.querySelector("#s4").addEventListener("click", chooseSequenz);
document.querySelector("#s5").addEventListener("click", chooseSequenz);
document.querySelector("#s6").addEventListener("click", chooseSequenz);
document.querySelector("#s7").addEventListener("click", chooseSequenz);
document.querySelector("#s8").addEventListener("click", chooseSequenz);
document.querySelector("#s9").addEventListener("click", chooseSequenz);
document.querySelector("#s10").addEventListener("click", chooseSequenz);
document.querySelector("#user_sequenz").addEventListener("click", ownSequenz);
document.addEventListener("keydown", Hilfe);
}

function Spielzeit(_event: MouseEvent): void {
    let clickedButton: HTMLElement = <HTMLElement> _event.target;
    let auswahlspielzeit: HTMLSpanElement = document.querySelector("#auswahl_spielzeit");
    auswahlspielzeit.innerHTML = clickedButton.textContent;
}

function Merkzeit(_event: MouseEvent): void {
    let clickedButton: HTMLElement = <HTMLElement> _event.target;
    let auswahlmerkzeit: HTMLSpanElement = document.querySelector("#auswahl_merkzeit");
    auswahlmerkzeit.innerHTML = clickedButton.textContent;
}

function StartGame(): void {
let sequenz: string = document.querySelector("#aktuelle_sequenz").textContent;
let spielzeit: string = document.querySelector("#auswahl_spielzeit").textContent;
ShuffleSequenz(sequenz);
//StartTimer(spielzeit);
//buildGame(shufflesequence, Merkzeit)
}

function chooseSequenz(_event: MouseEvent): void {
let clickedButton: HTMLElement = <HTMLElement> _event.target;
let sequenz: string = (<HTMLInputElement> document.getElementById(clickedButton.id)).value;
let aktuellesequenz: HTMLSpanElement = document.querySelector("#aktuelle_sequenz");
aktuellesequenz.innerHTML = sequenz;
}

function ownSequenz(): void {
let sequenzInput: string = prompt ("Gewünschte Sequenz eingeben");
let aktuellesequenz: HTMLSpanElement = document.querySelector("#aktuelle_sequenz");
aktuellesequenz.innerHTML = sequenzInput;


}

function Hilfe(): void {

}

function ShuffleSequenz(_sequenz) : void {
    var shuffledsequenz: string = "";
    _sequenz = _sequenz.split("");
    while (_sequenz.length > 0) {
        shuffledsequenz += _sequenz.splice(_sequenz.length * Math.random() << 0, 1 );
    }
    buildGame(shuffledsequenz);
}

function buildGame(_shuffledsequenz: string): void {
    for (let i:number = 0; i < _shuffledsequenz.length; i++) {
        var letter: HTMLDivElement = document.createElement("div");
        document.querySelector("#spielfeld").appendChild(letter);
        letter.textContent = _shuffledsequenz[i];
        letter.addEventListener("click",turnCard);
        letter.classList.add("offen");
        KarteVerdecken(letter);
    }
}

function KarteVerdecken(letter: HTMLDivElement): void {
let Merkzeit: string = document.querySelector("#auswahl_merkzeit").textContent;
if (Merkzeit == "10 Sekunden") {
    setTimeout(function() {letter.classList.replace("offen", "verdeckt"); }, 10000);
}
else {
    setTimeout(function() {letter.classList.replace("offen", "verdeckt"); }, 5000);
}
}

function turnCard(_event: MouseEvent): void {
let sequenz: string = document.querySelector("#aktuelle_sequenz").textContent;
let target: HTMLElement = <HTMLElement> _event.target;
if (target.textContent == sequenz[position]) {
 target.classList.replace("verdeckt", "offen");
 position++;
 if (position == sequenz.length) {
     alert("gewonnen");
 }  
 
}
else {
    alert("falscher Buchstabe");
}
}

//Ich habe die Konzeption von Sarah Franke bekommen. Ich habe Änderungen gemacht damit es funktioniert und hab erst später gesehen,
//dass ich das nicht darf...
//Deswegen ist es jetzt ein bisschen anders als im Konzept. Ich hab Sarah aber gesagt, was ich geändert habe
}