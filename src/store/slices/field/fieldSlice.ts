import { createSlice } from '@reduxjs/toolkit';
import { buildStartMatrix } from '../../useCases/buildStartMatrix/buildStartMatrix';
import { IFieldState } from './model';

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
    },
});

export const { actions: fieldActions } = fieldSlice;
export const { reducer: fieldReducer } = fieldSlice;
