export default class EredmenyView {
    #szuloElem
    #inputSzam1
    #inputSzam2
    #eredmeny
    #statusz

    constructor(szuloElem) {
        this.#szuloElem = szuloElem;
        this.#inputSzam1 = this.#szuloElem.find('#inputSzam1');
        this.#inputSzam2 = this.#szuloElem.find('#inputSzam2');
        this.#statusz = this.#szuloElem.find('div.statusz');
        this.#eredmeny = this.#szuloElem.find('div.eredmeny');

        let gomb = this.#szuloElem.find('button');

        this.#inputSzam1.on("change", () => {
            this.#esemenyTrigger("szam1Valtozas");
        });

        this.#inputSzam2.on("change", () => {
            this.#esemenyTrigger("szam2Valtozas");
        });

        gomb.on("click", () => {
            this.#esemenyTrigger("szamolas");
        });
    }

    getSzam1() {
        return parseInt(this.#inputSzam1.val());
    }

    getSzam2() {
        return parseInt(this.#inputSzam2.val());
    }

    #esemenyTrigger(esemenynev) {
        window.dispatchEvent(new CustomEvent(esemenynev, {detail:this}));
    }

    statusz(szoveg) {
        this.#statusz.html(szoveg);
    }

    ervenytelenit() {
        this.statusz("Az új számok összegzéséhez kattints a gombra!");
        this.eredmeny("");
    }

    eredmeny(eredmeny) {
        if (eredmeny != "") {
            this.#eredmeny.html("Az eredmény: " + eredmeny);
            this.statusz("");
        } else {
            this.#eredmeny.html("");
        }
    }
}
