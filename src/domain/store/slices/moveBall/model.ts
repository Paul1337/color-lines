import { EMovingDirection } from '../../../../ui/components/Ball/Ball';

export interface IPoint {
    x: number;
    y: number;
}
export interface IMoveBallState {
    startPos: IPoint | null;
    endPos: IPoint | null;
    path: EMovingDirection[];
}
