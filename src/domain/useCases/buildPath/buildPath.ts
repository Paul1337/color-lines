import { comparePoints } from '../../../lib/comparePoints';
import { EMovingDirection } from '../../../ui/components/Ball/Ball';
import { getDirectionBetweenPoints } from '../../lib/getDirectionBetweenPoints';
import { getBottomPoint, getLeftPoint, getRightPoint, getUpPoint } from '../../lib/getNeighborPoint';
import { movePoint } from '../../lib/movePoint';
import { TMatrix } from '../../store/slices/field/model';
import { IPoint } from '../../store/slices/moveBall/model';

type TVisitedMatrix = Array<Array<boolean>>;
type TDirMatrix = Array<Array<IPoint | null>>;
type TBuildPathResult = EMovingDirection[] | null;

export const buildPath = (startPos: IPoint, endPos: IPoint, matrix: TMatrix): TBuildPathResult => {
    const visitedMatrix: TVisitedMatrix = new Array(matrix.length);
    for (let i = 0; i < matrix.length; i++) {
        visitedMatrix[i] = new Array(matrix[i].length).fill(false);
    }

    const dirMatrix: TDirMatrix = new Array(matrix.length);
    for (let i = 0; i < matrix.length; i++) {
        dirMatrix[i] = new Array(matrix[i].length).fill(null);
    }

    const canMoveBallTo = ({ x, y }: IPoint) => {
        return (
            x >= 0 &&
            x < matrix[0].length &&
            y >= 0 &&
            y < matrix.length &&
            matrix[y][x] === null &&
            !visitedMatrix[y][x]
        );
    };

    const getAvailableDirections = (point: IPoint) => {
        const canMoveUp = canMoveBallTo(getUpPoint(point));
        const canMoveRight = canMoveBallTo(getRightPoint(point));
        const canMoveDown = canMoveBallTo(getBottomPoint(point));
        const canMoveLeft = canMoveBallTo(getLeftPoint(point));

        return [
            canMoveUp && EMovingDirection.Up,
            canMoveRight && EMovingDirection.Right,
            canMoveDown && EMovingDirection.Down,
            canMoveLeft && EMovingDirection.Left,
        ].filter(Boolean) as EMovingDirection[];
    };

    let currentPos = { ...startPos } as IPoint;
    visitedMatrix[currentPos.y][currentPos.x] = true;

    let allIterated = false;
    while (!allIterated) {
        if (comparePoints(currentPos, endPos)) break;

        const availableDirections = getAvailableDirections(currentPos);
        const priorDirs: EMovingDirection[] = getPriorDirs(currentPos, endPos);

        const prevPos = { ...currentPos } as IPoint;

        let didMove = false;
        for (const dir of priorDirs) {
            if (availableDirections.includes(dir)) {
                movePoint(currentPos, dir);
                didMove = true;
                break;
            }
        }

        if (!didMove) {
            for (const dir of availableDirections) {
                movePoint(currentPos, dir);
                didMove = true;
                break;
            }
        }

        if (didMove) {
            visitedMatrix[currentPos.y][currentPos.x] = true;
            dirMatrix[currentPos.y][currentPos.x] = prevPos;
        } else {
            const backDir = dirMatrix[currentPos.y][currentPos.x];
            if (backDir === null) {
                allIterated = true;
            } else {
                currentPos = backDir;
            }
        }
    }
    // console.log(dirMatrix);
    // console.log(visitedMatrix);

    if (!visitedMatrix[endPos.y][endPos.x]) {
        return null;
    }

    currentPos = endPos;
    const path: EMovingDirection[] = [];

    while (dirMatrix[currentPos.y][currentPos.x] != null) {
        const prevPos = dirMatrix[currentPos.y][currentPos.x] as IPoint;
        path.push(getDirectionBetweenPoints(prevPos, currentPos));
        currentPos = prevPos;
    }

    return path.reverse();
};

const getPriorDirs = (currentPos: IPoint, endPos: IPoint) => {
    const dirs: EMovingDirection[] = [];
    if (endPos.x > currentPos.x) {
        dirs.push(EMovingDirection.Right);
    } else if (endPos.x < currentPos.x) {
        dirs.push(EMovingDirection.Left);
    }
    if (endPos.y > currentPos.y) {
        dirs.push(EMovingDirection.Down);
    } else if (endPos.y < currentPos.y) {
        dirs.push(EMovingDirection.Up);
    }
    return dirs;
};
