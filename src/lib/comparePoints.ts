import { IPoint } from '../domain/store/slices/moveBall/model';

export const comparePoints = (point1: IPoint | null, point2: IPoint) => {
    return point1 !== null && point1.x === point2.x && point1.y === point2.y;
};
