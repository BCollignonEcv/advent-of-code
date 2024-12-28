const inputScraper = require('../TS/2024/helpers/inputScraper')
const textToInput = require('../TS/2024/helpers/textToInput');


const testInformations = {
    year: 2024,
    number: 12
}

const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1]
];

function v1(inputs) {
    this.result = 0;
    this.inputs = inputs;
    this.visited = new Set();
    this.areas = {};
    this.validators = {
        isValid: ([y, x]) => {
            return y >= 0 && y < this.inputs.length && x >= 0 && x < this.inputs[0].length;
        },
        isVisited: (coordinates) => {
            if (typeof coordinates === 'array') coordinates = coordinates.toString();
            return this.visited.has(coordinates)
        },
        isSameValue: (value, [y, x]) => {
            if (this.validators.isValid([y, x])) return this.inputs[y][x] === value;
            return false;
        },
        isAdjacente: ([y1, x1], [y2, x2]) => {
            return (Math.abs(y1 - y2) === 1 && x1 === x2) || (Math.abs(x1 - x2) === 1 && y1 === y2);
        }
    };
    this.steps = {
        mapCellWithSearch: (area, [y, x]) => {
            this.visited.add([y, x].toString())
            area = [...area, [y, x]]

            // Loop sur chaque cellule adjacente non visité pour savoir si elle a la meme valeur
            directions.forEach(([ay, ax]) => {
                let newCell = [y + ay, x + ax]
                let newCellString = newCell.toString();
                if (this.validators.isValid(newCell)
                    && !this.validators.isVisited(newCellString)
                    && this.validators.isSameValue(this.inputs[y][x], newCell)) {
                    area = this.steps.mapCellWithSearch(area, newCell);
                }
            })

            return area;
        },
        mapAreas: (inputs) => {
            for (let line = 0; line < inputs.length; line++) {
                for (let cell = 0; cell < inputs[line].length; cell++) {
                    let coordinates = [line, cell];
                    if (!this.validators.isVisited(coordinates.toString())) {
                        let group = this.steps.mapCellWithSearch([], coordinates);
                        if (this.areas[inputs[line][cell]]) {
                            this.areas[inputs[line][cell]].push(group);
                        } else {
                            this.areas[inputs[line][cell]] = [group];
                        }
                    }
                }
            }
        },
        getNumberOfBorders: ([y, x]) => {
            return directions.reduce((acc, [ay, ax]) => {
                let newCell = [y + ay, x + ax];
                if(!this.validators.isSameValue(this.inputs[y][x], newCell)) return acc+1
                return acc
            }, 0)
        },
        calculateAreas: (areas) => {
            Object.keys(areas).forEach(key => {
                areas[key].forEach((cells, subkey) => {

                    let borders = cells.reduce((acc, cell) => {
                        return acc + this.steps.getNumberOfBorders(cell);
                    }, 0)

                    let cellCount = cells.length;
                    this.areas[key][subkey] = {
                        count: cellCount,
                        perimeter: borders,
                        cells: cells,
                        price: cellCount * borders
                    }

                    this.result += cellCount * borders;
                })
            })
        }
    }
    this.run = () => {

        // this.inputs.forEach(element => {
        //     console.log(JSON.stringify(element))
        // });

        this.steps.mapAreas(this.inputs);
        this.steps.calculateAreas(this.areas)

        return this.result;
    }
}

const run = async (isDebug) => {

    let html, inputs;

    if (isDebug) {
        // html = "RRRRIICCFF";
        html = "RRRRIICCFF\nRRRRIICCCF\nVVRRRCCFFF\nVVRCCCJFFF\nVVVVCJJCFE\nVVIVCCJJEE\nVVIIICJJEE\nMIIIIIJJEE\nMIIISIJEEE\nMMMISSJEEE";
        inputs = textToInput.textToMap(html, "");
    } else {
        // retreive input from website
        html = await inputScraper.getHTML(testInformations);
        inputs = textToInput.textToMap(html, "");
    }

    let result = {
        v1: new v1(inputs).run(),
        // v2: new v2(inputs).run(iteration)
    };

    return result;
}

module.exports = {
    run
}