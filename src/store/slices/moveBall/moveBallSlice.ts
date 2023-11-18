import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IMoveBallState } from './model';

const initialState: IMoveBallState = {
    startPos: null,
    endPos: null,
};

export const moveBallSlice = createSlice({
    name: 'moveBall',
    initialState,
    reducers: {},
});

export const { actions: moveBallActions } = moveBallSlice;
export const { reducer: moveBallReducer } = moveBallSlice;
