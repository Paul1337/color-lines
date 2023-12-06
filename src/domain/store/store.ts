import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { fieldReducer } from './slices/field/fieldSlice';
import { moveBallReducer } from './slices/moveBall/moveBallSlice';
import { statReducer } from './slices/stat/statSlice';
import { UnknownAsyncThunkAction } from '@reduxjs/toolkit/dist/matchers';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
    reducer: {
        field: fieldReducer,
        moveBall: moveBallReducer,
        stat: statReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;
