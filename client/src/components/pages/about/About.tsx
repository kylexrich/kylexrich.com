import React from 'react';
import { educationDetails } from '../../../config/about/educationDetails';
import AboutSection, { ABOUT_DISPLAY_MAX_ITEMS } from './organisms/AboutSection';
import { careerDetails } from '../../../config/about/careerDetails';
import { extracurricularDetails } from '../../../config/about/extracurricularDetails';
import MainLayout from '../../app/layout/MainLayout';
import { MotionVStack } from '../../shared/MotionComponents';
import { MotionDuration } from '../../shared/variants';

const parentVariants = {
    initial: { opacity: 0, y: -40 },
    enter: {
        y: 0,
        opacity: 1,
        transition: {
            staggerChildren: MotionDuration.MEDIUM
        }
    }
};

export interface AboutProps {}

const About: React.FC<AboutProps> = () => {
    return (
        <MainLayout>
            <MotionVStack spacing={8} align="start" variants={parentVariants}>
                <AboutSection headerText="Career 🛠️" details={careerDetails} />
                <AboutSection headerText="Education 🎓" details={educationDetails} />
                <AboutSection headerText="Extracurriculars 🎭" details={extracurricularDetails} />
            </MotionVStack>
        </MainLayout>
    );
};

export default About;
