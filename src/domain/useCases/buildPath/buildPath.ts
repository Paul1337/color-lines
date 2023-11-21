import { EMovingDirection } from '../../../ui/components/Ball/Ball';
import { TMatrix } from '../../store/slices/field/model';
import { IPoint } from '../../store/slices/moveBall/model';

export const buildPath = (startPos: IPoint, endPos: IPoint, matrix?: TMatrix): EMovingDirection[] => {
    return [
        EMovingDirection.Right,
        EMovingDirection.Right,
        EMovingDirection.Down,
        EMovingDirection.Right,
        EMovingDirection.Down,
        EMovingDirection.Down,
        EMovingDirection.Left,
        EMovingDirection.Left,
        EMovingDirection.Up,
    ];
};
