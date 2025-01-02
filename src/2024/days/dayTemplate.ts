import day from '../../day.class';
import * as formaters from '../helpers/formaters';

export class V1 extends day {
    constructor(year: number, test: number, isdebug: number) {
        super(year, test, isdebug);
    }

    getFakeInputs(): void {

        let inputs: string = '';

        // DO

        this.inputs = inputs;
    }

    formatInputs(): void {

        let formatedInputs: any = null;

        // DO

        this.formatedInputs = formatedInputs;
    }

    run(): void {
        let result: number = 0;

        // DO

        this.result = result;
    }
}

export class V2 extends V1 {
    constructor(year: number, test: number, isdebug: number) {
        super(year, test, isdebug);
    }

    run(): void {
        let result: number = 0;

        // DO

        this.result = result;
    }
}