
import day from '../day.class';
import * as formaters from '../helpers/formaters';

type Rules = {
    [key: number]: Array<number>; // Permet des clés dynamiques
};

export class V1 extends day {
    public rules: Rules;

    constructor(year: number, test: number, isdebug: number) {
        super(year, test, isdebug);
        this.rules = {};
    }

    getFakeInputs(): void {
        this.inputs = '47|53\n97|13\n97|61\n97|47\n75|29\n61|13\n75|53\n29|13\n97|29\n53|29\n61|53\n97|53\n61|29\n47|13\n75|47\n97|75\n47|61\n75|61\n47|29\n75|13\n53|13\n\n75,47,61,53,29\n97,61,53,29,13\n75,29,13\n75,97,47,61,53\n61,13,29\n97,13,75,29,47\n'
    }

    formatInputs(): void {
        let tmp: Array<string> = this.inputs.split("\n\n");

        // this.rules = formaters.textToArrayLine(tmp[0]).map((rule: string) => rule.split("|").map(number => Number(number)))

        this.rules = formaters.textToArrayLine(tmp[0]).reduce((acc: Rules, rule: string): Rules => {
            let splittedRule: Array<number> = rule.split("|").map(string => Number(string));

            // Create base rule if not existing
            if (!acc[splittedRule[0]]) {
                acc[splittedRule[0]] = [];
            }

            // add rule
            acc[splittedRule[0]].push(Number(splittedRule[1]))

            return acc;
        }, {});
        this.formatedInputs = formaters.textToArrayLine(tmp[1]).map((update: string) => update.split(",").map(number => Number(number)))
    }

    run(): void {
        let result: number = 0;
        let validUpdates: Array<Array<number>>;

        // Loop on updates to check they fit with rules
        validUpdates = this.formatedInputs.filter((update: Array<number>) => {
            return update.every(page => {
                if (this.rules[page]) {
                    let pageIndex = update.indexOf(page);
                    return this.rules[page].every(rule => {
                        // Ignore rue that are not part of the update
                        if (update.indexOf(rule) === -1) return true
                        return update.indexOf(rule) > pageIndex;
                    })
                } return true;
            })
        })

        result = validUpdates.reduce((acc: number, update: Array<number>) => {
            let middle: number = Math.abs((update.length - (update.length % 2)) / 2);
            return acc += update[middle];
        }, 0);

        this.result = result;
    }
}

// export class V2 extends V1 {
//     constructor(year: number, test: number, isdebug: number) {
//         super(year, test, isdebug);
//     }

//     helpers = {
//         hasRule(rules: Rules, page: number): boolean {
//             return rules[page] != undefined;
//         },
//         hasInvalidRule(rules: Rules, update: Array<number>, page: number): boolean {
//             if (this.hasRule(rules, page)) {
//                 let pageIndex = update.indexOf(page);
//                 return rules[page].some(rule => {
//                     // Ignore rue that are not part of the update
//                     if (update.indexOf(rule) === -1) return false
//                     return update.indexOf(rule) <= pageIndex;
//                 })
//             } return false;
//         },
//         findInvalidRule(rules: Rules, update: Array<number>, page: number): number {
//             let pageIndex = update.indexOf(page);
//             let invalidRuleIndex = -1;
//             rules[page].forEach((rule: number) => {
//                 if (update.indexOf(rule) != -1 && update.indexOf(rule) <= pageIndex) {
//                     invalidRuleIndex = update.indexOf(rule)
//                 }
//             })

//             return invalidRuleIndex;

//         }
//     }

//     run(): void {
//         let result: number = 0;
//         let invalidUpdates: Array<Array<number>>;
//         let validUpdates: Array<Array<number>>;

//         // Loop on updates to check they fit with rules
//         invalidUpdates = this.formatedInputs.filter((update: Array<number>) => {
//             return update.some(page => {
//                 return this.helpers.hasInvalidRule(this.rules, update, page)
//             })
//         })

//         console.log(invalidUpdates)

//         validUpdates = invalidUpdates.map((update: Array<number>): Array<number> => {
//             return update.reduce((validUpdate: Array<number>, page: number): Array<number> => {
//                 if (this.helpers.hasInvalidRule(this.rules, update, page)) {
//                     let invalidRuleIndex = this.helpers.findInvalidRule(this.rules, update, page)
//                     validUpdate.push(update[invalidRuleIndex])
//                 }
//                 validUpdate.push(page)
//                 return validUpdate;
//             }, [])
//         })

//         console.log(validUpdates)

//         result = validUpdates.reduce((acc: number, update: Array<number>) => {
//             let middle: number = Math.abs((update.length - (update.length % 2)) / 2);
//             return acc += update[middle];
//         }, 0);

//         this.result = result;
//     }
// }