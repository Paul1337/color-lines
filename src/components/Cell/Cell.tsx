import styles from './Cell.module.css';
import Ball from '../Ball/Ball';
import { CSSProperties, FC } from 'react';

interface ICellProps {
    ballType?: number | null;
    position: [number, number];
    isSelected: boolean;
    onSelect?: () => void;
}

const Cell: FC<ICellProps> = ({ ballType, position, isSelected, onSelect }) => {
    const [x, y] = position;

    const trySelect = () => {
        if (ballType !== null) {
            if (onSelect) onSelect();
        }
    };

    let style: CSSProperties = {
        gridColumnStart: x + 1,
        gridRowStart: y + 1,
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
            {ballType != undefined && <Ball type={ballType} />}
        </div>
    );
};

export default Cell;
