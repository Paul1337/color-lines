import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BallTypesCount, deleteCount, NewBallsCount } from '../../../config/config';
import { buildStartMatrix } from '../../../useCases/buildStartMatrix/buildStartMatrix';
import { IPoint } from '../moveBall/model';
import { IFieldState, TMatrix } from './model';

const initialState: IFieldState = {
    matrix: buildStartMatrix(),
    newBalls: [],
    deletedBalls: [],
    selected: null,
};

export enum ECheckingDirections {
    None,
    Right,
    Left,
    Top,
    Bottom,
    RightTop,
    RightBottom,
    LeftTop,
    LeftBottom,
}

export const fieldSlice = createSlice({
    name: 'field',
    initialState,
    reducers: {
        resetMatrix(state: IFieldState) {
            state.matrix = buildStartMatrix();
            state.selected = null;
            state.newBalls = [];
        },
        setSelected(state: IFieldState, action: PayloadAction<IPoint>) {
            state.selected = action.payload;
        },
        moveMatrixBall(state: IFieldState, action: PayloadAction<{ startPos: IPoint; endPos: IPoint }>) {
            const { endPos, startPos } = action.payload;
            state.matrix[endPos.y][endPos.x] = state.matrix[startPos.y][startPos.x];
            state.matrix[startPos.y][startPos.x] = null;
        },
        addMatrixBalls(state: IFieldState) {
            let emptyCells = 0;
            for (let row of state.matrix) {
                for (const cell of row) {
                    if (cell === null) {
                        emptyCells += 1;
                    }
                }
            }
            const balls: boolean[] = new Array(emptyCells).fill(false);
            for (let i = 0; i < Math.min(NewBallsCount, emptyCells); i++) balls[i] = true;

            for (let i = 0; i < balls.length; i++) {
                let rndInd = Math.floor(Math.random() * balls.length);
                const tmp = balls[rndInd];
                balls[rndInd] = balls[i];
                balls[i] = tmp;
            }

            let cnt = 0;
            state.newBalls = [];
            for (let i = 0; i < state.matrix.length; i++) {
                for (let j = 0; j < state.matrix[i].length; j++) {
                    const cell = state.matrix[i][j];
                    if (cell === null) {
                        if (balls[cnt]) {
                            state.matrix[i][j] = Math.floor(Math.random() * BallTypesCount);
                            state.newBalls.push({
                                x: j,
                                y: i,
                            });
                        }
                        cnt++;
                    }
                }
            }
        },
        deleteSimBalls(state: IFieldState) {
            state.deletedBalls = [];
            for (let y = 0; y < state.matrix.length; y++) {
                for (let x = 0; x < state.matrix[y].length; x++) {
                    let currentBallType = state.matrix[y][x];

                    if (currentBallType !== null) {
                        if (currentBallType !== state.matrix[y][x - 1]) {
                            const checkingRight = checkDir(
                                { y, x },
                                ECheckingDirections.Right,
                                state.matrix
                            );
                            if (checkingRight >= deleteCount) {
                                for (let g = 0; g < checkingRight; g++) {
                                    state.deletedBalls.push({ x: x + g, y });
                                    state.matrix[y][x + g] = null;
                                }
                            }
                        }

                        if (currentBallType !== state.matrix[y - 1]?.[x]) {
                            const checkingBottom = checkDir(
                                { y, x },
                                ECheckingDirections.Bottom,
                                state.matrix
                            );
                            if (checkingBottom >= deleteCount) {
                                for (let g = 0; g < checkingBottom; g++) {
                                    state.deletedBalls.push({ x, y: y + g });
                                    state.matrix[y + g][x] = null;
                                }
                            }
                        }
                        if (currentBallType !== state.matrix[y + 1]?.[x - 1]) {
                            const checkingRightTop = checkDir(
                                { y, x },
                                ECheckingDirections.RightTop,
                                state.matrix
                            );
                            if (checkingRightTop >= deleteCount) {
                                for (let g = 0; g < checkingRightTop; g++) {
                                    state.deletedBalls.push({ x: x + g, y: y - g });
                                    state.matrix[y - g][x + g] = null;
                                }
                            }
                        }
                        if (currentBallType !== state.matrix[y - 1]?.[x - 1]) {
                            const checkingRightBottom = checkDir(
                                { y, x },
                                ECheckingDirections.RightBottom,
                                state.matrix
                            );
                            if (checkingRightBottom >= deleteCount) {
                                for (let g = 0; g < checkingRightBottom; g++) {
                                    state.deletedBalls.push({ x: x + g, y: y + g });
                                    state.matrix[y + g][x + g] = null;
                                }
                            }
                        }
                    }
                }
            }
        },
    },
});

export const { actions: fieldActions } = fieldSlice;
export const { reducer: fieldReducer } = fieldSlice;

const checkDir = ({ y, x }: IPoint, direction: ECheckingDirections, matrix: TMatrix) => {
    let currentBallType = matrix[y][x];
    let i = 0;

    if (direction === ECheckingDirections.RightTop) {
        while (currentBallType === matrix[y - i]?.[x + i]) {
            i++;
        }
    }
    if (direction === ECheckingDirections.RightBottom) {
        while (currentBallType === matrix[y + i]?.[x + i]) {
            i++;
        }
    }
    if (direction === ECheckingDirections.Right) {
        while (currentBallType === matrix[y]?.[x + i]) {
            i++;
        }
    }
    if (direction === ECheckingDirections.Bottom) {
        while (currentBallType === matrix[y + i]?.[x]) {
            i++;
        }
    }

    return i;
};
