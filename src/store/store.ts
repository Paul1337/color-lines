import { configureStore } from '@reduxjs/toolkit';
import { fieldReducer } from './slices/field/fieldSlice';
import { moveBallReducer } from './slices/moveBall/moveBallSlice';
import { statReducer } from './slices/stat/statSlice';

export const store = configureStore({
    reducer: {
        field: fieldReducer,
        moveBall: moveBallReducer,
        stat: statReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
