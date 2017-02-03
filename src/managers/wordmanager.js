
let instance;
export default class WordManager {
    constructor() {
        this.words = ["nitrocellulose", "naraka", "bumming", "zod", "dinwiddie", "nixes", "overmeek", "underdrainage", "suspensibility", "excrementous", "remarriage", "surname", "superabnormal", "nuclide", "presanctification", "phlegethontic", "hartsville", "unchannelled", "vainglory", "plash", "serumal", "trumpless", "staminodia", "grapy", "stadholdership", "genii", "rekindle", "sourish", "footlocker", "enshrinement", "equalise", "lowish", "bishop", "thrips", "declassify", "prehatred", "undercourtier", "humblebee", "sharen", "blackfigured", "yucatec", "proagrarian", "intransigeance", "inalienable", "yearner", "precuring", "nonsoluble", "palaeocene", "unremonstrating", "broodier"];
    }
    static get() {
        if (!instance) {
            instance = new WordManager();
        }
        return instance;
    }
    generateWords() {
        const result = [];
        for (let i = 0, count = 50; i < count; i++) {
            result.push(this.words[Math.floor(Math.random() * (count + 1))]);
        }
        return result;
    }
}