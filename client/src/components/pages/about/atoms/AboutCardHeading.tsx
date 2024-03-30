import React from 'react';
import { Heading } from '@chakra-ui/react';

type AboutCardHeadingProps = {
    title: string;
    textColor: string;
};

const AboutCardHeading: React.FC<AboutCardHeadingProps> = ({ title, textColor }) => {
    return (
        <Heading textAlign="left" fontSize="xl" color={textColor}>
            {title}
        </Heading>
    );
};

export default AboutCardHeading;
