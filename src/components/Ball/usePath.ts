import { useEffect } from 'react';
import { EMovingDirection } from './Ball';
import { config } from './config';

export const usePath = (
    path: Array<EMovingDirection>,
    setMovingDirection: (direction: EMovingDirection) => void
) => {
    const nextDirection = (currentStage: number) => {
        if (currentStage === path.length) return;
        setMovingDirection(path[currentStage]);
        setTimeout(() => nextDirection(currentStage + 1), config.animationTime);
    };

    useEffect(() => {
        nextDirection(0);
    }, [path]);
    return;
};
