import React from 'react';
import { VStack } from '@chakra-ui/react';
import { educationDetails } from '../../../config/about/educationDetails';
import AboutSection from './organisms/AboutSection';
import { careerDetails } from '../../../config/about/careerDetails';
import { extracurricularDetails } from '../../../config/about/extracurricularDetails';

export interface AboutProps {}

const About: React.FC<AboutProps> = () => {
    return (
        <VStack spacing={8} align="start">
            <AboutSection headerText="Career 🛠️" details={careerDetails} />
            <AboutSection headerText="Education 🎓" details={educationDetails} />
            <AboutSection headerText="Extracurriculars 🎭" details={extracurricularDetails} />
        </VStack>
    );
};

export default About;
