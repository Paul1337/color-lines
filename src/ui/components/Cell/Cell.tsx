import styles from './Cell.module.css';
import Ball from '../Ball/Ball';
import { CSSProperties, FC } from 'react';
import { config } from './config';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../domain/store/store';
import { comparePoints } from '../../../lib/comparePoints';
import { moveBallActions } from '../../../domain/store/slices/moveBall/moveBallSlice';

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

    const handleBallPositionUpdate = () => {
        dispatch(moveBallActions.reset());
    };

    const [x, y] = position;

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
            {ballType != undefined && (
                <Ball
                    onPositionUpdate={handleBallPositionUpdate}
                    path={comparePoints(movingBallData.ballPos, { x, y }) ? movingBallData.path : []}
                    movingDelta={size + 4}
                    size={size * config.kBallSize}
                    type={ballType}
                />
            )}
        </div>
    );
};

export default Cell;
