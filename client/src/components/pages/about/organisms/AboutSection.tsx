import React, { useState } from 'react';
import UnderlinedEmojiHeader from '../../../shared/UnderlinedEmojiHeader';
import { Button, Flex, VStack } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { MotionBox } from '../../../shared/MotionComponents';
import { AboutCardDetail } from '../../../../config/about/AboutCardDetail';
import AboutCard from './AboutCard';

export interface AboutSectionProps {
    headerText: string;
    emoji: string;
    details: AboutCardDetail[];
}

const AboutSection: React.FC<AboutSectionProps> = ({ headerText, emoji, details }) => {
    const [showAll, setShowAll] = useState(false);
    const displayDetails = showAll ? details : details.slice(0, 3);

    return (
        <Flex flexDirection="column" alignItems="flex-start" width="100%">
            <UnderlinedEmojiHeader text={headerText} emoji={emoji} />
            <VStack spacing={4} marginBottom={6} align="left" mx={{ base: 0, md: 6 }} w={'100%'}>
                {displayDetails.map((detail, index) => (
                    <MotionBox whileHover={{ y: -5 }} key={index}>
                        <AboutCard {...detail} />
                    </MotionBox>
                ))}
            </VStack>
            {details.length > 3 && (
                <Flex width="100%" justifyContent="center">
                    <Button onClick={() => setShowAll(!showAll)}>
                        {showAll ? <ChevronUpIcon boxSize="6" /> : <ChevronDownIcon boxSize="6" />}
                    </Button>
                </Flex>
            )}
        </Flex>
    );
};

export default AboutSection;
