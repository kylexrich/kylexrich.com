import { ReactNode } from 'react';

export interface PassThroughProps {
    [key: string]: any;
}

export interface PropsAndChildren extends PassThroughProps {
    children?: ReactNode;
}

export interface PropsWithComponent extends PropsAndChildren {
    component: React.ElementType;
}
