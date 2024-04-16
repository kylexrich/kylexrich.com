import {ReactNode} from 'react';

export type PassThroughProps = Record<string, unknown>;

export interface PropsAndChildren extends PassThroughProps {
    children?: ReactNode;
}

export interface PropsWithComponent extends PropsAndChildren {
    component: React.ElementType;
}
