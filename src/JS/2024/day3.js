const inputScraper = require('../helpers/inputScraper')
const textToInput = require('../helpers/textToInput');

const testInformations = {
    year: 2024,
    number: 3
}

const v1 = {
    run: (html) => {
        let result = {
            total: 0,
            valid: 0,
            invalid: 0,
            count: 0,
            data: []
        };

        let inputs = html.split('mul')

        // let regex = /^\(\d{1,3}\,\d{1,3}\)*$/;
        let regex = /^\((\d{1,3}),(\d{1,3})\).*/;

        inputs.map(line => {
            if (regex.test(line)) {
                let test = line.match(regex)
                result.valid++
                result.data[result.count] = ['VALID', test[1], test[2]]
                result.total += test[1] * test[2];
            } else {
                result.invalid++
                result.data[result.count] = ['INVALID', line]
            }
            result.count++
        })

        return result;
    }
}

const v2 = {
    run: (html) => {
        let result = {
            total: 0,
            valid: 0,
            invalid: 0,
            count: 0,
            data: []
        };

        let inputs = [];

        // Force start with don't()
        html = "don't()testdo()" + html;

        html.split("don't()").forEach(dont => {
            let dos = dont.split('do()');
            if(dos.length > 1) {
                dos.shift();
                dos = dos.join();
                inputs = [...inputs, ...dos.split('mul')];
            }
        })

        let regex = /^\((\d{1,3}),(\d{1,3})\).*/;

        inputs.map(line => {
            if (regex.test(line)) {
                let test = line.match(regex)
                result.valid++
                result.data[result.count] = ['VALID', test[1], test[2]]
                result.total += test[1] * test[2];
            } else {
                result.invalid++
                result.data[result.count] = ['INVALID', line]
            }
            result.count++
        })

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

    // html = html.slice(0, 5000)
    // calculate v1
    result.v1 = v1.run(html)

    // calculate v2
    result.v2 = v2.run(html)

    return result;
}



module.exports = {
    run
}