import React from 'react';
import { VStack } from '@chakra-ui/react';
import EducationSection from './organisms/EducationSection';
import CareerSection from './organisms/CareerSection';
import ExtracurricularSection from './organisms/ExtracurricularSection';
import PageLayout from '../../app/layout/PageLayout';

type AboutProps = {};

const About: React.FC<AboutProps> = () => {
    return (
        <PageLayout>
            <VStack spacing={8} align="start">
                <CareerSection />
                <EducationSection />
                <ExtracurricularSection />
            </VStack>
        </PageLayout>
    );
};

export default About;
