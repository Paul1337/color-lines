import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { buildStartMatrix } from '../../../useCases/buildStartMatrix/buildStartMatrix';
import { IFieldState } from './model';
import { IPoint } from '../moveBall/model';

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
            const { startPos, endPos } = action.payload;
            state.matrix[endPos.y][endPos.x] = state.matrix[startPos.y][startPos.x];
            state.matrix[startPos.y][startPos.x] = null;
        },
    },
});

export const { actions: fieldActions } = fieldSlice;
export const { reducer: fieldReducer } = fieldSlice;
