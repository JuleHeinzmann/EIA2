var oneMin = 60000;
var threeMin = 180000;
var thirtySec = 30000;
var own;
var position = 0;
window.addEventListener("load", handleLoad);
function handleLoad() {
    document.querySelector("#eine_minute").addEventListener("click", Spielzeit);
    document.querySelector("#drei_minuten").addEventListener("click", Spielzeit);
    document.querySelector("#merken_1").addEventListener("click", Merkzeit);
    document.querySelector("#merken_2").addEventListener("click", Merkzeit);
    document.querySelector("#hilfe").addEventListener("click", function () { alert("Press H for a tip"); });
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
function Spielzeit(_event) {
    var clickedButton = _event.target;
    var auswahlspielzeit = document.querySelector("#auswahl_spielzeit");
    auswahlspielzeit.innerHTML = clickedButton.textContent;
}
function Merkzeit(_event) {
    var clickedButton = _event.target;
    var auswahlmerkzeit = document.querySelector("#auswahl_merkzeit");
    auswahlmerkzeit.innerHTML = clickedButton.textContent;
}
function StartGame() {
    var sequenz = document.querySelector("#aktuelle_sequenz").textContent;
    var spielzeit = document.querySelector("#auswahl_spielzeit").textContent;
    ShuffleSequenz(sequenz);
    //StartTimer(spielzeit);
    //buildGame(shufflesequence, Merkzeit)
}
function chooseSequenz(_event) {
    var clickedButton = _event.target;
    var sequenz = document.getElementById(clickedButton.id).value;
    var aktuellesequenz = document.querySelector("#aktuelle_sequenz");
    aktuellesequenz.innerHTML = sequenz;
}
function ownSequenz() {
    var sequenzInput = prompt("Gewünschte Sequenz eingeben");
    var aktuellesequenz = document.querySelector("#aktuelle_sequenz");
    aktuellesequenz.innerHTML = sequenzInput;
}
function Hilfe() {
}
function ShuffleSequenz(_sequenz) {
    var shuffledsequenz = "";
    _sequenz = _sequenz.split("");
    while (_sequenz.length > 0) {
        shuffledsequenz += _sequenz.splice(_sequenz.length * Math.random() << 0, 1);
    }
    buildGame(shuffledsequenz);
}
function buildGame(_shuffledsequenz) {
    for (var i = 0; i < _shuffledsequenz.length; i++) {
        var letter = document.createElement("div");
        document.querySelector("#spielfeld").appendChild(letter);
        letter.textContent = _shuffledsequenz[i];
        letter.addEventListener("click", turnCard);
        letter.classList.add("offen");
        KarteVerdecken(letter);
    }
}
function KarteVerdecken(letter) {
    var Merkzeit = document.querySelector("#auswahl_merkzeit").textContent;
    if (Merkzeit == "10 Sekunden") {
        setTimeout(function () { letter.classList.replace("offen", "verdeckt"); }, 10000);
    }
    else {
        setTimeout(function () { letter.classList.replace("offen", "verdeckt"); }, 5000);
    }
}
function turnCard(_event) {
    var sequenz = document.querySelector("#aktuelle_sequenz").textContent;
    var target = _event.target;
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
//# sourceMappingURL=Aufgabe_2_script.js.map