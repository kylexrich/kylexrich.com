import { ReactNode } from 'react';

export interface PassThroughProps {
    children: ReactNode;
    [key: string]: any;
}
