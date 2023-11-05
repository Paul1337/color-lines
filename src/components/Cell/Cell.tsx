import styles from './Cell.module.css';
import Ball from '../Ball/Ball';
import { CSSProperties, FC } from 'react';
import { EMovingDirection } from '../Ball/Ball';
import { config } from './config';

interface ICellProps {
    ballType?: number | null;
    position: [number, number];
    isSelected: boolean;
    onSelect?: () => void;
    size: number;
}

const Cell: FC<ICellProps> = ({ ballType, position, isSelected, onSelect, size }) => {
    const [x, y] = position;

    const trySelect = () => {
        if (ballType !== null) {
            if (onSelect) onSelect();
        }
    };

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
        <div style={style} className={styles.cell} onClick={trySelect}>
            {ballType != undefined && (
                <Ball
                    movingDelta={size + 4}
                    size={size * config.kBallSize}
                    path={[
                        EMovingDirection.Down,
                        EMovingDirection.Down,
                        EMovingDirection.Right,
                        EMovingDirection.Down,
                        EMovingDirection.Right,
                    ]}
                    type={ballType}
                />
            )}
        </div>
    );
};

export default Cell;
