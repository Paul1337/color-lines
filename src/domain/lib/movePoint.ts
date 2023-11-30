import { EMovingDirection } from '../../ui/components/Ball/Ball';
import { IPoint } from '../store/slices/moveBall/model';

export const movePoint = (point: IPoint, dir: EMovingDirection) => {
    if (dir === EMovingDirection.Left) {
        point.x -= 1;
    } else if (dir === EMovingDirection.Up) {
        point.y -= 1;
    } else if (dir === EMovingDirection.Right) {
        point.x += 1;
    } else if (dir === EMovingDirection.Down) {
        point.y += 1;
    }
};
