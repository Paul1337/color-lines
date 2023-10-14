import { IPoint, TMatrix } from '../../matrix/types';

export const buildPath = (point1?: IPoint, point2?: IPoint, matrix?: TMatrix): IPoint[] => {
    return [
        {
            x: 0,
            y: 0,
        },
        {
            x: 1,
            y: 0,
        },
        {
            x: 1,
            y: 1,
        },
        {
            x: 0,
            y: 1,
        },
        {
            x: 0,
            y: 2,
        },
    ];
};
