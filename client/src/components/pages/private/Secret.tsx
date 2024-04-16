import React from 'react';
import MainLayout from '../../app/layout/MainLayout.tsx';
import ResumeSection from './ResumeSection.tsx';

export interface SecretProps {
    // empty
}

const Secret: React.FC<SecretProps> = () => {
    return (
        <MainLayout>
            <h1>Secret</h1>
            <ResumeSection/>
        </MainLayout>
    );
};

export default Secret;
