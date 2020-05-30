"use strict";
var HaushaltshilfeA6;
(function (HaushaltshilfeA6) {
    window.addEventListener("load", handleLoad);
    //let url: string = "HaushaltshilfeA6.html";
    let url = "http://localhost:5001";
    async function handleLoad() {
        let response = await fetch("Data3.json");
        let content = await response.text();
        let data = JSON.parse(content);
        let form = document.querySelector("#form");
        let submit = document.querySelector("#button");
        form.addEventListener("change", handleChange);
        submit.addEventListener("click", sendOrder);
        document.querySelector("#buttonreset")?.addEventListener("click", clickDelete);
        HaushaltshilfeA6.generateContent(data);
    }
    function clickDelete() {
        let order = document.querySelector("#order");
        order.innerHTML = "";
    }
    async function sendOrder() {
        let formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        let response = await fetch(url + "?" + query.toString());
        let responseText = await response.text();
        alert(responseText);
    }
    function handleChange(_event) {
        //console.log(_event);
        let order = document.querySelector("#order");
        order.innerHTML = "";
        let data = new FormData(document.forms[0]);
        let total = 0;
        for (let entry of data) {
            if (entry[0] == "Artikel") {
                let item = document.querySelector("[value='" + entry[1] + "']");
                let price = Number(item.getAttribute("price"));
                let amount = Number(data.get(entry[1] + "Menge"));
                let einheit = (item.getAttribute("einheit"));
                total += price * amount;
                order.innerHTML += item.value + " | " + amount + " " + einheit + ": " + price * amount + " €" + "<br> <br>";
            }
            if (entry[0] == "Geld") {
                let item = document.querySelector("[value='" + entry[1] + "']");
                let betrag = Number(data.get("Betrag"));
                order.innerHTML += item.value + ": " + betrag + " €" + " <br>" + " Gebühr: 5€ <br> <br>";
                total += 5;
            }
            if (entry[0] == "Hausarbeiten") {
                let item = document.querySelector("[value='" + entry[1] + "']");
                let price = Number(item.getAttribute("price"));
                total += price;
                order.innerHTML += item.value + ": " + price + " €" + "<br> <br>";
            }
            if (entry[0] == "Zahlung") {
                let item = document.querySelector("[value='" + entry[1] + "']");
                order.innerHTML += "--------------------------------- <br> Zahlungsmethode: " + item.value + "<br> <br>";
            }
        }
        let supermarkt = data.get("Supermarkt");
        order.innerHTML += "Supermarkt Präferenz: " + supermarkt + "<br>" + "______________________ <br>" + "Total: " + total + "€";
    }
})(HaushaltshilfeA6 || (HaushaltshilfeA6 = {}));
//# sourceMappingURL=HaushaltshilfeA6_script.js.map