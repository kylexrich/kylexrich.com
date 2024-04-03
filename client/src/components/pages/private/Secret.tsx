import React from 'react';
import ResumeSection from './ResumeSection';
import { LayoutTransition } from '../../shared/MotionComponents';

export interface SecretProps {
    // empty
}

const Secret: React.FC<SecretProps> = (props) => {
    return (
        <LayoutTransition>
            <h1>Secret</h1>
            <ResumeSection />
        </LayoutTransition>
    );
};

export default Secret;
