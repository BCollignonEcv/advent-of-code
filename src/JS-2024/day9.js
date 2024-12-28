const inputScraper = require('../helpers/inputScraper')
const textToInput = require('../helpers/textToInput');

const testInformations = {
    year: 2024,
    number: 9
}

function v1 (inputs) {
    this.result = 0;
    this.inputs = inputs;
    this.formatedInputs = [];
    this.formatedInputsCompressed = [];
    this.validators = {
        isFile: (value) => {
            return value != '.';
        }
    };
    this.executors = {
        toIdValue: (inputs) => {
            inputs.forEach((input, key) => {
                let idValue = key % 2 != 0 ? this.printers.printSpace(input) : this.printers.printBlock(Math.floor(key / 2), input);
                this.formatedInputs.push(...idValue);
            })
        },
        reduceSpace: (formatedInputs) => {
            this.formatedInputsCompressed = this.formatedInputs;
            let i = formatedInputs.length - 1;
            while (i >= 0) {
                if (this.validators.isFile(formatedInputs[i])) {
                    let firstSpaceIndex = this.formatedInputsCompressed.indexOf('.')
                    if (firstSpaceIndex !== -1) {
                        this.formatedInputsCompressed[firstSpaceIndex] = formatedInputs[i]
                        this.formatedInputsCompressed.splice(i, 1);
                    } else {
                        // Force end of loop as no space available
                        break;
                    }
                } else {
                    this.formatedInputsCompressed.splice(i, 1);
                }
                i--;
            }
        },
        calculate: (formatedInputsCompressed) => {
            formatedInputsCompressed.forEach((value, key) => {
                this.result += value*key;
            })
        }
    }
    this.printers = {
        printSpace: (length) => {
            return Array.from({ length: length }, () => '.');
        },
        printBlock: (id, length) => {
            return Array.from({ length: length }, () => id);
        },
    }
    this.run = (inputs) => {
        // console.log(JSON.stringify(inputs))

        this.executors.toIdValue(inputs)
        // console.log(JSON.stringify(this.formatedInputs))

        this.executors.reduceSpace(this.formatedInputs)
        console.log(JSON.stringify(this.formatedInputsCompressed))

        this.executors.calculate(this.formatedInputsCompressed)
        // console.log(this.result)

        return this.result;
    }
}

function v2(inputs) {
    this.result = 0;
    this.inputs = inputs;
    this.formatedInputs = [];
    this.formatedInputsCompressed = [];
    this.validators = {
        isFile: (value) => {
            return value != '.';
        }
    };
    this.executors = {
        defragmentIndicator: (inputs) => {
            inputs.forEach((input, key) => {
                let idValue = key % 2 != 0 ? this.printers.printSpace(input) : this.printers.printBlock(Math.floor(key / 2), input);
                this.formatedInputs.push(...idValue);
            })
        },
        compact: (formatedInputs) => {
            this.formatedInputsCompressed = this.formatedInputs;
            let i = formatedInputs.length - 1;
            while (i >= 0) {
                if (this.validators.isFile(formatedInputs[i])) {
                    let firstSpaceIndex = this.formatedInputsCompressed.indexOf('.')
                    if (firstSpaceIndex !== -1) {
                        this.formatedInputsCompressed[firstSpaceIndex] = formatedInputs[i]
                        this.formatedInputsCompressed.splice(i, 1);
                    } else {
                        // Force end of loop as no space available
                        break;
                    }
                } else {
                    this.formatedInputsCompressed.splice(i, 1);
                }
                i--;
            }
        },
        calculate: (formatedInputsCompressed) => {
            formatedInputsCompressed.forEach((value, key) => {
                this.result += value * key;
            })
        }
    }
    this.printers = {
        printSpace: (length) => {
            return Array.from({ length: length }, () => '.');
        },
        printBlock: (id, length) => {
            return Array.from({ length: length }, () => id);
        },
    }
    this.run = (inputs) => {
        // console.log(JSON.stringify(inputs))

        this.executors.defragmentIndicator(inputs)
        // console.log(JSON.stringify(this.formatedInputs))

        this.executors.compact(this.formatedInputs)
        // console.log(JSON.stringify(this.formatedInputsCompressed))

        this.executors.calculate(this.formatedInputsCompressed)
        // console.log(this.result)

        return this.result;
    }
}

const run = async (isDebug) => {
    let result = {
        v1: "Not calculated",
        v2: "Not calculated"
    };

    if (isDebug) {
        html = "23331331214141314021122334455"
        // html = await inputScraper.getHTML(testInformations);
        inputs = textToInput.lineTextToArrayOfArrayOfLetter(html);
        // inputs = inputs[0]
        inputs = inputs[0].slice(0, 50)
    } else {
        // retreive input from website
        html = await inputScraper.getHTML(testInformations);
        inputs = textToInput.lineTextToArrayOfArrayOfLetter(html);
        inputs = inputs[0]
    }

    // result.v1 = new v1().run(inputs)

    // calculate v2
    result.v2 = new v2().run(inputs)

    return result;
}

module.exports = {
    run
}