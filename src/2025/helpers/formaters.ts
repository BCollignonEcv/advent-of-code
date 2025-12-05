/* Description
 'A B C D\nE F G H' -> [['A B C D'],['E F G H']]
*/
const textToArrayLine = (html: string): Array<string> => {
    let lines = html.split('\n');

    if (lines[lines.length - 1] === '') {
        lines = lines.slice(0, -1);
    }
    return lines;
}

/* Description
 'A B C D' -> ['A', 'B', 'C', 'D']
*/
const textToArrayOfChar = (line: string, char: string): Array<string> => {
    return line.split(char)
}

/* Description
 '1 2 3 4' -> [1, 2, 3, 4]
*/
const textToArrayOfNumber = (line: string, char: string): Array<Number> => {
    return line.split(char).map(num => Number(num));
}

/* Description
 'A B C D\nE F G H' -> [['A', 'B', 'C', 'D'],['E', 'F', 'G', 'H']]
*/
const textToArrayOfArrayOfChar = (html: string, separator: string): Array<Array<string>> => {
    return html.split('\n')
        .map(line => line.split(separator));
}

/* Description
['A B C D', 'E F G H'] -> [['A', 'B', 'C', 'D'],['E', 'F', 'G', 'H']]
*/
const arrayOfLineToArrayOfArrayChar = (array: Array<string>, separator: string): Array<Array<string>> => {
    return array.map(line => line.split(separator));
}

export {
    textToArrayLine,
    textToArrayOfChar,
    textToArrayOfNumber,
    textToArrayOfArrayOfChar,
    arrayOfLineToArrayOfArrayChar
}