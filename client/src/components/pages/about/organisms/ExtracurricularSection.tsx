import React from 'react';
import AboutSection from './AboutSection';
import { extracurricularDetails } from '../../../../config/about/extracurricularDetails';
import ExtracurricularCard from './ExtracurricularCard';

const CareerSection: React.FC = () => {
    return (
        <AboutSection
            headerText="Extracurriculars"
            emoji="🎭"
            details={extracurricularDetails}
            cardComponent={ExtracurricularCard}
        />
    );
};

export default CareerSection;
