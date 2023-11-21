import { createSlice } from '@reduxjs/toolkit';
import { IStat } from './model';

const initialState: IStat = {
    score: 0,
};

export const statSlice = createSlice({
    name: 'stat',
    initialState,
    reducers: {},
});

export const { actions: statActions } = statSlice;
export const { reducer: statReducer } = statSlice;
