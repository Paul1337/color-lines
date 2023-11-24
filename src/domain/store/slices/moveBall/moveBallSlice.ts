import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMoveBallState, IPoint } from './model';
import { EMovingDirection } from '../../../../ui/components/Ball/Ball';

const initialState: IMoveBallState = {
    startPos: null,
    endPos: null,
    path: [],
};

interface ISetMovingBallPayload {
    ballPos: IPoint;
    endPos: IPoint;
    path: EMovingDirection[];
}

export const moveBallSlice = createSlice({
    name: 'moveBall',
    initialState,
    reducers: {
        setMovingBall(state: IMoveBallState, action: PayloadAction<ISetMovingBallPayload>) {
            state.startPos = action.payload.ballPos;
            state.endPos = action.payload.endPos;
            state.path = action.payload.path;
        },
        reset(state: IMoveBallState) {
            state.startPos = null;
            state.endPos = null;
        },
    },
});

export const { actions: moveBallActions } = moveBallSlice;
export const { reducer: moveBallReducer } = moveBallSlice;
