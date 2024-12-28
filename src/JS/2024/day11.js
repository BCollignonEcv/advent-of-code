const inputScraper = require('../helpers/inputScraper')
const textToInput = require('../helpers/textToInput');
const validators = require('../helpers/validators');

const fs = require('node:fs');

const testInformations = {
    year: 2024,
    number: 11
}

function v1(inputs) {
    this.result = 0;
    this.inputs = inputs;
    this.optimizedInputs = {
        store1: [],
    },
    this.validators = {
        is0stone: (stone) => {
            return stone === 0;
        },
    };
    this.steps = {
        blink: (inputs) => {
            return inputs.reduce((result, input) => {
                const inputString = input.toString();
                const inputLength = inputString.length;

                if (this.validators.is0stone(input)) {
                    result.push(1);
                } else if (validators.isEven(inputLength)) {
                    const midIndex = inputLength / 2;
                    const part1 = Number(inputString.slice(0, midIndex));
                    const part2 = Number(inputString.slice(midIndex));
                result.push(part1, part2);
                } else {
                    result.push(input * 2024);
                }

                return result;
            }, [])
        }
    }
    this.run = (iteration) => {
        for (let index = 1; index <= iteration; index++){
            console.log('BLINK ', index, ' - Length : ', this.inputs.length)
            console.log(this.inputs)
            this.inputs = this.steps.blink(this.inputs);
        }

        console.log(this.inputs)
        this.result = this.inputs.length

        return this.result;
    }
}

function v2(inputs) {
    this.result = 0;
    this.inputs = inputs;
    this.storedInputs = {};
    this.validators = {
        is0stone: (stone) => {
            return stone === 0;
        },
    };
    this.steps = {
        blink: (inputs, iteration) => {
            let result = [];
            inputs.forEach(input => {
                iteration--;

                if (iteration === 0) {
                    console.log(result)
                    return;
                }

                console.log(iteration, input)
                const inputString = input.toString();
                const inputLength = inputString.length;



                if (this.validators.is0stone(input)) {
                    result.push(this.steps.blink([1], iteration))
                } else if (validators.isEven(inputLength)) {
                    const midIndex = inputLength / 2;
                    const part1 = Number(inputString.slice(0, midIndex));
                    const part2 = Number(inputString.slice(midIndex));
                    result.push(this.steps.blink([part1], iteration), this.steps.blink([part2], iteration));
                } else {
                    result.push(this.steps.blink([input * 2024], iteration));
                }
            })
        }
    }
    this.run = (iteration) => {
        iteration++
        console.log('\n V2 : ')
        this.inputs = this.steps.blink(this.inputs, iteration);
        this.result = this.inputs.length

        return this.result;
    }
}

function v3(inputs) {
    this.result = 0;
    this.inputs = inputs;
    this.steps = {
        matchAndAdd: (stone, stones) => {
            const match = stones.find((x) => x.val === stone.val);
            if (match) match.amount += stone.amount;
            else stones.push(stone);
        }
    };
    this.run = (iteration) => {
        let stones = this.inputs.map((x) => ({ val: x, amount: 1 }));

        for (let run = 0; run < iteration; run++) {
            let newStones = [];
            for (let i = 0; i < stones.length; i++) {
                let curr = stones[i];
                if (curr.val === 0) {
                    this.steps.matchAndAdd({ val: 1, amount: curr.amount }, newStones);
                } else if (`${curr.val}`.length % 2 === 0) {
                    const middle = `${curr.val}`.length / 2;
                    const first = parseInt(`${curr.val}`.slice(0, middle));
                    const second = parseInt(`${curr.val}`.slice(middle));
                    this.steps.matchAndAdd({ val: first, amount: curr.amount }, newStones);
                    this.steps.matchAndAdd({ val: second, amount: curr.amount }, newStones);
                } else {
                    this.steps.matchAndAdd({ val: stones[i].val * 2024, amount: curr.amount }, newStones);
                }
            }
            stones = newStones;
        }

        let res = 0;
        console.log(stones)
        stones.forEach((stone) => {
            res += stone.amount;
        });

        return res;
    };
}

const run = async (isDebug) => {

    let html, inputs;
    let iteration = 75;

    if (isDebug) {
        html = "1234";
        inputs = textToInput.textToArrayOfNumber(html, " ");
    } else {
        // retreive input from website
        html = await inputScraper.getHTML(testInformations);
        html = html.replace(/\n/g, "");
        inputs = textToInput.textToArrayOfNumber(html, " ");
    }

    let result = {
        v2: new v3(inputs).run(iteration)
        // v1: new v1(inputs).run(iteration),
        // v2: new v2(inputs).run(iteration)
    };

    return result;
}

module.exports = {
    run
}