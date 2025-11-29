import React from 'react';
import {
    Box,
    Divider,
    Flex,
    Heading,
    Icon,
    List,
    ListIcon,
    ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Stack,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import {CheckCircleIcon, TimeIcon} from '@chakra-ui/icons';
import {AboutCardDetail} from '../../../../config/about/AboutCardDetail.ts';
import {AboutCardThemeProps} from './AboutCard.tsx';
import AboutCardImage from './AboutCardImage.tsx';
import SkillTags from './SkillTags.tsx';
import {ColorWeight, useAccentColor} from '../../../../theme/accentColor.ts';

export interface CardModalProps extends AboutCardDetail, AboutCardThemeProps {
    isOpen: boolean;
    onClose: () => void;
}

type ModalContentProps = AboutCardDetail & AboutCardThemeProps;

const SectionLabel: React.FC<{ text: string; color: string }> = ({text, color}) => (
    <Text textTransform="uppercase" letterSpacing="0.08em" fontSize="xs" fontWeight="bold" color={color}>
        {text}
    </Text>
);

const MetaPill: React.FC<{
    text: string;
    icon?: React.ElementType;
    background: string;
    color: string;
    borderColor: string;
}> = ({text, icon, background, color, borderColor}) => (
    <Flex
        align="center"
        gap={2}
        px={3}
        py={1.5}
        borderRadius="full"
        bg={background}
        color={color}
        borderWidth="1px"
        borderColor={borderColor}
        fontWeight="semibold"
        fontSize="sm"
    >
        {icon && <Icon as={icon} boxSize={4}/>}
        <Text>{text}</Text>
    </Flex>
);

const AboutModalContent: React.FC<ModalContentProps> = ({
    imageRefs,
    title,
    subtitle,
    shortDescription,
    longDescriptionParagraphs,
    dateText,
    skills,
    textColor,
    subTextColor,
    skillColor
}) => {
    const accentColor = useAccentColor({lightModeWeight: ColorWeight.W500, darkModeWeight: ColorWeight.W300});
    const softAccentColor = useAccentColor({lightModeWeight: ColorWeight.W100, darkModeWeight: ColorWeight.W800});
    const containerBackground = useColorModeValue('white', 'gray.900');
    const panelBackground = useColorModeValue('gray.50', 'gray.800');
    const labelColor = useColorModeValue('gray.600', 'gray.300');
    const borderColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.200');

    return (
        <ModalContent
            borderRadius={{base: 'none', md: '3xl'}}
            boxShadow="2xl"
            bg={containerBackground}
            overflow="hidden"
            borderWidth="1px"
            borderColor={borderColor}
        >
            <ModalCloseButton size="lg" top={4} right={4}/>
            <Box
                bgGradient={useColorModeValue(
                    `linear(to-br, ${softAccentColor}, ${containerBackground})`,
                    `linear(to-br, ${containerBackground}, ${softAccentColor})`
                )}
                px={{base: 5, md: 8}}
                py={{base: 6, md: 8}}
            >
                <Stack direction={{base: 'column', md: 'row'}} spacing={6} align="center">
                    <Box
                        bg={useColorModeValue('white', 'gray.700')}
                        borderWidth="1px"
                        borderColor={softAccentColor}
                        borderRadius="2xl"
                        p={3}
                    >
                        <AboutCardImage
                            logoRef={useColorModeValue(imageRefs.light, imageRefs.dark)}
                            title={title}
                            size={{height: {base: '28', md: '32'}, width: {base: '28', md: '32'}}}
                        />
                    </Box>
                    <Stack spacing={2} align={{base: 'center', md: 'flex-start'}} textAlign={{base: 'center', md: 'left'}}>
                        <Heading fontSize={{base: '2xl', md: '3xl'}} color={textColor} lineHeight="short">
                            {title}
                        </Heading>
                        {subtitle && (
                            <Text fontSize="md" color={subTextColor}>
                                {subtitle}
                            </Text>
                        )}
                        <Flex gap={3} wrap="wrap" justify={{base: 'center', md: 'flex-start'}}>
                            <MetaPill
                                text={dateText}
                                icon={TimeIcon}
                                background={panelBackground}
                                color={textColor}
                                borderColor={softAccentColor}
                            />
                        </Flex>
                    </Stack>
                </Stack>
            </Box>
            <Divider borderColor={useColorModeValue('gray.200', 'gray.700')}/>
            <ModalBody px={{base: 5, md: 8}} py={{base: 6, md: 8}} bg={panelBackground}>
                <Stack spacing={6}>
                    {shortDescription && (
                        <Stack spacing={2}>
                            <SectionLabel text="Description" color={labelColor}/>
                            <Text fontSize="lg" color={textColor} lineHeight="tall">
                                {shortDescription}
                            </Text>
                        </Stack>
                    )}
                    {longDescriptionParagraphs && longDescriptionParagraphs.length > 0 && (
                        <Stack spacing={3}>
                            <SectionLabel text="Highlights" color={labelColor}/>
                            <List spacing={3} color={textColor}>
                                {longDescriptionParagraphs.map((paragraph, index) => (
                                    <ListItem
                                        key={`${title}-paragraph-${index}`}
                                        display="flex"
                                        gap={3}
                                        alignItems="flex-start"
                                    >
                                        <ListIcon as={CheckCircleIcon} color={accentColor} mt={1}/>
                                        <Text lineHeight="tall">{paragraph}</Text>
                                    </ListItem>
                                ))}
                            </List>
                        </Stack>
                    )}
                    {skills && skills.length > 0 && (
                        <Stack spacing={3}>
                            <SectionLabel text="Tags" color={labelColor}/>
                            <SkillTags
                                skills={skills}
                                skillColor={skillColor}
                                textColor={textColor}
                                subTextColor={subTextColor}
                                marginTop={2}
                            />
                        </Stack>
                    )}
                </Stack>
            </ModalBody>
        </ModalContent>
    );
};

const AboutCardModal: React.FC<CardModalProps> = ({isOpen, onClose, ...contentProps}) => (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{base: 'full', md: '3xl'}}
        closeOnOverlayClick
        preserveScrollBarGap
        motionPreset="slideInBottom"
        isCentered
        scrollBehavior="inside"
    >
        <ModalOverlay backdropFilter="blur(8px)" bg="blackAlpha.600"/>
        <AboutModalContent {...contentProps} />
    </Modal>
);

export default AboutCardModal;
