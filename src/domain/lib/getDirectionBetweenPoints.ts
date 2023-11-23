import { EMovingDirection } from '../../ui/components/Ball/Ball';
import { IPoint } from '../store/slices/moveBall/model';

export const getDirectionBetweenPoints = (prevPoint: IPoint, currentPoint: IPoint): EMovingDirection => {
    if (prevPoint.x + 1 === currentPoint.x) {
        return EMovingDirection.Right;
    } else if (prevPoint.x - 1 === currentPoint.x) {
        return EMovingDirection.Left;
    } else if (prevPoint.y + 1 === currentPoint.y) {
        return EMovingDirection.Down;
    } else {
        return EMovingDirection.Up;
    }
};
