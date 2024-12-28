import * as scraper from './helpers/scraper'

export default class day {
    private year: number;
    private test: number;
    private path: string;
    private isDebug: number;

    public inputs: string;
    public formatedInputs: any;
    public result: number;

    // Constructeur
    constructor(year: number, test: number, isDebug: number) {
        this.year = year;
        this.test = test;
        this.isDebug = isDebug;
        this.path = `./${this.year}/day${this.test}`;
        this.inputs = '';
        this.formatedInputs = null;
        this.result = 0;
    }

    async init(): Promise<void> {
        await this.getInputs()
        this.formatInputs();
    }

    async getInputs(): Promise<void> {
        this.inputs = await scraper.getHTML(this.year, this.test)
    }

    formatInputs(): void { }
    run(): void { }
}