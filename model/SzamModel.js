export default class SzamModel {
    #szam;
    constructor(szam = 0) {
        this.setSzaM(szam);
    }

    getSzam(szam) {
        return this.#szam;
    }

    setSzaM(szam) {
        this.#szam = szam;
    }
}