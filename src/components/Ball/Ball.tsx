import { FC, useEffect, useRef } from 'react';
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
}

const mapBallTypeToClass = new Map<number, string>([
    [0, 'red'],
    [1, 'green'],
    [2, 'yellow'],
    [3, 'blue'],
    [4, 'orange'],
]);

const Ball: FC<IBallProps> = ({ type, path = [] }) => {
    const ballRef = useRef<HTMLDivElement | null>(null);
    usePath(path, ballRef);
    const typeClass = mapBallTypeToClass.get(type) as string;
    return <div ref={ballRef} className={classNames(styles.ball, styles[typeClass])}></div>;
};

export default Ball;
