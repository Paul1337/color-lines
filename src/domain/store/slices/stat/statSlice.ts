import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStat } from './model';

const initialState: IStat = {
    score: 0,
};

export const statSlice = createSlice({
    name: 'stat',
    initialState,
    reducers: {
        setScore(state: IStat, action: PayloadAction<number>) {
            state.score = action.payload;
        },
        addScore(state: IStat, action: PayloadAction<number>) {
            state.score += action.payload;
        },
    },
});

export const { actions: statActions } = statSlice;
export const { reducer: statReducer } = statSlice;
