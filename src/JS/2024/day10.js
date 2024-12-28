const inputScraper = require('../helpers/inputScraper')
const textToInput = require('../helpers/textToInput');

const testInformations = {
    year: 2024,
    number: 10
}

function v1(inputs) {
    this.result = 0;
    this.inputs = inputs;
    this.paths = [];
    this.reached = [];
    this.validators = {
        isInLimite: (y, x) => {
            return y >= 0 && x >= 0 && y < this.inputs.length && x < this.inputs[y].length;
        },
        isReachable: (value, y, x) => {
            return this.validators.isInLimite(y, x) && this.inputs[y][x] == value;
        },
        isReached: (y, x) => {
            return this.reached.some(item => item[10] == [y, x]);
        },
        isSameArray: (array1, array2) => {
            return array1.every((value, index) => value === array2[index]);
        }
    };
    this.steps = {
        getPossibleStart: (inputs) => {
            let possibleStarts = [];
            for (let line = 0; line < inputs.length; line++) {
                for (let cell = 0; cell < inputs[line].length; cell++) {
                    if (inputs[line][cell] === '0') {
                        possibleStarts.push([line, cell])
                    }
                }
            }
            return possibleStarts;
        },
        recursiveMoveTo: (path, y, x) => {
            let result = [];

            // Add new position to the path
            let newPath = [...path, [y, x]];

            // Out success
            if (newPath.length === 10) {
                return [newPath];
            }

            let nextStep = +this.inputs[y][x] + 1;

            // Recursive
            // TOP
            if (this.validators.isReachable(nextStep, y - 1, x)) {
                result.push(...this.steps.recursiveMoveTo(newPath, y - 1, x));
            }
            // BOTTOM
            if (this.validators.isReachable(nextStep, y + 1, x)) {
                result.push(...this.steps.recursiveMoveTo(newPath, y + 1, x))
            }
            // LEFT
            if (this.validators.isReachable(nextStep, y, x - 1)) {
                result.push(...this.steps.recursiveMoveTo(newPath, y, x - 1))
            }
            // RIGHT
            if (this.validators.isReachable(nextStep, y, x + 1)) {
                result.push(...this.steps.recursiveMoveTo(newPath, y, x + 1))
            }

            return result;
        },
        cleanNoneUniqueEnd: (startPaths) => {
            startPaths.forEach(start => {
                let endReached = []
                start.forEach(path => {
                    if (!endReached.some(end => this.validators.isSameArray(end, path[9]))) {
                        this.result++
                        endReached.push(path[9])
                    }
                })
            })
        }
    }
    this.run = () => {

        this.inputs.forEach(line => {
            console.log(JSON.stringify(line))
        });

        // map all trailheads start possibility
        this.possibleStarts = this.steps.getPossibleStart(this.inputs)

        // this.possibleStarts = [this.possibleStarts[0]]
        this.possibleStarts.forEach(possibleStart => {
            this.paths.push(this.steps.recursiveMoveTo([], ...possibleStart));
        })

        this.steps.cleanNoneUniqueEnd(this.paths)

        return this.result;
    }
}

function v2(inputs) {
    this.result = 0;
    this.inputs = inputs;
    this.paths = [];
    this.reached = [];
    this.validators = {
        isInLimite: (y, x) => {
            return y >= 0 && x >= 0 && y < this.inputs.length && x < this.inputs[y].length;
        },
        isReachable: (value, y, x) => {
            return this.validators.isInLimite(y, x) && this.inputs[y][x] == value;
        },
        isReached: (y, x) => {
            return this.reached.some(item => item[10] == [y, x]);
        },
        isSameArray: (array1, array2) => {
            return array1.every((value, index) => value === array2[index]);
        }
    };
    this.steps = {
        getPossibleStart: (inputs) => {
            let possibleStarts = [];
            for (let line = 0; line < inputs.length; line++) {
                for (let cell = 0; cell < inputs[line].length; cell++) {
                    if (inputs[line][cell] === '0') {
                        possibleStarts.push([line, cell])
                    }
                }
            }
            return possibleStarts;
        },
        recursiveMoveTo: (path, y, x) => {
            let result = [];

            // Add new position to the path
            let newPath = [...path, [y, x]];

            // Out success
            if (newPath.length === 10) {
                this.result++
                return [newPath];
            }

            let nextStep = +this.inputs[y][x] + 1;

            // Recursive
            // TOP
            if (this.validators.isReachable(nextStep, y - 1, x)) {
                result.push(...this.steps.recursiveMoveTo(newPath, y - 1, x));
            }
            // BOTTOM
            if (this.validators.isReachable(nextStep, y + 1, x)) {
                result.push(...this.steps.recursiveMoveTo(newPath, y + 1, x))
            }
            // LEFT
            if (this.validators.isReachable(nextStep, y, x - 1)) {
                result.push(...this.steps.recursiveMoveTo(newPath, y, x - 1))
            }
            // RIGHT
            if (this.validators.isReachable(nextStep, y, x + 1)) {
                result.push(...this.steps.recursiveMoveTo(newPath, y, x + 1))
            }

            return result;
        }
    }
    this.run = () => {

        this.inputs.forEach(line => {
            console.log(JSON.stringify(line))
        });

        // map all trailheads start possibility
        this.possibleStarts = this.steps.getPossibleStart(this.inputs)

        // this.possibleStarts = [this.possibleStarts[0]]
        this.possibleStarts.forEach(possibleStart => {
            this.paths.push(this.steps.recursiveMoveTo([], ...possibleStart));
        })

        return this.result;
    }
}

const run = async (isDebug) => {
    let html, inputs;

    if (isDebug) {
        html = "89010123\n78121874\n87430965\n96549874\n45678903\n32019012\n01329801\n10456732";
        inputs = textToInput.textToMap(html);
    } else {
        // retreive input from website
        html = await inputScraper.getHTML(testInformations);
        inputs = textToInput.textToMap(html);
    }

    return {
        v1: new v1(inputs).run(),
        v2: new v2(inputs).run()
    };
}

module.exports = {
    run
}