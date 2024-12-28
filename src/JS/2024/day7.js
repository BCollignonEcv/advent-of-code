const inputScraper = require('../helpers/inputScraper')
const textToInput = require('../helpers/textToInput');

const testInformations = {
    year: 2024,
    number: 7
}

const v1 = {
    inputs: null,
    try: [],
    result: 0,
    validator: {
        hasResult: (response, possibilities) => {
            return possibilities.some(possibility => possibility == response)
        }
    },
    actions: {
        recursiveGeneration: (calcul, remainingFactor) => {
            if (remainingFactor.length > 0) {
                let nextFactor = remainingFactor[0];
                let remaining = remainingFactor.slice(1);

                return [
                    ...v1.actions.recursiveGeneration(+calcul + +nextFactor, remaining),
                    ...v1.actions.recursiveGeneration(+calcul * +nextFactor, remaining)
                ];
            }
            return [calcul]
        }
    },
    run: (inputs) => {
        v1.inputs = inputs;

        // Generate possibility
        inputs.forEach(input => {
            let nextFactor = input.factors[0];
            let remaining = input.factors.slice(1);

            v1.try.push({
                response: parseInt(input.response, 10),
                try: v1.actions.recursiveGeneration(nextFactor, remaining)
            })
        })

        console.log(v1.inputs)

        // Try possibility
        v1.try.forEach((input, key) => {
            if (v1.validator.hasResult(input.response, input.try)) {
                v1.try[key].status = true;
                v1.result += input.response;
            }
        })

        console.log(v1.try)
        console.log(v1.result)
    }
}

const v2 = {
    inputs: null,
    try: [],
    result: 0,
    validator: {
        hasResult: (response, possibilities) => {
            return possibilities.some(possibility => possibility == response)
        }
    },
    actions: {
        recursiveGeneration: (calcul, remainingFactor) => {
            if (remainingFactor.length > 0) {
                let nextFactor = remainingFactor[0];
                let remaining = remainingFactor.slice(1);

                return [
                    ...v2.actions.recursiveGeneration(+calcul + +nextFactor, remaining),
                    ...v2.actions.recursiveGeneration(+calcul * +nextFactor, remaining),
                    ...v2.actions.recursiveGeneration(calcul + nextFactor, remaining)
                ];
            }
            return [+calcul]
        }
    },
    run: (inputs) => {
        v2.inputs = inputs;

        // Generate possibility
        inputs.forEach(input => {
            let nextFactor = input.factors[0];
            let remaining = input.factors.slice(1);

            v2.try.push({
                response: parseInt(input.response, 10),
                try: v2.actions.recursiveGeneration(nextFactor, remaining)
            })
        })

        console.log(v2.inputs)

        // Try possibility
        v2.try.forEach((input, key) => {
            if (v2.validator.hasResult(input.response, input.try)) {
                v2.try[key].status = true;
                v2.result += input.response;
            }
        })

        return v2.result
    }
}

// With operator priority
const v3 = {
    inputs: null,
    try: [],
    result: 0,
    validator: {
        hasResult: (response, possibilities) => {
            return possibilities.some(possibility => possibility == response)
        }
    },
    actions: {
        recursiveGeneration: (calcul, remainingFactor) => {
            if (remainingFactor.length > 0) {
                let nextFactor = remainingFactor[0];
                let remaining = remainingFactor.slice(1);

                return [
                    ...v1.actions.recursiveGeneration(calcul + "+" + nextFactor, remaining),
                    ...v1.actions.recursiveGeneration(calcul + "*" + nextFactor, remaining)
                ];
            }
            return [eval(calcul), calcul]
        }
    },
    run: (inputs) => {
        v1.inputs = inputs;

        // Generate possibility
        inputs.forEach(input => {
            let nextFactor = input.factors[0];
            let remaining = input.factors.slice(1);

            v1.try.push({
                response: parseInt(input.response, 10),
                try: v1.actions.recursiveGeneration(nextFactor, remaining)
            })
        })

        console.log(v1.inputs)

        // Try possibility
        v1.try.forEach((input, key) => {
            if (v1.validator.hasResult(input.response, input.try)) {
                v1.try[key].status = true;
                v1.result += input.response;
            }
        })

        console.log(v1.try)
        console.log(v1.result)
    }
}

const organizeInputs = (inputs) => {
    let organizedInputs = [];
    inputs.forEach(input => {
        const [response, factors] = input.split(': ');
            let organizedInput = {
                response: response,
                factors: factors.split(' ')
            }
            organizedInputs.push(organizedInput)
    });
    return organizedInputs;
}

const run = async (isDebug) => {
    let result = {
        v1: "Not calculated",
        v2: "Not calculated"
    };

    let html, inputs;

    if(isDebug){
        html = "190: 10 19\n3267: 81 40 27\n83: 17 5\n156: 15 6\n7290: 6 8 6 15\n161011: 16 10 13\n192: 17 8 14\n21037: 9 7 18 13\n292: 11 6 16 20"
        inputs = textToInput.lineTextToArrayOfString(html);
    } else {
        // retreive input from website
        html = await inputScraper.getHTML(testInformations);
        inputs = textToInput.lineTextToArrayOfString(html);
        inputs.pop();
    }

    inputs = organizeInputs(inputs);

    // calculate v1
    // result.v1 = v1.run(inputs)

    // calculate v2
    result.v2 = v2.run(inputs)

    return result;
}



module.exports = {
    run
}