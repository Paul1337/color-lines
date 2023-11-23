import { EMovingDirection } from '../../../ui/components/Ball/Ball';
import { getDirectionBetweenPoints } from '../../lib/getDirectionBetweenPoints';
import { getBottomPoint, getLeftPoint, getRightPoint, getUpPoint } from '../../lib/getNeighborPoint';
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
            !matrix[y][x] &&
            !visitedMatrix[y][x]
        );
    };

    const getMovingInfo = (point: IPoint) => {
        const canMoveUp = canMoveBallTo(getUpPoint(point));
        const canMoveRight = canMoveBallTo(getRightPoint(point));
        const canMoveDown = canMoveBallTo(getBottomPoint(point));
        const canMoveLeft = canMoveBallTo(getLeftPoint(point));
        return {
            canMoveUp,
            canMoveRight,
            canMoveDown,
            canMoveLeft,
        };
    };

    let currentPos = { ...startPos } as IPoint;
    visitedMatrix[currentPos.y][currentPos.x] = true;

    let allIterated = false;
    while (!allIterated) {
        const { canMoveUp, canMoveRight, canMoveDown, canMoveLeft } = getMovingInfo(currentPos);

        const prevPos = { ...currentPos } as IPoint;

        if (canMoveUp) {
            currentPos.y -= 1;
        } else if (canMoveRight) {
            currentPos.x += 1;
        } else if (canMoveDown) {
            currentPos.y += 1;
        } else if (canMoveLeft) {
            currentPos.x -= 1;
        } else {
            const backDir = dirMatrix[currentPos.y][currentPos.x];
            if (backDir === null) {
                allIterated = true;
            } else {
                currentPos = backDir;
            }
        }

        const canMove = canMoveUp || canMoveDown || canMoveRight || canMoveLeft;
        if (canMove) {
            visitedMatrix[currentPos.y][currentPos.x] = true;
            dirMatrix[currentPos.y][currentPos.x] = prevPos;
        }
    }
    console.log(dirMatrix);
    console.log(visitedMatrix);

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
