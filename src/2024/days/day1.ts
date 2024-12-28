import day from '../../day.class';
import * as formaters from '../../helpers/formaters';

export class V1 extends day {
    constructor(year: number, test: number, isdebug: number) {
        super(year, test, isdebug);
    }

    formatInputs(): void {
        let lines = formaters.textToArrayLine(this.inputs);
        let columns: Array<Array<number>> = [[], []]
        lines.forEach((line: string) => {
            let lineArray = formaters.textToArrayOfChar(line, '   ');
            columns[0].push(Number(lineArray[0]))
            columns[1].push(Number(lineArray[1]))
        })

        columns[0] = columns[0].sort((a: number, b: number) => Number(a) - Number(b));
        columns[1] = columns[1].sort((a: number, b: number) => Number(a) - Number(b));

        this.formatedInputs = columns;
    }

    run(): void {
        let result: number = 0;

        if (this.formatedInputs[0].length === this.formatedInputs[1].length) {
            for (let i = 0; i < this.formatedInputs[0].length; i++) {
                result += Math.abs(this.formatedInputs[0][i] - this.formatedInputs[1][i])
            }
        }

        this.result = result;
    }
}

export class V2 extends V1 {
    constructor(year: number, test: number, isdebug: number) {
        super(year, test, isdebug);
    }

    run(): void {
        let result: number = 0;

        if (this.formatedInputs[0].length === this.formatedInputs[1].length) {
            for (let i = 0; i < this.formatedInputs[0].length; i++) {
                let subresult = this.formatedInputs[1].filter((item: number) => item === this.formatedInputs[0][i]).length;
                result += this.formatedInputs[0][i] * subresult;
            }
        }

        this.result = result;
    }
}