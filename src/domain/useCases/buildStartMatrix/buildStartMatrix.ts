import { BallTypesCount, Dimention, StartBallsCount } from '../../config/config';
import { TMatrix } from '../../store/slices/field/model';

const mixMatrix = (matrix: TMatrix) => {
    for (let i = 0; i < Dimention; i++) {
        for (let j = 0; j < Dimention; j++) {
            const newI = Math.floor(Math.random() * Dimention);
            const newJ = Math.floor(Math.random() * Dimention);

            const t = matrix[i][j];
            matrix[i][j] = matrix[newI][newJ];
            matrix[newI][newJ] = t;
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
