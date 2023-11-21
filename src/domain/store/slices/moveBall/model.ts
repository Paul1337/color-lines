import { EMovingDirection } from '../../../../ui/components/Ball/Ball';

export interface IPoint {
    x: number;
    y: number;
}
export interface IMoveBallState {
    ballPos: IPoint | null;
    path: EMovingDirection[];
}
