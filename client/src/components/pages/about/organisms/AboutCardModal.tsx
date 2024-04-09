import React from 'react';
import {
    Box,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import AboutCardImage from './AboutCardImage';
import { AboutCardDetail } from '../../../../config/about/AboutCardDetail';
import { AboutCardThemeProps } from './AboutCard';
import SkillTags from './SkillTags';

export interface CardModalProps extends AboutCardDetail, AboutCardThemeProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalContentComponent: React.FC<CardModalProps> = (props) => {
    const paragraphs = props.longDescriptionParagraphs;

    return (
        <ModalContent borderRadius={{ base: '0', md: '2xl' }} boxShadow='xl' m={{ base: 0, md: 4 }}>
            <ModalHeader fontSize={{ base: 'xl', md: '2xl' }} fontWeight='bold' borderBottomWidth='1px' pb={2}>
                {props.title}
            </ModalHeader>
            <ModalCloseButton size={{ base: 'xl', md: 'md' }} m={3} />
            <ModalBody p={{ base: 4, md: 6 }}>
                <Flex direction='column' justifyContent='center' alignItems='center'>
                    <Box boxShadow='lg' p={2} bg={props.textColor} borderRadius='full'>
                        <AboutCardImage
                            logoRef={useColorModeValue(props.imageRefs.light, props.imageRefs.dark)}
                            title={props.title}
                            size={{ height: { base: '24', md: '32' }, width: { base: '24', md: '32' } }}
                        />
                    </Box>
                    {paragraphs?.map((paragraph, index) => (
                        <Text
                            key={index}
                            fontSize={{ base: 'md', md: 'lg' }}
                            mt={
                                index === 0
                                    ? 4 // For the first paragraph
                                    : index === paragraphs.length - 1
                                    ? 2 // For the last paragraph
                                    : 2 // For all middle paragraphs
                            }
                            mb={
                                index === 0
                                    ? 2 // For the first paragraph
                                    : index === paragraphs.length - 1
                                    ? 4 // For the last paragraph
                                    : 2 // For all middle paragraphs
                            }
                            textAlign='left'
                        >
                            {paragraph}
                        </Text>
                    ))}
                    <Flex direction='column' w='100%' alignItems='flex-start'>
                        <Text fontWeight='bold' fontSize={{ base: 'lg', md: 'xl' }}>
                            {props.title}
                        </Text>
                        {props.subtitle && (
                            <Text fontSize={{ base: 'md', md: 'lg' }} color={props.subTextColor} fontStyle='italic'>
                                {props.subtitle}
                            </Text>
                        )}
                        <SkillTags
                            skills={props.skills}
                            skillColor={props.skillColor}
                            textColor={props.textColor}
                            subTextColor={props.subTextColor}
                        />
                    </Flex>
                </Flex>
            </ModalBody>
        </ModalContent>
    );
};

const AboutCardModal: React.FC<CardModalProps> = (props) => (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size={{ base: 'full', md: 'xl' }} closeOnOverlayClick>
        <ModalOverlay />
        <ModalContentComponent {...props} />
    </Modal>
);

export default AboutCardModal;
