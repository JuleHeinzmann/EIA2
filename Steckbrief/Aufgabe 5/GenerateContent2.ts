namespace HaushaltshilfeA5 {
    export interface Item {
        name: string;
        price: number;
        einheit: string;
    }

    export interface Data  {
        [category: string]: Item[];
    }
    
    export function generateContent(_data: Data): void {

        for (let category in _data) {
            let items: Item[] = _data[category];
            let group: HTMLElement | null = null;
            switch (category) {
                case "Artikel":
                    group = createMultiple(items, category);
                    break;

                case "Supermarkt":
                    group = createSelect(items, category);
                    break;
                
                case "Hausarbeiten":
                    group = createSelect(items, category);
                    break;

                case "Zahlung":
                    group = createSingle(items, category);
                    break;
                    
                default:
                    break;

            }

            let fieldset: HTMLFieldSetElement | null = document.querySelector("fieldset#" + category);
            if (fieldset && group) 
                fieldset.appendChild(group);
        }

        function createSelect(_items: Item[], _category:string): HTMLElement | null {
            let group: HTMLDivElement = document.createElement("div");
            let select: HTMLSelectElement = document.createElement("select");
            select.name = _category;
            for (let item of _items) {
                let newoption: HTMLOptionElement = document.createElement("option");
                newoption.text = item.name;
                select.add(newoption);
                newoption.setAttribute("price", item.price.toFixed(2));
                newoption.value = item.name;
                group.appendChild(select);
            
        
            }
            return group;
        }

        function createSingle(_items: Item[], _category:string): HTMLElement | null {
            let group: HTMLDivElement = document.createElement("div");
            for (let item of _items) {
                let radio: HTMLInputElement = document.createElement("input");
                radio.type = "radio";
                radio.setAttribute("price", item.price.toFixed(2));
                radio.setAttribute("einheit", item.einheit);
                radio.value = item.name;
                radio.name = _category;
                radio.id = item.name;
                let label: HTMLLabelElement = document.createElement("label");
                label.textContent = item.name;
                label.htmlFor = item.name;
                group.appendChild(radio);
                group.appendChild(label);
            }

            return group;
        }

        function createMultiple(_items: Item[],_category: string): HTMLElement | null {
            let group: HTMLDivElement = document.createElement("div");
            for (let item of _items) {
                let checkbox: HTMLInputElement = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.setAttribute("price", item.price.toFixed(2));
                checkbox.setAttribute("einheit", item.einheit);
                checkbox.value = item.name;
                checkbox.name = _category;
                checkbox.id = item.name;
                let label: HTMLLabelElement = document.createElement("label");
                label.textContent = item.name;
                label.htmlFor = item.name;
                group.appendChild(checkbox);
                group.appendChild(label);
                let menge: HTMLInputElement = document.createElement("input");
                menge.type = "number";
                menge.name = item.name + "Menge";
                menge.max = "1000";
                menge.min = "0";
                menge.step = "1";
                menge.value = "0";
                group.appendChild(menge);
            }

            return group;
        }
    }
}