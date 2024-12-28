const inputScraper = require('../helpers/inputScraper')
const textToInput = require('../helpers/textToInput');

const testInformations = {
    year: 2024,
    number: 2
}

const v1 = {
    isRecursiveDecrease: (report, index) => {
        let current = index;
        let next = index + 1;
        if (report[current] && report[next]) {
            if (report[current] > report[next] && Math.abs(report[current] - report[next]) < 4) {
                return v1.isRecursiveDecrease(report, next)
            }
            return false;
        }
        return index === report.length - 1;
    },

    isRecursiveIncrease: (report, index) => {
        let current = index;
        let next = index + 1;
        if (report[current] && report[next]) {
            if (report[current] < report[next] && Math.abs(report[current] - report[next]) < 4) {
                return v1.isRecursiveIncrease(report, next)
            }
            return false;
        }
        return index === report.length - 1;
    },

    run: (inputs) => {
        let result = {
            valid: 0,
            invalid: 0,
            count: 0,
            data: []
        };

        inputs.forEach(report => {
            if (v1.isRecursiveIncrease(report, 0)) {
                result.data[result.count] = ['INCREASE', ...report];
                result.valid++
            } else if (v1.isRecursiveDecrease(report, 0)) {
                result.data[result.count] = ['DECREASE', ...report];
                result.valid++
            } else {
                result.data[result.count] = ['FAILED', ...report];
                result.invalid++
            }
            result.count++
        });

        return result;
    }
}

const v2 = {
    isRecursiveDecrease: (report, index, allowError) => {
        let current = index;
        let next = index + 1;
        if (next < report.length) {
            if (Math.abs(report[current] - report[next]) < 4 && report[current] > report[next]) {
                return v2.isRecursiveDecrease(report, next, allowError)
            } else if (allowError) {
                let newReport1 = [...report];
                let newReport2 = [...report];
                newReport1.splice(current, 1);
                newReport2.splice(next, 1);
                return v2.isRecursiveDecrease(newReport1, 0, false)
                    || v2.isRecursiveDecrease(newReport2, 0, false)            }
            return false;
        }
        return true;
    },

    isRecursiveIncrease: (report, index, allowError) => {
        console.log(report)
        let current = index;
        let next = index + 1;
        if (next < report.length) {
            if (Math.abs(report[current] - report[next]) < 4 && report[current] < report[next]){
                return v2.isRecursiveIncrease(report, next, allowError)
            } else if (allowError) {
                let newReport1 = [...report];
                let newReport2 = [...report];
                newReport1.splice(current, 1);
                newReport2.splice(next, 1);
                return v2.isRecursiveIncrease(newReport1, 0, false)
                    || v2.isRecursiveIncrease(newReport2, 0, false)
            }
            return false;
        }
        return true;
    },

    run: (inputs) => {
        let result = {
            valid: 0,
            invalid: 0,
            count: 0,
            data: []
        };

        inputs.forEach(report => {
            if (v2.isRecursiveIncrease(report, 0, true)) {
                result.data[result.count] = ['INCREASE', ...report];
                result.valid++
            } else if (v2.isRecursiveDecrease(report, 0, true)) {
                result.data[result.count] = ['DECREASE', ...report];
                result.valid++
            } else {
                result.data[result.count] = ['FAILED', ...report];
                result.invalid++
            }
            result.count++
        });

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

    // organize inputs
    let inputs = textToInput.lineNumberToArray(html);

    // inputs = inputs.slice(100, 101);

    // calculate v1
    result.v1 = v1.run(inputs)

    // calculate v2
    result.v2 = v2.run(inputs)

    return result;
}



module.exports = {
    run
}