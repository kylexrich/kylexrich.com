import React from 'react';
import { Box, Flex, Heading, Stack, Tag, Text, useColorModeValue } from '@chakra-ui/react';
import AboutCardImage from './AboutCardImage';
import { AboutCardDetail } from '../../../../config/about/AboutCardDetail';
import { AboutCardThemeProps } from './AboutCard';

import SkillTags from './SkillTags';
import { ColorWeight, useAccentColor } from '../../../../theme/accentColor';

const CardTag: React.FC<{ color: string; borderColor: string; text: string }> = ({ color, borderColor, text }) => (
    <Tag size='sm' borderRadius='md' px={2} py={1} bg='transparent' border='1px solid' borderColor={borderColor} color={color}>
        {text}
    </Tag>
);

const DateText: React.FC<{ dateText: string; subTextColor: string }> = ({ dateText, subTextColor }) => (
    <Text fontSize='sm' color={subTextColor} w={'142px'}>
        {dateText}
    </Text>
);

export interface CardContentProps extends AboutCardDetail, AboutCardThemeProps {
    hasModal: boolean;
    isHovered: boolean;
    // empty
}

const AboutCardContent: React.FC<CardContentProps> = (props) => {
    const titleColor = useAccentColor();

    return (
        <>
            <Flex justifyContent='space-between' alignItems='flex-start'>
                <Flex>
                    <AboutCardImage logoRef={useColorModeValue(props.imageRefs.light, props.imageRefs.dark)} title={props.title} />
                    <Stack spacing={2} pl={3} align='left'>
                        <Heading textAlign='left' fontSize='xl' color={props.isHovered && props.hasModal ? titleColor : props.textColor}>
                            {props.title}
                        </Heading>
                        {props.subtitle && (
                            <Text textAlign='left' fontSize='sm' color={props.subTextColor}>
                                {props.subtitle}
                            </Text>
                        )}
                        <Text fontSize='sm' align='left' color={props.subTextColor} mt={1} mb={2} display={{ base: 'none', md: 'block' }}>
                            {props.shortDescription}
                        </Text>
                    </Stack>
                </Flex>
                <Stack display={{ base: 'none', md: 'flex' }} direction='row' spacing={3} alignItems='center'>
                    {props.type && (
                        <>
                            <CardTag color={props.textColor} borderColor={props.skillColor} text={props.type} />
                            <Box height='15px' width='1px' bg={props.subTextColor} my={1}></Box>
                        </>
                    )}
                    <DateText dateText={props.dateText} subTextColor={props.subTextColor} />
                </Stack>
            </Flex>
            <Stack mt={1} display={{ base: 'flex', md: 'none' }} direction='row' spacing={3} alignItems='center'>
                <DateText dateText={props.dateText} subTextColor={props.subTextColor} />
                {props.type && (
                    <>
                        <Box height='15px' width='1px' bg={props.subTextColor} my={1}></Box>
                        <CardTag color={props.textColor} borderColor={props.skillColor} text={props.type} />
                    </>
                )}
            </Stack>
            <SkillTags skills={props.skills} skillColor={props.skillColor} textColor={props.textColor} subTextColor={props.subTextColor} />
        </>
    );
};

export default AboutCardContent;
