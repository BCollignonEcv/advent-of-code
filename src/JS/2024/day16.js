const inputScraper = require('../helpers/inputScraper')
const textToInput = require('../helpers/textToInput');


const testInformations = {
    year: 2024,
    number: 16
}

const directions = {
    left: [-1, 0],
    rigth: [1, 0],
    bottom: [0, -1],
    top: [0, 1]
};

function v1(inputs) {
    this.result = 0;
    this.inputs = inputs;
    this.visited = new Set();
    this.paths = [];
    this.validators = {
        isWall: ([y, x]) => {
            return this.inputs[y][x] === '#';
        },
        isEnd: ([y, x]) => {
            return y === this.endCell[0] && x === this.endCell[1];
        },
        isAlreadyVisited: (path, cell) => {
            return path.has(cell);
        },
    };
    this.steps = {
        init: () => {
            this.validCells = new Set();
            this.invalidCells = new Set();
            this.startCell = [this.inputs.length - 2, 1];
            this.endCell = [1, this.inputs[0].length - 2];

            // Map wall
            for (var line = 0; line < this.inputs.length; line++) {
                for (var cell = 0; cell < this.inputs[0].length; cell++) {
                    if (this.validators.isWall([line, cell])) {
                        this.invalidCells.add([line, cell].toString())
                    } else {
                        this.validCells.add([line, cell].toString())
                    }
                }
            }
        },
        moveFrom: (pathObj, [y, x]) => {
            pathObj.path.add([y, x].toString())


            Object.keys(directions).forEach(direction => {
                // Loop OUT - Optimisation
                if (this.paths[this.paths.length - 1] && pathObj.score >= this.paths[this.paths.length - 1].score) return
                let nextCell = [y + directions[direction][0], x + directions[direction][1]];

                // Loop OUT - END
                if (this.validators.isEnd([y, x])) {
                    console.log("FIND : ", pathObj.score)
                    this.paths.push(pathObj);
                }

                // Loop IN
                if (!this.validators.isWall(nextCell) && !this.validators.isAlreadyVisited(pathObj.path, nextCell.toString())) {

                    let score = pathObj.direction === direction ? pathObj.score + 1 : pathObj.score + 1001;

                    let newPathObj = {
                        score: score,
                        path: new Set([...pathObj.path]),
                        direction: direction
                    }

                    this.steps.moveFrom(newPathObj, nextCell);
                }
            });
        }
    },
        this.printers = {
            printPaths: (correctPath) => {
                let map = this.inputs;
                [...correctPath.path].forEach(cell => {
                    let [y, x] = cell.split(",")
                    map[y][x] = '+';
                })
                map.forEach(line => console.log(line.join("")))

            }
        }
    this.run = () => {

        this.steps.init();

        this.steps.moveFrom({ score: 0, path: new Set(), direction: null }, this.startCell);

        // Trier par score de manière décroissante
        this.paths.sort((path1, path2) => path2.score - path1.score);


        // print best way
        this.paths.forEach(path => {
            this.printers.printPaths(path)
        })

        return this.paths[this.paths.length - 1].score;
    }
}

function v2(inputs) {
    this.result = 0;
    this.inputs = inputs;
    this.openedCell = [];
    this.closedCell = []
    this.paths = [];
    this.validators = {
        isEnd: ([y, x]) => {
            return y === this.endCell[0] && x === this.endCell[1];
        },
        isAlreadyVisited: (cell) => {
            return closedCell.has(cell);
        },
    };
    this.steps = {
        init: () => {
            this.startCell = [this.inputs.length - 2, 1];
            this.endCell = [1, this.inputs[0].length - 2];
            this.openedCell = this.inputs;
        },
        distFromEnd: ([y, x]) => {
            return Math.abs(this.end[0] - y) + Math.abs(this.end[1] - x);
        }
    },
    this.run = () => {
        this.steps.init();
    }
}

const run = async (isDebug) => {

    let html, inputs;

    if (isDebug) {
        // html = "RRRRIICCFF";
        // html = "###############\n#.......#....E#\n#.#.###.#.###.#\n#.....#.#...#.#\n#.###.#####.#.#\n#.#.#.......#.#\n#.#.#####.###.#\n#...........#.#\n###.#.#####.#.#\n#...#.....#.#.#\n#.#.#.###.#.#.#\n#.....#...#.#.#\n#.###.#.#.#.#.#\n#S..#.....#...#\n###############";
        html = "#################\n#...#...#...#..E#\n#.#.#.#.#.#.#.#.#\n#.#.#.#...#...#.#\n#.#.#.#.###.#.#.#\n#...#.#.#.....#.#\n#.#.#.#.#.#####.#\n#.#...#.#.#.....#\n#.#.#####.#.###.#\n#.#.#.......#...#\n#.#.###.#####.###\n#.#.#...#.....#.#\n#.#.#.#####.###.#\n#.#.#.........#.#\n#.#.#.#########.#\n#S#.............#\n#################";
        inputs = textToInput.textToMap(html, "");
    } else {
        // retreive input from website
        html = await inputScraper.getHTML(testInformations);
        inputs = textToInput.textToMap(html, "");
    }

    inputs.forEach(line => console.log(line.join("")))
    console.log()

    let result = {
        v1: new v1(inputs).run(),
        // v2: new v2(inputs).run(iteration)
    };

    return result;
}

module.exports = {
    run
}