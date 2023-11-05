import { useRef, useState } from 'react';
import { EMovingDirection } from './Ball';
import { config } from './config';

export type TBallRef = ReturnType<typeof useRef<HTMLDivElement | null>>;

export const useAnimation = (ballRef: TBallRef) => {
    const [sumDx, setSumDx] = useState<number>(0);
    const [sumDy, setSumDy] = useState<number>(0);
    return (movingDirection: EMovingDirection, movingDelta: number) => {
        if (movingDirection !== EMovingDirection.None) {
            const goingLeft = movingDirection === EMovingDirection.Left;
            const goingRight = movingDirection === EMovingDirection.Right;
            const goingDown = movingDirection === EMovingDirection.Down;
            const goingUp = movingDirection === EMovingDirection.Up;

            const dx = goingLeft ? -movingDelta : goingRight ? movingDelta : 0;
            const dy = goingUp ? -movingDelta : goingDown ? movingDelta : 0;
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
            setSumDx((prevDx) => prevDx + dx);
            setSumDy((prevDy) => prevDy + dy);
        }
    };
};
