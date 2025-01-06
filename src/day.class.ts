import * as scraper from './helpers/scraper'

export default class day {
    private year: number;
    private test: number;
    private filePath: string;
    private isDebug: number;

    public inputs: string;
    public formatedInputs: any;
    public result: number;

    // Constructeur
    constructor(year: number, test: number, isDebug: number) {
        this.year = year;
        this.test = test;
        this.isDebug = isDebug;
        this.filePath = `./${this.year}/day${this.test}`;
        this.inputs = '';
        this.formatedInputs = null;
        this.result = 0;
    }

    async init(): Promise<void> {
        if (this.isDebug) {
            this.getFakeInputs()
        } else {
            await this.getInputs()
        }
        this.formatInputs();
    }

    getFakeInputs(): void {
        this.inputs = 'test'
    }

    async getInputs(): Promise<void> {
        this.inputs = await scraper.getHTML(this.year, this.test)
    }

    formatInputs(): void { }
    run(): void { }
}