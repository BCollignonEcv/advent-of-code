import day from '../day.class';
import * as formaters from '../helpers/formaters';
import { Coordinates, toCoordinates, getBoundaries, isInBoundaries, findInMatrix } from '../helpers/matrixHelpers';

type Mouvement = {
    position: Coordinates,
    to: Coordinates
}

export class V1 extends day {
    public playerPosition: Coordinates;
    public boundaries: Array<number>;
    public visited: Set<string>;

    constructor(year: number, test: number, isdebug: number) {
        super(year, test, isdebug);
        this.playerPosition = [0, 0]
        this.boundaries = [0, 0]
        this.visited = new Set();
    }

    getFakeInputs(): void {
        let inputs: string = '....#.....\n.........#\n..........\n..#.......\n.......#..\n..........\n.#..^.....\n........#.\n#.........\n......#...';
        this.inputs = inputs;
    }

    formatInputs(): void {
        let formatedInputs: Array<Array<string>> = formaters.textToArrayOfArrayOfChar(this.inputs, '');
        this.formatedInputs = formatedInputs;
    }

    canMoveTo([y, x]: Coordinates | Array<number>): boolean {
        return this.formatedInputs[y][x] != '#';
    }

    move(move: Mouvement): void {

        if (!this.visited.has(move.position.toString())) {
            this.visited.add(move.position.toString())
        }

        let nextPosition = [move.position[0] + move.to[0], move.position[1] + move.to[1]]
        if (!isInBoundaries(this.boundaries, nextPosition)) {
            return;
        }

        let nextMove = move;
        if (!this.canMoveTo(nextPosition)) {
            nextMove.to = [move.to[1], -move.to[0]]
        }

        nextMove.position = [move.position[0] + nextMove.to[0], move.position[1] + nextMove.to[1]]
        return this.move(nextMove)
    }

    run(): void {
        let result: number = 0;

        this.playerPosition = toCoordinates(findInMatrix(this.formatedInputs, '^'));
        this.boundaries = getBoundaries(this.formatedInputs)

        this.move({ position: this.playerPosition, to: [-1, 0] });

        result = this.visited.size;
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