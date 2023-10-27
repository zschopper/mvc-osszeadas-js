import SzamModel from "../model/SzamModel.js";
import EredmenyView from "../view/EredmenyView.js";

export default class OsszeadasController {
    #viewEredmeny
    #modelSzam1
    #modelSzam2
    #statusz = { 1: "", 2: "" };

    constructor(szuloElem) {
        this.#viewEredmeny = new EredmenyView(szuloElem);
        this.#modelSzam1 = new SzamModel(this.#viewEredmeny.getSzam1());
        this.#modelSzam2 = new SzamModel(this.#viewEredmeny.getSzam2());

        $(window).on("szam1Valtozas", (event) => {
            this.szamvaltozas(this.#modelSzam1, event.detail.getSzam1(), 1)
        })

        $(window).on("szam2Valtozas", (event) => {
            this.szamvaltozas(this.#modelSzam2, event.detail.getSzam2(), 2)
        })

        $(window).on("szamolas", (event) => {
            // újra ellenőriztetjük a számokat
            this.szamvaltozas(this.#modelSzam1, this.#viewEredmeny.getSzam1(), 1);
            this.szamvaltozas(this.#modelSzam2, this.#viewEredmeny.getSzam2(), 2);

            let hibaUzenet = this.hibak().join("<br>");
            if (hibaUzenet) {
                this.#viewEredmeny.statusz(hibaUzenet);
            }else {
                let szam1 = this.#modelSzam1.getSzam();
                let szam2 = this.#modelSzam2.getSzam();

                let eredmeny = szam1 + szam2;
                // console.log("Számolás:", szam1, szam2);

                this.#viewEredmeny.eredmeny(eredmeny);
            }
        })
    }

    szamvaltozas(model, szam, idx) {
        model.setSzaM(szam);
        if (isNaN(szam)) {
            this.#statusz[idx] = `A(z) ${idx}. szám érvénytelen!`;
        } else {
            this.#statusz[idx] = "";
        }
        let hibaUzenet = this.hibak().join("<br>");
        if (hibaUzenet) {
            this.#viewEredmeny.statusz(hibaUzenet);
        } else {
            this.#viewEredmeny.ervenytelenit();
        }
        // console.log(idx, "szám változott:", szam);
    }

    hibak() {
        return Object.values(this.#statusz).filter((elem) => (elem.length));
    }
}