import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { EMovingDirection } from './Ball';
import { config } from './config';

type TBallRef = ReturnType<typeof useRef<HTMLDivElement | null>>;

export const useMovingDirection = (ballRef: TBallRef) => {
    const [movingDirection, setMovingDirection] = useState<EMovingDirection>(EMovingDirection.None);
    const [sumDx, setSumDx] = useState<number>(0);
    const [sumDy, setSumDy] = useState<number>(0);

    useEffect(() => {
        if (movingDirection !== EMovingDirection.None) {
            const goingLeft = movingDirection === EMovingDirection.Left;
            const goingRight = movingDirection === EMovingDirection.Right;
            const goingDown = movingDirection === EMovingDirection.Down;
            const goingUp = movingDirection === EMovingDirection.Up;

            const dx = goingLeft ? -config.MovingDelta : goingRight ? config.MovingDelta : 0;
            const dy = goingUp ? -config.MovingDelta : goingDown ? config.MovingDelta : 0;

            const animation = [
                {
                    transform: `translate(${sumDx}, ${sumDy})`,
                },
                {
                    transform: `translate(${sumDx + dx}px, ${sumDy + dy}px)`,
                },
            ];
            console.log(animation);
            ballRef.current?.animate(animation, {
                duration: config.animationTime,
                iterations: 1,
                fill: 'forwards',
            });
            setSumDx(sumDx + dx);
            setSumDy(sumDy + dy);
        }
    }, [movingDirection]);
    return setMovingDirection;
};
