import SzamModel from "../model/SzamModel.js";
import EredmenyView from "../view/EredmenyView.js";

export default class OsszeadasController {
    #viewEredmeny
    #modelSzam1
    #modelSzam2

    constructor(szuloElem) {
        this.#viewEredmeny = new EredmenyView(szuloElem);
        this.#modelSzam1 = new SzamModel(this.#viewEredmeny.getSzam1());
        this.#modelSzam2 = new SzamModel(this.#viewEredmeny.getSzam2());

        $(window).on("szam1Valtozas", (event) => {
            this.#modelSzam1.setSzaM(event.detail.getSzam1());
            let view = event.detail
            view.ervenytelenit();
            console.log("Szám1 változott:", event.detail.getSzam1());
        })

        $(window).on("szam2Valtozas", (event) => {
            this.#modelSzam2.setSzaM(event.detail.getSzam2());
            let view = event.detail
            view.ervenytelenit();
            console.log("Szám2 változott:", event.detail.getSzam2());
        })

        $(window).on("szamolas", (event) => {
            let view = event.detail

            let szam1 = this.#modelSzam1.getSzam();
            let szam2 = this.#modelSzam2.getSzam();
            let eredmeny = szam1 + szam2;
            console.log("Számolás:", szam1, szam2);

            view.eredmeny(eredmeny);
        })
    }
}