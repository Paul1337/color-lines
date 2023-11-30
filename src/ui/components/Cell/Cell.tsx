import styles from './Cell.module.css';
import Ball, { EMovingDirection } from '../Ball/Ball';
import { CSSProperties, FC } from 'react';
import { config } from './config';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../domain/store/store';
import { comparePoints } from '../../../lib/comparePoints';
import { moveBallActions } from '../../../domain/store/slices/moveBall/moveBallSlice';
import { fieldActions } from '../../../domain/store/slices/field/fieldSlice';
import { IPoint } from '../../../domain/store/slices/moveBall/model';
import { movePoint } from '../../../domain/lib/movePoint';
import { AnimatingBall } from '../Ball/AnimatingBall';
import { StaticBall } from '../Ball/StaticBall';

interface ICellProps {
    ballType?: number | null;
    position: [number, number];
    isSelected: boolean;
    onClick?: () => void;
    size: number;
}

const Cell: FC<ICellProps> = ({ ballType, position, isSelected, onClick, size }) => {
    const movingBallData = useSelector((state: RootState) => state.moveBall);
    const dispatch = useDispatch();

    const [x, y] = position;

    const handleBallPositionUpdate = () => {
        console.log('handle ball position update', movingBallData.path);

        const newPos = { x, y };
        movePoint(newPos, movingBallData.path[0]);

        dispatch(
            fieldActions.moveMatrixBall({
                startPos: movingBallData.startPos as IPoint,
                endPos: newPos,
            })
        );
        dispatch(moveBallActions.setStartPos(newPos));
        if (movingBallData.path.length === 1) {
            console.log('reset');
            dispatch(fieldActions.addMatrixBalls());
            dispatch(moveBallActions.reset());
        }

        dispatch(moveBallActions.setPath(movingBallData.path.slice(1)));
    };

    let ballDirection: EMovingDirection | null = null;

    if (comparePoints(movingBallData.startPos, { x, y })) {
        ballDirection = movingBallData.path[0];
    }

    let style: CSSProperties = {
        gridColumnStart: x + 1,
        gridRowStart: y + 1,
        width: size + 'px',
        height: size + 'px',
    };
    if (isSelected) {
        style = {
            ...style,
            backgroundColor: '#fff',
            border: '2px solid red',
            padding: 0,
        };
    }
    return (
        <div style={style} className={styles.cell} onClick={() => onClick?.()}>
            {ballType !== null &&
                (ballDirection ? (
                    <AnimatingBall
                        direction={ballDirection}
                        onPositionUpdate={handleBallPositionUpdate}
                        movingDelta={size + 4}
                        size={size * config.kBallSize}
                        type={ballType as number}
                    />
                ) : (
                    <StaticBall
                        onPositionUpdate={handleBallPositionUpdate}
                        movingDelta={size + 4}
                        size={size * config.kBallSize}
                        type={ballType as number}
                    />
                ))}
        </div>
    );
};

export default Cell;
