import { fieldActions } from '../slices/field/fieldSlice';
import { statActions } from '../slices/stat/statSlice';
import { AppThunk } from '../store';

export const thunkDeleteSimilarBalls = (): AppThunk => {
    return (dispatch, getState) => {
        dispatch(fieldActions.deleteSimBalls());

        const deletedBalls = getState().field.deletedBalls;
        const pointsToAdd = deletedBalls.length;

        dispatch(statActions.addScore(pointsToAdd));
    };
};
