import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { buildStartMatrix } from '../../../useCases/buildStartMatrix/buildStartMatrix';
import { IFieldState } from './model';
import { IPoint } from '../moveBall/model';
import { BallTypesCount, Dimention, NewBallsCount } from '../../../config/config';
import { EMovingDirection } from '../../../../ui/components/Ball/Ball';
import { movePoint } from '../../../lib/movePoint';

const initialState: IFieldState = {
    matrix: buildStartMatrix(),
    selected: null,
};

export const fieldSlice = createSlice({
    name: 'field',
    initialState,
    reducers: {
        resetMatrix(state: IFieldState) {
            state.matrix = buildStartMatrix();
            state.selected = null;
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
            for (let i = 0; i < state.matrix.length; i++) {
                for (let j = 0; j < state.matrix[i].length; j++) {
                    const cell = state.matrix[i][j];
                    if (cell === null) {
                        if (balls[cnt]) {
                            state.matrix[i][j] = Math.floor(Math.random() * BallTypesCount);
                        }
                        cnt++;
                    }
                }
            }
        },
    },
});

export const { actions: fieldActions } = fieldSlice;
export const { reducer: fieldReducer } = fieldSlice;
