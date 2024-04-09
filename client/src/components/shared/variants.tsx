import React from 'react';

export enum MotionDuration {
    INSTANT = 0.01,
    BLIP = 0.03,
    VERY_FAST = 0.05,
    FAST = 0.1,
    SHORT = 0.2,
    MEDIUM = 0.3,
    SLOW = 0.5,
    VERY_SLOW = 0.75,
    SLUGGISH = 1
}

export const initialEnter = { initial: 'initial', animate: 'enter' };
