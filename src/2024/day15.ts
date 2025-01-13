import day from '../day.class';
import * as formaters from '../helpers/formaters';
import { Coordinates, toCoordinates, directions, getBoundaries, isInBoundaries, findInMatrix } from '../helpers/matrixHelpers';

export class V1 extends day {
    public robotPos: Coordinates;

    constructor(year: number, test: number, isdebug: number) {
        super(year, test, isdebug);
        this.robotPos = [0,0];
    }

    getFakeInputs(): void {
        this.inputs = '##########\n#..O..O.O#\n#......O.#\n#.OO..O.O#\n#..O@..O.#\n#O#..O...#\n#O..O..O.#\n#.OO.O.OO#\n#....O...#\n##########\n\n<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^\nvvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v\n><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<\n<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^\n^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><\n^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^\n>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^\n<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>\n^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>\nv^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^';
        //this.inputs = '########\n#..O.O.#\n##@.O..#\n#...O..#\n#.#.O..#\n#...O..#\n#......#\n########\n\n<^^>>>vv<v>>v<<';
    }

    formatInputs(): void {
        let tmp = this.inputs.split('\n\n');
        let map = formaters.textToArrayOfArrayOfChar(tmp[0], '');
        let actions = tmp[1].split('\n').reduce((listOfAction: Array<string>, line: string) => {
           return listOfAction.concat(line.split(''))
        }, []);

        this.formatedInputs = actions;
        this.map = map;
    }

    move(position: Coordinates, direction: Coordinates): Coordinates {
        let nextPos = toCoordinates([position[0] + direction[0], position[1] + direction[1]])

        if(this.requirePush(nextPos)) {
            this.tryToPush(nextPos, direction)
        }

        if(this.canMove(nextPos)) {
            this.map[position[1]][position[0]] = '.';
            this.map[nextPos[1]][nextPos[0]] = '@';
            return nextPos;
        }

        return position;
    }

    canMove(position: Coordinates): Boolean {
        return this.map[position[1]][position[0]] === '.';
    }

    requirePush(position: Coordinates): Boolean {
        return this.map[position[1]][position[0]] === 'O';
    }

    tryToPush(position: Coordinates, direction: Coordinates): void {
        let block = position;
        let findEmpty = false;

        while(this.map[block[1]][block[0]] !== '#') {
            if(this.canMove(block)) {
                findEmpty = true;
                break;
            } else {
                block = [block[0] + direction[0], block[1] + direction[1]]
            }
        }
        if(findEmpty) {
            this.map[position[1]][position[0]] = '.';
            this.map[block[1]][block[0]] = 'O';
        }
    }

    run(): void {
        let result: number = 0;
        let actionsCount = 0;
        const actionsNumber = this.formatedInputs.length;

        this.robotPos = toCoordinates(findInMatrix(this.map, '@'));

        this.formatedInputs.forEach((action: string) => {
            if(this.isDebug) {
                actionsCount++;
                console.log()
                console.log(`Handle action : ${actionsCount}/${actionsNumber} - ${action}`)
            }

            let direction: Coordinates = directions[action as keyof typeof directions];
            this.robotPos = this.move(this.robotPos, direction);

            // Print map
            if(this.isDebug) {
                this.map.forEach(line => console.log(JSON.stringify(line)))
            }
        });

        for (let i = 0; i < this.map.length; i++) {
            const row = this.map[i];
            for (let j = 0; j < row.length; j++) {
                if (row[j] === 'O') {
                    result += 100 * i + j
                }
            }
        }

        this.result = result;
    }
}

export class V2 extends V1 {
    constructor(year: number, test: number, isdebug: number) {
        super(year, test, isdebug);
    }

    run(): void {
        let result: number = 0;

        // DO

        this.result = result;
    }
}