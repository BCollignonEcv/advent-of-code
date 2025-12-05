import day from '../../day.class';
import * as formaters from '../helpers/formaters';

export class V1 extends day {
    public startPosition: number;

    constructor(year: number, test: number, isdebug: number) {
        super(year, test, isdebug);

        this.startPosition = 50;
    }

    getFakeInputs(): void {
        let inputs: string = 'L68\nL30\nR48\nL5\nR60\nL55\nL1\nL99\nR14\nL82';
        // let inputs: string = 'L50\nR100\nL100';
        this.inputs = inputs;
    }

    formatInputs(): void {

        let lines: Array<String> = formaters.textToArrayLine(this.inputs);
        let formatedInputs: Array<number> = lines.map(line => {
            let direction: String = line.slice(0, 1)
            let length: String = line.slice(1)

            if (direction === 'R') {
                return Number(length);
            } else {
                return -Number(length);
            }
        })

        this.formatedInputs = formatedInputs;
    }

    run(): void {
        let result: number = 0;
        let position: number = this.startPosition;
        this.formatedInputs.forEach((move: number) => {
            position += move;
            position = position % 100;
            if (position < 0) position += 100
            if (position === 0) result += 1;
        });

        this.result = result;
    }
}

export class V2 extends V1 {
    constructor(year: number, test: number, isdebug: number) {
        super(year, test, isdebug);
    }

    run(): void {
        let result: number = 0;
        let position: number = this.startPosition;
        this.formatedInputs.forEach((move: number) => {
            var oldPosition = position
            var remainMove = move % 100;
            var loop = Math.abs(move - remainMove) / 100;
            position += remainMove;


            if (position === 0 && oldPosition != 0) {
                loop++;
            } else if(position > 0) {
                if (position >= 100) {
                    loop++;
                    position -= 100;
                }
                if (oldPosition < 0) loop++;
            } else if(position < 0) {
                if (position <= -100) {
                    loop++;
                    position += 100;
                }
                if (oldPosition > 0) loop++;
                position += 100;
            }

            result += loop;
            console.log(`${oldPosition} (move : ${move}) -> ${position} | ${loop}`)
        });

        this.result = result;
    }
}
