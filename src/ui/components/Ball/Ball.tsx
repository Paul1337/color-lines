import { CSSProperties, FC, useEffect, useRef } from 'react';
import styles from './Ball.module.css';
import classNames from 'classnames';
import { animateAppearance, animateDisappearance, useMovingAnimation } from './useAnimation';

export enum EMovingDirection {
    None,
    Right,
    Left,
    Up,
    Down,
}
export interface IBallProps {
    type: number;
    size: number;
    movingDelta: number;
    onPositionUpdate: () => void;
    direction: EMovingDirection | null;
    appear: boolean;
    disappear: boolean;
}

const mapBallTypeToClass = new Map<number, string>([
    [0, 'red'],
    [1, 'green'],
    [2, 'yellow'],
    [3, 'blue'],
    [4, 'orange'],
]);

const Ball: FC<IBallProps> = ({
    size,
    movingDelta,
    type,
    direction,
    onPositionUpdate,
    appear,
    disappear,
}) => {
    const ballRef = useRef<HTMLDivElement | null>(null);
    const animate = useMovingAnimation(ballRef);
    const typeClass = mapBallTypeToClass.get(type) as string;
    const JSstyles: CSSProperties = {
        width: size + 'px',
        height: size + 'px',
    };

    useEffect(() => {
        if (direction !== null) {
            animate(direction, movingDelta, onPositionUpdate);
        }
    }, [direction]);

    useEffect(() => {
        if (appear) {
            animateAppearance(ballRef, { size });
        }
    }, [appear]);

    useEffect(() => {
        if (disappear) {
            animateDisappearance(ballRef, { size });
        }
    }, [disappear]);

    return (
        <div style={JSstyles} ref={ballRef} className={classNames(styles.ball, styles[typeClass])}></div>
    );
};

export default Ball;
