import React, { FC } from 'react';
import Ball, { IBallProps } from './Ball';

interface IStaticBallProps extends Omit<IBallProps, 'direction'> {}

export const StaticBall: FC<IStaticBallProps> = ({ ...otherProps }) => {
    return <Ball {...otherProps} direction={null}></Ball>;
};
