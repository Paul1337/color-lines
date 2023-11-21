import { useEffect, useState } from 'react';
import { EMovingDirection } from './Ball';
import { config } from './config';
import { TBallRef, useAnimation } from './useAnimation';

interface IMovingParams {
    movingDelta: number;
    onPositionUpdate?: () => void;
}

export const usePath = (path: Array<EMovingDirection>, ballRef: TBallRef, params: IMovingParams) => {
    const animate = useAnimation(ballRef);
    const [stage, setStage] = useState(0);

    const stageAnimation = () => {
        if (stage === path.length) {
            params.onPositionUpdate?.();
            return;
        } else {
            animate(path[stage], params.movingDelta);
            setTimeout(() => {
                setStage((stage) => stage + 1);
            }, config.animationTime);
        }
    };

    useEffect(() => {
        stageAnimation();
    }, [path, stage]);
};
