import { BallTypesCount, Dimention, StartBallsCount } from '../../config/config';
import { TMatrix } from '../../store/slices/field/model';

const mixMatrix = (matrix: TMatrix) => {
    for (let y = 0; y < Dimention; y++) {
        for (let x = 0; x < Dimention; x++) {
            const newY = Math.floor(Math.random() * Dimention);
            const newX = Math.floor(Math.random() * Dimention);

            const type = matrix[y][x];
            matrix[y][x] = matrix[newY][newX];
            matrix[newY][newX] = type;
        }
    }
};
export const buildStartMatrix = () => {
    const matrix = new Array(Dimention);
    for (let i = 0; i < Dimention; i++) {
        matrix[i] = new Array(Dimention).fill(null);
    }
    for (let i = 0; i < StartBallsCount; i++) {
        const rowInd = Math.floor(i / Dimention);
        const colInd = i % Dimention;
        matrix[rowInd][colInd] = Math.floor(Math.random() * BallTypesCount);
    }

    mixMatrix(matrix);

    return matrix;
};
