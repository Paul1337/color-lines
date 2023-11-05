import { CSSProperties, FC, useEffect, useRef } from 'react';
import styles from './Ball.module.css';
import classNames from 'classnames';
import { usePath } from './usePath';
import { useAnimation } from './useAnimation';

export enum EMovingDirection {
    None,
    Right,
    Left,
    Up,
    Down,
}
interface IBallProps {
    type: number;
    path?: Array<EMovingDirection>;
    size: number;
    movingDelta: number;
}

const mapBallTypeToClass = new Map<number, string>([
    [0, 'red'],
    [1, 'green'],
    [2, 'yellow'],
    [3, 'blue'],
    [4, 'orange'],
]);

const Ball: FC<IBallProps> = ({ size, movingDelta, type, path = [] }) => {
    const ballRef = useRef<HTMLDivElement | null>(null);
    usePath(path, ballRef, {
        movingDelta,
    });
    const typeClass = mapBallTypeToClass.get(type) as string;
    const JSstyles: CSSProperties = {
        width: size + 'px',
        height: size + 'px',
    };
    return (
        <div style={JSstyles} ref={ballRef} className={classNames(styles.ball, styles[typeClass])}></div>
    );
};

export default Ball;
