import React, { useState } from 'react';
import UnderlinedHeader from '../../../shared/UnderlinedHeader';
import { Button } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { MotionBox, MotionFlex, MotionVStack } from '../../../shared/MotionComponents';
import { AboutCardDetail } from '../../../../config/about/AboutCardDetail';
import AboutCard from './AboutCard';
import { PassThroughProps } from '../../../../util/types/PassThroughProps';
import { MotionDuration } from '../../../shared/variants';

export const ABOUT_DISPLAY_MAX_ITEMS = 3;

const parentVariants = {
    initial: { opacity: 0, y: -20 },
    enter: {
        y: 0,
        opacity: 1,
        transition: {
            staggerChildren: MotionDuration.FAST
        }
    }
};

const childVariants = {
    initial: { opacity: 0, y: -10 },
    enter: {
        opacity: 1,
        y: 0
    }
};

export interface AboutSectionProps extends PassThroughProps {
    headerText: string;
    details: AboutCardDetail[];
}

const AboutSection: React.FC<AboutSectionProps> = ({ headerText, details }) => {
    const [showAll, setShowAll] = useState(false);

    // Coudln't figure out why whileHover whileHover={{ y: -10 }} wasn't resetting to y: 0 while maintaining stagger children :( // TODO
    const [firstDetailsHover, setFirstDetailsHover] = useState<null | number>(null);
    const manualHover = (currentIndex: number | null, targetIndex: number) =>
        targetIndex === currentIndex ? { y: -5, opacity: 1 } : { y: 0, opacity: 1 };

    const shownDetails = details.slice(0, showAll ? details.length : ABOUT_DISPLAY_MAX_ITEMS);

    return (
        <MotionVStack align='left' width='100%' variants={parentVariants}>
            <UnderlinedHeader variants={childVariants} header={headerText} />
            <MotionVStack align='left' width='100%' spacing={4} mb={6} mx={{ base: 0, md: 6 }} variants={parentVariants}>
                {shownDetails.map((detail, index) => (
                    <MotionBox
                        key={index}
                        animate={manualHover(firstDetailsHover, index)}
                        onMouseEnter={() => setFirstDetailsHover(index)}
                        onMouseLeave={() => setFirstDetailsHover(null)}
                        variants={childVariants}
                    >
                        <AboutCard {...detail} />
                    </MotionBox>
                ))}
            </MotionVStack>
            {details.length > ABOUT_DISPLAY_MAX_ITEMS && (
                <MotionFlex width='100%' justify='center' variants={childVariants}>
                    <Button onClick={() => setShowAll(!showAll)}>
                        {showAll ? <ChevronUpIcon boxSize='6' /> : <ChevronDownIcon boxSize='6' />}
                    </Button>
                </MotionFlex>
            )}
        </MotionVStack>
    );
};

export default AboutSection;
