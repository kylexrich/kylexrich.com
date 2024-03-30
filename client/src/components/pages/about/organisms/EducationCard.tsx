import React from 'react';
import { useColorModeValue } from '@chakra-ui/react';
import { EducationDetail } from '../../../../config/about/educationDetails';
import AboutCard from '../molecules/AboutCard';

type EducationCardProps = EducationDetail;

const EducationCard: React.FC<EducationCardProps> = ({
    title,
    subtitle,
    shortDescription,
    logoRef,
    skills,
    dateText
}) => {
    const textColor = useColorModeValue('gray.700', 'gray.300');
    const subTextColor = useColorModeValue('gray.500', 'gray.400');
    const skillColor = useColorModeValue('blue.200', 'blue.600');

    return (
        <AboutCard
            logoRef={logoRef}
            title={title}
            subtitle={subtitle}
            shortDescription={shortDescription}
            dateText={dateText}
            textColor={textColor}
            subTextColor={subTextColor}
            skillColor={skillColor}
            skills={skills}
            hasModal={false}
        />
    );
};

export default EducationCard;
