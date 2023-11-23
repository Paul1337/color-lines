import { IPoint } from '../store/slices/moveBall/model';

export const getUpPoint = (point: IPoint): IPoint => ({
    x: point.x,
    y: point.y - 1,
});

export const getRightPoint = (point: IPoint): IPoint => ({
    x: point.x + 1,
    y: point.y,
});

export const getBottomPoint = (point: IPoint): IPoint => ({
    x: point.x,
    y: point.y + 1,
});

export const getLeftPoint = (point: IPoint): IPoint => ({
    x: point.x - 1,
    y: point.y,
});
