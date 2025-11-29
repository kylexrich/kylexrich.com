import React from 'react';
import {careerDetails} from '../../../config/about/careerDetails.ts';
import {MotionDuration} from '../../shared/variants.tsx';
import MainLayout from '../../app/layout/MainLayout.tsx';
import {MotionVStack} from '../../shared/MotionComponents.tsx';
import AboutSection from './organisms/AboutSection.tsx';
import {educationDetails} from '../../../config/about/educationDetails.ts';
import {extracurricularDetails} from '../../../config/about/extracurricularDetails.ts';

const parentVariants = {
    initial: {opacity: 0, y: -40},
    enter: {
        y: 0,
        opacity: 1,
        transition: {
            staggerChildren: MotionDuration.MEDIUM
        }
    }
};

export interface AboutProps {
}

const About: React.FC<AboutProps> = () => {
    return (
        <MainLayout>
            <MotionVStack spacing={8} align="start" variants={parentVariants}>
                <AboutSection headerText="Career 💼" details={careerDetails}/>
                <AboutSection headerText="Education 🎓" details={educationDetails}/>
                <AboutSection headerText="Extracurriculars 🎭" details={extracurricularDetails}/>
            </MotionVStack>
        </MainLayout>
    );
};

export default About;
