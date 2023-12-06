import { useEffect, useRef, useState } from 'react';
import { EMovingDirection } from './Ball';
import { config } from './config';

export type TBallRef = ReturnType<typeof useRef<HTMLDivElement | null>>;

export const useMovingAnimation = (ballRef: TBallRef) => {
    const [sumDx, setSumDx] = useState<number>(0);
    const [sumDy, setSumDy] = useState<number>(0);
    return (movingDirection: EMovingDirection, movingDelta: number, onFinish: () => void) => {
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
                duration: config.movingAnimationTime,
                iterations: 1,
                fill: 'forwards',
            });
            setSumDx((prevDx) => prevDx + dx);
            setSumDy((prevDy) => prevDy + dy);

            setTimeout(onFinish, config.movingAnimationTime);
        }
    };
};

interface IAppearingDisappearingAnimationParams {
    size: number;
}

export const animateAppearance = (ballRef: TBallRef, params: IAppearingDisappearingAnimationParams) => {
    const { size } = params;

    const appearingAnimation = [
        {
            width: `${size * 0.05}px`,
            height: `${size * 0.05}px`,
            opacity: `0.2`,
        },
        {
            width: `${size}px`,
            height: `${size}px`,
            opacity: `1`,
        },
    ];
    ballRef.current?.animate(appearingAnimation, {
        duration: config.appearingBallAnimationTime,
        iterations: 1,
        fill: 'forwards',
    });
};

export const animateDisappearance = (
    ballRef: TBallRef,
    params: IAppearingDisappearingAnimationParams
) => {
    const { size } = params;

    const appearingAnimation = [
        {
            width: `${size}px`,
            height: `${size}px`,
            opacity: `1`,
        },
        {
            width: `${size * 0.05}px`,
            height: `${size * 0.05}px`,
            opacity: `0.2`,
        },
    ];
    ballRef.current?.animate(appearingAnimation, {
        duration: config.disappearingBallAnimationTime,
        iterations: 1,
        fill: 'forwards',
    });
};
