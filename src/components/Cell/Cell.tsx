import styles from './Cell.module.css';
import Ball from '../Ball/Ball';
import { FC } from 'react';

interface ICellProps {
    ballType?: number | null;
    position: [number, number];
}

const Cell: FC<ICellProps> = ({ ballType, position }) => {
    const [x, y] = position;

    const style = {
        gridColStart: x + 1,
        gridRowStart: y + 1,
    };
    return (
        <div style={style} className={styles.cell}>
            {ballType != undefined && <Ball type={ballType} />}
        </div>
    );
};

export default Cell;
