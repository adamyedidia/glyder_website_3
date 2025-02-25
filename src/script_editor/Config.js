export class Config {
    constructor({ name, townsfolk, outsiders, minions, demons, setupText, firstNightOrder, otherNightOrder, highlightedCharacters = [], header = null, icons = {} }) {
        this.name = name;
        this.townsfolk = townsfolk;
        this.outsiders = outsiders;
        this.minions = minions;
        this.demons = demons;
        this.setupText = setupText;
        this.highlightedCharacters = highlightedCharacters;
        this.header = header;
        this.firstNightOrder = firstNightOrder;
        this.otherNightOrder = otherNightOrder;
        this.icons = icons;
    }

    toJSON() {
        return {
            name: this.name,
            townsfolk: this.townsfolk,
            outsiders: this.outsiders,
            minions: this.minions,
            demons: this.demons,
            setupText: this.setupText,
            highlightedCharacters: this.highlightedCharacters,
            header: this.header,
            firstNightOrder: this.firstNightOrder,
            otherNightOrder: this.otherNightOrder,
            icons: this.icons
        };
    }

    fromJSON(json) {
        this.name = json.name;
        this.townsfolk = json.townsfolk;
        this.outsiders = json.outsiders;
        this.minions = json.minions;
        this.demons = json.demons;
        this.setupText = json.setupText;
        this.highlightedCharacters = json.highlightedCharacters;
        this.header = json.header;
        this.firstNightOrder = json.firstNightOrder;
        this.otherNightOrder = json.otherNightOrder;
        this.icons = json.icons;
    }
}

export const emptyConfig = new Config({
    name: '',
    townsfolk: [],
    outsiders: [],
    minions: [],
    demons: [],
    setupText: {},
    highlightedCharacters: [],
    header: null,
    firstNightOrder: [],
    otherNightOrder: [],
    icons: {}
});