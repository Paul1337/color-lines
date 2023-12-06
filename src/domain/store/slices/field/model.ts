import { IPoint } from '../moveBall/model';

export type TMatrixItem = number | null;
export type TMatrix = Array<Array<TMatrixItem>>;
export interface IFieldState {
    matrix: TMatrix;
    newBalls: IPoint[];
    deletedBalls: IPoint[];
    selected: IPoint | null;
}
