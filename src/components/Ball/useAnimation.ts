import { useRef, useState } from 'react';
import { EMovingDirection } from './Ball';
import { config } from './config';

export type TBallRef = ReturnType<typeof useRef<HTMLDivElement | null>>;

export const useAnimation = (ballRef: TBallRef) => {
    const [sumDx, setSumDx] = useState<number>(0);
    const [sumDy, setSumDy] = useState<number>(0);
    return (movingDirection: EMovingDirection) => {
        if (movingDirection !== EMovingDirection.None) {
            const goingLeft = movingDirection === EMovingDirection.Left;
            const goingRight = movingDirection === EMovingDirection.Right;
            const goingDown = movingDirection === EMovingDirection.Down;
            const goingUp = movingDirection === EMovingDirection.Up;

            const dx = goingLeft ? -config.MovingDelta : goingRight ? config.MovingDelta : 0;
            const dy = goingUp ? -config.MovingDelta : goingDown ? config.MovingDelta : 0;
            const animation = [
                {
                    transform: `translate(${sumDx}px, ${sumDy}px)`,
                },
                {
                    transform: `translate(${sumDx + dx}px, ${sumDy + dy}px)`,
                },
            ];
            ballRef.current?.animate(animation, {
                duration: config.animationTime,
                iterations: 1,
                fill: 'forwards',
            });
            setSumDx((prevDx) => {
                return prevDx + dx;
            });
            setSumDy((prevDy) => {
                return prevDy + dy;
            });
        }
    };
};
