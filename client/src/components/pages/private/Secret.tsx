import React from 'react';
import ResumeSection from '../about/organisms/ResumeSection';
import PageLayout from '../../app/layout/PageLayout';

type SecretProps = {};

const Secret: React.FC<SecretProps> = (props) => {
    return (
        <PageLayout>
            <h1>Secret</h1>
            <ResumeSection />
        </PageLayout>
    );
};

export default Secret;
