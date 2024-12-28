const inputScraper = require('../helpers/inputScraper')
const textToInput = require('../helpers/textToInput');

const testInformations = {
    year: 2024,
    number: 5
}

function formatToInputs(html) {
    let inputs = html.split("\n\n");
    inputs = {
        rules: inputs[0],
        updates: inputs[1]
    };
    inputs.rules = inputs.rules.split("\n").map(rule => rule.split("|").map(number => Number(number)));
    inputs.updates = inputs.updates.split("\n").map(update => update.split(",").map(number => Number(number)));

    return inputs;
}

function v1 (inputs) {
    this.result = 0;
    this.inputs = inputs;
    this.rules = {};
    this.validator = {};
    this.mapRules = (rules) => {
        let mappedRules = {};
        rules.forEach(rule => {
            if(mappedRules[rule[0]]) {
                mappedRules[rule[0]].push(rule[1])
            } else {
                mappedRules[rule[0]] = [rule[1]]
            }
        });
        return mappedRules;
    }
    this.checkPageUpdate = (updatePageList, page) => {
        if(this.rules[page]){
            let pageIndex = updatePageList.indexOf(page);
            return this.rules[page].every(rule => {
                // Ignore rue that are not part of the update
                if (updatePageList.indexOf(rule) === -1) return true
                return updatePageList.indexOf(rule) > pageIndex;
            })
        } return true;
    };
    this.run = () => {
        // Format rules to object
        this.rules = this.mapRules(this.inputs.rules)

        // Loop on updates to check they fit with rules
        this.validUpdates = this.inputs.updates.filter(update => {
            return update.every(page => {
                return this.checkPageUpdate(update, page)
            })
        })

        return this.validUpdates.reduce((acc, update) => {
            let middle = Math.abs((update.length - (update.length % 2)) / 2);
            return acc +=update[middle];
        }, 0);
    }
}

function v2 (inputs) {
    this.result = 0;
    this.inputs = inputs;
    this.rules = {};
    this.validator = {};
    this.mapRules = (rules) => {
        let mappedRules = {};
        rules.forEach(rule => {
            if(mappedRules[rule[0]]) {
                mappedRules[rule[0]].push(rule[1])
            } else {
                mappedRules[rule[0]] = [rule[1]]
            }
        });
        return mappedRules;
    }
    this.checkPageUpdate = (updatePageList, page) => {
        if(this.rules[page]){
            let pageIndex = updatePageList.indexOf(page);
            return this.rules[page].every(rule => {
                // Ignore rue that are not part of the update
                if (updatePageList.indexOf(rule) === -1) return true
                return updatePageList.indexOf(rule) > pageIndex;
            })
        } return true;
    };
    this.run = () => {
        // Format rules to object
        this.rules = this.mapRules(this.inputs.rules)

        // Loop on updates to check they fit with rules
        this.invalidUpdates = this.inputs.updates.filter(update => {
            return update.some(page => {
                return !this.checkPageUpdate(update, page)
            })
        })

        // Loop on updates to check they fit with rules
        this.invalidUpdates = this.invalidUpdates.forEach((update, updateNumber) => {
            let newUpdate = update
            update.forEach((page, pageNumber) => {
                if (this.(update, page)) {

                }
            })
            this.validUpdates = [...this.validUpdates, newUpdate];
        })

        // return this.invalidUpdates.reduce((acc, update) => {
        //     let middle = Math.abs((update.length - (update.length % 2)) / 2);
        //     return acc +=update[middle];
        // }, 0);
    }
}

const run = async (isDebug) => {
    let result = {
        v1: "Not calculated",
        v2: "Not calculated"
    };

    if (isDebug) {
        html = "47|53\n97|13\n97|61\n97|47\n75|29\n61|13\n75|53\n29|13\n97|29\n53|29\n61|53\n97|53\n61|29\n47|13\n75|47\n97|75\n47|61\n75|61\n47|29\n75|13\n53|13\n\n75, 47, 61, 53, 29\n97, 61, 53, 29, 13\n75, 29, 13\n75, 97, 47, 61, 53\n61, 13, 29\n97, 13, 75, 29, 47"
        inputs = formatToInputs(html);
    } else {
        // retreive input from website
        html = await inputScraper.getHTML(testInformations);
        inputs = formatToInputs(html);
    }

    result.v1 = new v1(inputs).run()
    result.v2 = new v2(inputs).run()

    return result;
}



module.exports = {
    run
}