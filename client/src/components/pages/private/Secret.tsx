import React from 'react';
import ResumeSection from './ResumeSection';
import MainLayout from '../../app/layout/MainLayout';

export interface SecretProps {
    // empty
}

const Secret: React.FC<SecretProps> = (props) => {
    return (
        <MainLayout>
            <h1>Secret</h1>
            <ResumeSection />
        </MainLayout>
    );
};

export default Secret;
