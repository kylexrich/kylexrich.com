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
    // empty
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
    const [isHovered, {on, off}] = useBoolean(false);
    const hasModal = longDescriptionParagraphs && longDescriptionParagraphs.length > 0;

    const {isOpen, onOpen, onClose} = useDisclosure();
    const {colors} = useTheme();

    const textColor = useColorModeValue(colors.about.aboutCard.textColor.light, colors.about.aboutCard.textColor.dark);
    const subTextColor = useColorModeValue(colors.about.aboutCard.textColor.light, colors.about.aboutCard.textColor.dark);
    const skillColor = useAccentColor();

    const modalHoverBg = useAccentColor({lightModeWeight: ColorWeight.W50, darkModeWeight: ColorWeight.W900});
    const nonModalBg = useColorModeValue(colors.about.aboutCard.bg.light, colors.about.aboutCard.bg.dark);
    const bg = hasModal && isHovered ? modalHoverBg : nonModalBg;

    return (<Box onClick={hasModal ? onOpen : undefined} cursor={hasModal ? 'pointer' : 'default'}>
        <Box
            px={4}
            py={5}
            borderWidth="1px"
            _hover={{shadow: 'lg'}}
            bg={bg}
            position="relative"
            rounded="md"
            onMouseEnter={on}
            onMouseLeave={off}
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

        {hasModal && (<AboutCardModal
            imageRefs={imageRefs}
            title={title}
            textColor={textColor}
            subtitle={subtitle}
            subTextColor={subTextColor}
            longDescriptionParagraphs={longDescriptionParagraphs}
            skills={skills}
            skillColor={skillColor}
            isOpen={isOpen}
            onClose={onClose}
            dateText={dateText}
        />)}
    </Box>);
};

export default AboutCard;
