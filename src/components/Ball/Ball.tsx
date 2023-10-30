import { FC, useEffect, useRef, useState } from 'react';
import styles from './Ball.module.css';
import classNames from 'classnames';
import { useMovingDirection } from './useMovingDirection';
import { config } from './config';
import { usePath } from './usePath';

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

const ballTypeToClassMap = new Map<number, string>([
    [0, 'red'],
    [1, 'green'],
    [2, 'yellow'],
    [3, 'blue'],
    [4, 'orange'],
]);

const Ball: FC<IBallProps> = ({ type, path = [] }) => {
    const ballRef = useRef<HTMLDivElement | null>(null);
    const setMovingDirection = useMovingDirection(ballRef);

    usePath(path, setMovingDirection);

    const typeClass = ballTypeToClassMap.get(type) as string;
    return <div ref={ballRef} className={classNames(styles.ball, styles[typeClass])}></div>;
};

export default Ball;
