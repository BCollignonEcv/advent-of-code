const inputScraper = require('../helpers/inputScraper')
const textToInput = require('../helpers/textToInput');

const testInformations = {
    year: 2024,
    number: 8
}

const v1 = {
    map: [],
    mapping: {
        antennaCount: 0,
        antennaTypeCount: 0,
        antennas: {},
        uniqueAntinodeCount: 0,
        uniqueAntinode: []
    },
    mapAntenna: (type, line, cell) => {
        if (!v1.mapping.antennas[type]) {
            v1.mapping.antennaTypeCount++
            v1.mapping.antennas[type] = []
        }

        v1.mapping.antennaCount++
        v1.mapping.antennas[type].push([line, cell])
    },
    validator: {
        isInMappingLimit: (targetLine, targetCell) => {
            let maxX = v1.map[0].length;
            let maxY = v1.map.length;
            return targetLine >= 0 && targetCell >= 0 && targetLine < maxY && targetCell < maxX;
        },
        isFree(targetLine, targetCell){
            return v1.map[targetLine][targetCell] === '.';
        },
        isAntinode(targetLine, targetCell) {
            return v1.map[targetLine][targetCell] === '#';
        },
        isAntenna(targetLine, targetCell) {
            return !v1.validator.isFree(targetLine, targetCell) &&
                !v1.validator.isAntinode(targetLine, targetCell)
        },
        isHiddenAntinode(targetLine, targetCell) {
            return v1.mapping.uniqueAntinode.some(antinode => {
                return antinode[0] === targetLine && antinode[1] === targetCell
            })
        }
    },
    printer: {
        tryPrintUniqueAntinode(targetLine, targetCell) {
            if (v1.validator.isInMappingLimit(targetLine, targetCell)) {
                if (!v1.validator.isAntinode(targetLine, targetCell)) {
                    v1.map[targetLine][targetCell] = '#';
                    v1.mapping.uniqueAntinode.push([targetLine, targetCell])
                    v1.mapping.uniqueAntinodeCount++
                }
            }
        }
    },
    run: (inputs) => {
        v1.map = inputs;

        console.log(inputs.length)

        inputs.forEach(input => {
            console.log(JSON.stringify(input.join('')))
        })

        for (let line = 0; line < inputs.length; line++) {
            for (let cell = 0; cell < inputs[line].length; cell++) {
                if (inputs[line][cell] != '.') {
                    v1.mapAntenna(inputs[line][cell], line, cell)
                }
            }
        }

        Object.values(v1.mapping.antennas).forEach(antennaType => {
            for (let index = 0; index < antennaType.length; index++) {
                let currentIndex = index;
                while (currentIndex < antennaType.length - 1) {
                    currentIndex++
                    let possiblePreviousAntinode = [
                        antennaType[index][0] + antennaType[index][0] - antennaType[currentIndex][0],
                        antennaType[index][1] + antennaType[index][1] - antennaType[currentIndex][1],
                    ];
                    let possibleNextAntinode = [
                        antennaType[currentIndex][0] + antennaType[currentIndex][0] - antennaType[index][0],
                        antennaType[currentIndex][1] + antennaType[currentIndex][1] - antennaType[index][1],
                    ]
                    v1.printer.tryPrintUniqueAntinode(possiblePreviousAntinode[0], possiblePreviousAntinode[1])
                    v1.printer.tryPrintUniqueAntinode(possibleNextAntinode[0], possibleNextAntinode[1])
                }
            }
        })
        console.log()
        v1.map.forEach(input => {
            console.log(JSON.stringify(input.join('')))
        })

        return v1.mapping.uniqueAntinodeCount;
    }
}

const v2 = {
    map: [],
    mapping: {
        antennaCount: 0,
        antennaTypeCount: 0,
        antennas: {},
        uniqueAntinodeCount: 0,
        uniqueAntinode: []
    },
    mapAntenna: (type, line, cell) => {
        if (!v1.mapping.antennas[type]) {
            v1.mapping.antennaTypeCount++
            v1.mapping.antennas[type] = []
        }

        v1.mapping.antennaCount++
        v1.mapping.antennas[type].push([line, cell])
    },
    validator: {
        isInMappingLimit: (targetLine, targetCell) => {
            let maxX = v1.map[0].length;
            let maxY = v1.map.length;
            return targetLine >= 0 && targetCell >= 0 && targetLine < maxY && targetCell < maxX;
        },
        isFree(targetLine, targetCell) {
            return v1.map[targetLine][targetCell] === '.';
        },
        isAntinode(targetLine, targetCell) {
            return v1.map[targetLine][targetCell] === '#';
        },
        isAntenna(targetLine, targetCell) {
            return !v1.validator.isFree(targetLine, targetCell) &&
                !v1.validator.isAntinode(targetLine, targetCell)
        },
        isHiddenAntinode(targetLine, targetCell) {
            return v1.mapping.uniqueAntinode.some(antinode => {
                return antinode[0] === targetLine && antinode[1] === targetCell
            })
        }
    },
    printer: {
        tryPrintUniqueAntinode(targetLine, targetCell) {
            if (v1.validator.isInMappingLimit(targetLine, targetCell)) {
                if (!v1.validator.isAntinode(targetLine, targetCell)) {
                    v1.map[targetLine][targetCell] = '#';
                    v1.mapping.uniqueAntinode.push([targetLine, targetCell])
                    v1.mapping.uniqueAntinodeCount++
                }
            }
        }
    },
    run: (inputs) => {
        v1.map = inputs;

        // Print mapping before antinodes
        inputs.forEach(input => {
            console.log(JSON.stringify(input.join('')))
        })

        for (let line = 0; line < inputs.length; line++) {
            for (let cell = 0; cell < inputs[line].length; cell++) {
                if (inputs[line][cell] != '.') {
                    v1.mapAntenna(inputs[line][cell], line, cell)
                }
            }
        }

        Object.values(v1.mapping.antennas).forEach(antennaType => {
            for (let index = 0; index < antennaType.length; index++) {
                let currentIndex = index;
                while (currentIndex < antennaType.length - 1) {
                    currentIndex++

                    let possiblePreviousAntinode = [
                        antennaType[index][0] + antennaType[index][0] - antennaType[currentIndex][0],
                        antennaType[index][1] + antennaType[index][1] - antennaType[currentIndex][1],
                    ];
                    let possibleNextAntinode = [
                        antennaType[currentIndex][0] + antennaType[currentIndex][0] - antennaType[index][0],
                        antennaType[currentIndex][1] + antennaType[currentIndex][1] - antennaType[index][1],
                    ]
                    v1.printer.tryPrintUniqueAntinode(possiblePreviousAntinode[0], possiblePreviousAntinode[1])
                    v1.printer.tryPrintUniqueAntinode(possibleNextAntinode[0], possibleNextAntinode[1])
                }
            }
        })
        console.log()
        v1.map.forEach(input => {
            console.log(JSON.stringify(input.join('')))
        })

        return v1.mapping.uniqueAntinodeCount;
    }
}

const run = async () => {
    let result = {
        v1: "Not calculated",
        v2: "Not calculated"
    };

    // retreive input from website
    // let html = "............\n........0...\n.....0......\n.......0....\n....0.......\n......A.....\n............\n............\n........A...\n.........A..\n............\n............"
    let html = await inputScraper.getHTML(testInformations);
    let inputs = textToInput.lineTextToArrayOfArrayOfLetter(html);

    // Must remove last line because empty
    inputs.pop()

    // calculate v1
    result.v1 = v1.run(inputs)

    // calculate v2
    // result.v2 = v2.run(inputs)

    return result;
}



module.exports = {
    run
}