import React from 'react';
import {Box, useBoolean, useColorModeValue, useDisclosure, useTheme} from '@chakra-ui/react';
import {ColorWeight, useAccentColor} from '../../../../theme/accentColor.ts';
import {AboutCardDetail} from '../../../../config/about/AboutCardDetail.ts';
import AboutCardContent from './AboutCardContent.tsx';
import AboutCardModal from './AboutCardModal.tsx';


export interface AboutCardThemeProps {
    textColor: string;
    subTextColor: string;
    skillColor: string;
}

export interface GenericAboutCardProps extends AboutCardDetail {
}

interface AboutTheme {
    about?: {
        aboutCard?: {
            textColor?: {
                light?: string;
                dark?: string;
            };
            bg?: {
                light?: string;
                dark?: string;
            };
        };
    };
}

const AboutCard: React.FC<GenericAboutCardProps> = ({
    imageRefs,
    title,
    subtitle,
    type,
    shortDescription,
    longDescriptionParagraphs,
    dateText,
    skills
}) => {
    const [isHovered, hoverState] = useBoolean(false);
    const {on: activateHover, off: deactivateHover} = hoverState;
    const hasModal = longDescriptionParagraphs && longDescriptionParagraphs.length > 0;

    const {isOpen, onOpen, onClose} = useDisclosure();
    const theme = useTheme<AboutTheme>();

    const textColor = useColorModeValue(
        theme.about?.aboutCard?.textColor?.light ?? 'gray.800',
        theme.about?.aboutCard?.textColor?.dark ?? 'gray.100'
    );
    const subTextColor = useColorModeValue(
        theme.about?.aboutCard?.textColor?.light ?? 'gray.700',
        theme.about?.aboutCard?.textColor?.dark ?? 'gray.200'
    );
    const skillColor = useAccentColor();

    const modalHoverBackground = useAccentColor({lightModeWeight: ColorWeight.W50, darkModeWeight: ColorWeight.W900});
    const nonModalBackground = useColorModeValue(
        theme.about?.aboutCard?.bg?.light ?? 'white',
        theme.about?.aboutCard?.bg?.dark ?? 'gray.900'
    );
    const cardBackground = hasModal && isHovered ? modalHoverBackground : nonModalBackground;

    return (
        <Box onClick={hasModal ? onOpen : undefined} cursor={hasModal ? 'pointer' : 'default'}>
            <Box
                px={4}
                py={5}
                borderWidth="1px"
                _hover={{shadow: 'lg'}}
                bg={cardBackground}
                position="relative"
                rounded="md"
                onMouseEnter={activateHover}
                onMouseLeave={deactivateHover}
            >
                <AboutCardContent
                    imageRefs={imageRefs}
                    title={title}
                    textColor={textColor}
                    subtitle={subtitle}
                    subTextColor={subTextColor}
                    shortDescription={shortDescription}
                    type={type}
                    skillColor={skillColor}
                    dateText={dateText}
                    skills={skills}
                    hasModal={hasModal ?? false}
                    isHovered={isHovered}
                />
            </Box>

            {hasModal && (
                <AboutCardModal
                    imageRefs={imageRefs}
                    title={title}
                    textColor={textColor}
                    subtitle={subtitle}
                    subTextColor={subTextColor}
                    shortDescription={shortDescription}
                    longDescriptionParagraphs={longDescriptionParagraphs}
                    skills={skills}
                    skillColor={skillColor}
                    isOpen={isOpen}
                    onClose={onClose}
                    dateText={dateText}
                    type={type}
                />
            )}
        </Box>
    );
};

export default AboutCard;
