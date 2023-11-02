import { useEffect, useState } from 'react';
import { EMovingDirection } from './Ball';
import { config } from './config';
import { TBallRef, useAnimation } from './useAnimation';

export const usePath = (path: Array<EMovingDirection>, ballRef: TBallRef) => {
    const animate = useAnimation(ballRef);
    const [stage, setStage] = useState(0);

    const stageAnimation = () => {
        if (stage === path.length) return;
        animate(path[stage]);
        setTimeout(() => {
            setStage((stage) => stage + 1);
        }, config.animationTime);
    };

    useEffect(() => {
        stageAnimation();
    }, [path, stage]);
};
