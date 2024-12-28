const inputScraper = require('../helpers/scraper')
const textToInput = require('../helpers/textToInput');

const testInformations = {
    year: 2024,
    number: 1
}

const runV1 = (inputs) => {
    let result = 0;

    // Calculate
    if (inputs[0].length === inputs[1].length) {
        for (let i = 0; i < inputs[0].length; i++) {
            result += Math.abs(inputs[0][i] - inputs[1][i])
        }
    }

    return result;
}

const runV2 = (inputs) => {
    let result = 0;
    let calculted = {};
    for (let i = 0; i < inputs[0].length; i++) {
        let subresult = inputs[1].filter(item => item === inputs[0][i]).length;
        result += inputs[0][i] * subresult;
        calculted[inputs[0][i]] = result;
    }

    return result;
}

const run = async () => {
    let result = {
        v1: 0,
        v2: 0
    };
    // retreive input from website
    let html = await inputScraper.getHTML(testInformations);

    // organize inputs
    let inputs = textToInput.twoColumnTextToArray(html);
    inputs[0] = inputs[0].sort((a, b) => a - b);
    inputs[1] = inputs[1].sort((a, b) => a - b);

    // calculate v1
    result.v1 = runV1(inputs)

    // calculate v2
    result.v2 = runV2(inputs)

    return result;
}

module.exports = {
    run
}
