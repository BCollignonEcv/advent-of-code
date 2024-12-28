const inputScraper = require('../helpers/inputScraper')
const textToInput = require('../helpers/textToInput');

const testInformations = {
    year: 2024,
    number: 4
}

const v1 = {
    isValidHorizontal: (inputs, line, cell) => {
        if (cell+3  <= inputs[line].length - 1) {
            return inputs[line][cell+1] === 'M'
                && inputs[line][cell+2] === 'A'
                && inputs[line][cell+3] === 'S'
        }
        return false;
    },
    isValidHorizontalReverse: (inputs, line, cell) => {
        if (cell - 3 >= 0) {
            return inputs[line][cell - 1] === 'M'
                && inputs[line][cell - 2] === 'A'
                && inputs[line][cell - 3] === 'S'
        }
        return false;
    },
    isValidVertical: (inputs, line, cell) => {
        if (line + 3 <= inputs.length - 1) {
            return inputs[line+1][cell] === 'M'
                && inputs[line+2][cell] === 'A'
                && inputs[line+3][cell] === 'S'
        }
        return false;
    },
    isValidVerticalReverse: (inputs, line, cell) => {
        if (line - 3 >= 0) {
            return inputs[line - 1][cell] === 'M'
                && inputs[line - 2][cell] === 'A'
                && inputs[line - 3][cell] === 'S'
        }
        return false;
    },
    isDiagonalTopRight: (inputs, line, cell) => {
        if (line - 3 >= 0 && cell + 3 <= inputs[line].length - 1) {
            return inputs[line - 1][cell + 1] === 'M'
                && inputs[line - 2][cell + 2] === 'A'
                && inputs[line - 3][cell + 3] === 'S'
        }
    },
    isDiagonalTopLeft: (inputs, line, cell) => {
        if (line - 3 >= 0 && cell - 3 >= 0) {
            return inputs[line - 1][cell - 1] === 'M'
                && inputs[line - 2][cell - 2] === 'A'
                && inputs[line - 3][cell - 3] === 'S'
        }
    },
    isDiagonalBottomRight: (inputs, line, cell) => {
        if (line + 3 <= inputs.length - 1 && cell + 3 <= inputs[line].length - 1) {
            return inputs[line + 1][cell + 1] === 'M'
                && inputs[line + 2][cell + 2] === 'A'
                && inputs[line + 3][cell + 3] === 'S'
        }
    },
    isDiagonalBottomLeft: (inputs, line, cell) => {
        if (line + 3 <= inputs.length - 1 && cell - 3 >= 0) {
            return inputs[line + 1][cell - 1] === 'M'
                && inputs[line + 2][cell - 2] === 'A'
                && inputs[line + 3][cell - 3] === 'S'
        }
    },
    run: (inputs) => {
        let result = {
            valid: 0,
            invalid: 0,
            count: 0,
            data: []
        };

        inputs.forEach(input => {
            console.log(JSON.stringify(input))
        })

        for (let line = 0; line < inputs.length; line++) {
            for (let cell = 0; cell < inputs[line].length; cell++) {
                if (inputs[line][cell] === 'X') {
                    let cellResult = 0;
                    if (v1.isValidHorizontal(inputs, line, cell)) cellResult++
                    if (v1.isValidHorizontalReverse(inputs, line, cell)) cellResult++
                    if (v1.isValidVertical(inputs, line, cell)) cellResult++
                    if (v1.isValidVerticalReverse(inputs, line, cell)) cellResult++
                    if (v1.isDiagonalTopRight(inputs, line, cell)) cellResult++
                    if (v1.isDiagonalTopLeft(inputs, line, cell)) cellResult++
                    if (v1.isDiagonalBottomRight(inputs, line, cell)) cellResult++
                    if (v1.isDiagonalBottomLeft(inputs, line, cell)) cellResult++
                    if (cellResult > 0) {
                        result.valid += cellResult;
                    } else {
                        result.invalid++
                    }
                }
            }
        }

        return result;
    }
}

const v2 = {
    isTopRightToBottomLeft: (inputs, line, cell) => {
        return inputs[line - 1][cell + 1] === 'M'
            && inputs[line + 1][cell - 1] === 'S'
    },
    isTopLeftToBottomRight: (inputs, line, cell) => {
        return inputs[line - 1][cell - 1] === 'M'
            && inputs[line + 1][cell + 1] === 'S'
    },
    isBottomRightToTopLeft: (inputs, line, cell) => {
        return inputs[line + 1][cell + 1] === 'M'
            && inputs[line - 1][cell - 1] === 'S'
    },
    isBottomLeftToTopRight: (inputs, line, cell) => {
        return inputs[line + 1][cell - 1] === 'M'
            && inputs[line - 1][cell + 1] === 'S'
    },
    isXMas(inputs, line, cell) {
        let cellResult = 0;
        if (v2.isTopRightToBottomLeft(inputs, line, cell)) cellResult++
        if (v2.isTopLeftToBottomRight(inputs, line, cell)) cellResult++
        if (v2.isBottomRightToTopLeft(inputs, line, cell)) cellResult++
        if (v2.isBottomLeftToTopRight(inputs, line, cell)) cellResult++
        return cellResult === 2;
    },
    run: (inputs) => {
        let result = {
            valid: 0,
            invalid: 0,
            count: 0,
            data: []
        };

        inputs.forEach(input => {
            console.log(JSON.stringify(input))
        })

        for (let line = 0; line < inputs.length; line++) {
            for (let cell = 0; cell < inputs[line].length; cell++) {
                if (inputs[line][cell] === 'A'
                    && line - 1 >= 0
                    && line + 1 < inputs.length
                    && cell - 1 >= 0
                    && cell - 1 < inputs[line].length) {
                    if (v2.isXMas(inputs, line, cell)) {
                        result.valid++
                    } else {
                        result.invalid++
                    }
                }
            }
        }

        return result;
    }
}

const run = async () => {
    let result = {
        v1: "Not calculated",
        v2: "Not calculated"
    };

    // retreive input from website
    let html = await inputScraper.getHTML(testInformations);
    // let html = ".M.S......\n..A..MSMS.\n.M.S.MAA..\n..A.ASMSM.\n.M.S.M....\n..........\nS.S.S.S.S.\n.A.A.A.A..\nM.M.M.M.M.\n.........."
    let inputs = textToInput.lineTextToArrayOfArrayOfLetter(html);

    // calculate v1
    result.v1 = v1.run(inputs)

    // calculate v2
    result.v2 = v2.run(inputs)

    return result;
}



module.exports = {
    run
}