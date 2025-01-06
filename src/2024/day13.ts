import day from '../day.class';
import * as formaters from '../helpers/formaters';

type Dual = {
    [key: string]: number;
};

type Test = {
    A: Dual;
    B: Dual;
    R: Dual;
};

export class V1 extends day {
    constructor(year: number, test: number, isdebug: number) {
        super(year, test, isdebug);
    }

    getFakeInputs(): void {

        let inputs: string = 'Button A: X+94, Y+34\nButton B: X+22, Y+67\nPrize: X=8400, Y=5400\n\nButton A: X+26, Y+66\nButton B: X+67, Y+21\nPrize: X=12748, Y=12176\n\nButton A: X+17, Y+86\nButton B: X+84, Y+37\nPrize: X=7870, Y=6450\n\nButton A: X+69, Y+23\nButton B: X+27, Y+71\nPrize: X=18641, Y=10279';
        this.inputs = inputs;
    }

    formatInputs(): void {
        let buttonRegex = /Button (\w+): X\+(\d+), Y\+(\d+)/;
        let resultRegex = /Prize: X=(\d+), Y=(\d+)/;

        let splitedInputs = this.inputs.split('\n\n');

        let formatedInputs = splitedInputs.map(input => {
            let lines = input.split('\n');
            const matchA  = lines[0].match(buttonRegex);
            const matchB  = lines[1].match(buttonRegex);
            const matchResult  = lines[2].match(resultRegex);

            return {
                A: { X: matchA![2], Y: matchA![3] },
                B: { X: matchB![2], Y: matchB![3] },
                R: { X: matchResult![1], Y: matchResult![2] },
            }
        })

        this.formatedInputs = formatedInputs;
    }

    run(): void {
        let testResults = this.formatedInputs.map((input: Test) => {
            let determinant = (input.A.X * input.B.Y) - (input.A.Y * input.B.X)
            let determinantX = (input.R.X * input.B.Y) - (input.R.Y * input.B.X)
            let determinantY = (input.A.X * input.R.Y) - (input.A.Y * input.R.X)
            let result = {
                A: determinantX / determinant,
                B: determinantY / determinant,
                cost: 0
            }

            // Check result validy
            if(result.A % 1 !== 0 || result.B % 1 !== 0 && result.A < 100 && result.B < 100) {
                return false
            }

            //Calculate result cost
            result.cost = result.A*3 + result.B*1
            return result;
        })

        this.result = testResults.reduce((acc:number, testResult: Dual) => {
            return testResult.cost ? acc+ testResult.cost: acc;
        }, 0);

    }
}

export class V2 extends V1 {
    constructor(year: number, test: number, isdebug: number) {
        super(year, test, isdebug);
    }

    formatInputs(): void {
        let buttonRegex = /Button (\w+): X\+(\d+), Y\+(\d+)/;
        let resultRegex = /Prize: X=(\d+), Y=(\d+)/;

        let splitedInputs = this.inputs.split('\n\n');

        let formatedInputs = splitedInputs.map(input => {
            let lines = input.split('\n');
            const matchA  = lines[0].match(buttonRegex);
            const matchB  = lines[1].match(buttonRegex);
            const matchResult  = lines[2].match(resultRegex);

            return {
                A: { X: Number(matchA![2]), Y: Number(matchA![3]) },
                B: { X: Number(matchB![2]), Y: Number(matchB![3]) },
                R: { X: Number(matchResult![1]) + 10000000000000, Y: Number(matchResult![2]) + 10000000000000 },
            }
        })

        this.formatedInputs = formatedInputs;
    }

    run(): void {
        let testResults = this.formatedInputs.map((input: Test) => {
            let determinant = (input.A.X * input.B.Y) - (input.A.Y * input.B.X)
            let determinantX = (input.R.X * input.B.Y) - (input.R.Y * input.B.X)
            let determinantY = (input.A.X * input.R.Y) - (input.A.Y * input.R.X)
            let result = {
                A: determinantX / determinant,
                B: determinantY / determinant,
                cost: 0
            }

            // Check result validy
            if(result.A % 1 !== 0 || result.B % 1 !== 0) {
                return false
            }

            //Calculate result cost
            result.cost = result.A*3 + result.B*1
            return result;
        })

        this.result = testResults.reduce((acc:number, testResult: Dual) => {
            return testResult.cost ? acc+ testResult.cost: acc;
        }, 0);

    }
}