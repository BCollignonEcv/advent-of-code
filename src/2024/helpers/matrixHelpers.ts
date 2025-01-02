export type Coordinates = [y: number, x: number];

export const directions = {
    left: [-1, 0],
    rigth: [1, 0],
    bottom: [0, -1],
    top: [0, 1]
};

export const getBoundaries = (map: Array<Array<any>>): Array<number> => {
    return [map[0].length, map.length]
}

export const isInBoundaries = ([yLength, xLength]: Array<number>, [y, x]: Array<number>) => {
    return x >= 0 && y >= 0 && x < xLength && y < yLength
}

export const findInMatrix = (matrix: Array<Array<string>>, string: string): Array<number> => {
    for (let i = 0; i < matrix.length; i++) {
        const row = matrix[i];
        for (let j = 0; j < row.length; j++) {
            if (row[j] === string) {
                return [i, j];
            }
        }
    }
    return [0, 0];
}

export const toCoordinates = (input: number[]): Coordinates => {
    const [y, x] = input;
    return [y, x];
}

