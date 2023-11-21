import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMoveBallState, IPoint } from './model';
import { EMovingDirection } from '../../../../ui/components/Ball/Ball';

const initialState: IMoveBallState = {
    ballPos: null,
    path: [],
};

interface ISetMovingBallPayload {
    ballPos: IPoint;
    path: EMovingDirection[];
}

export const moveBallSlice = createSlice({
    name: 'moveBall',
    initialState,
    reducers: {
        setMovingBall(state: IMoveBallState, action: PayloadAction<ISetMovingBallPayload>) {
            state.ballPos = action.payload.ballPos;
            state.path = action.payload.path;
        },
    },
});

export const { actions: moveBallActions } = moveBallSlice;
export const { reducer: moveBallReducer } = moveBallSlice;
