import React, { FC } from 'react';
import Ball, { EMovingDirection, IBallProps } from './Ball';

interface IStaticBallProps extends IBallProps {
    direction: EMovingDirection;
}

export const AnimatingBall: FC<IStaticBallProps> = ({ direction, ...otherProps }) => {
    return <Ball {...otherProps} direction={direction}></Ball>;
};
