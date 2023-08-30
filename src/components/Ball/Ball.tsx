import { FC } from 'react';
import styles from './Ball.module.css';

interface IBallProps {
    type: number;
}

const ballTypeToClassMap = new Map<number, string>([
    [0, 'red'],
    [1, 'green'],
    [2, 'yellow'],
    [3, 'blue'],
    [4, 'orange'],
]);

const Ball: FC<IBallProps> = ({ type }) => {
    const typeClass = ballTypeToClassMap.get(type) as string;
    return <div className={styles.ball + ' ' + styles[typeClass]}></div>;
};

export default Ball;
