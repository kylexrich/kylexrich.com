import React from 'react';
import {
    Badge,
    Box,
    HStack,
    Link,
    List,
    ListIcon,
    ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    SimpleGrid,
    Stack,
    Tag,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import {FiCheckCircle} from 'react-icons/fi';
import {HiArrowTopRightOnSquare} from 'react-icons/hi2';
import {Project} from '../../../config/projects/projectData.ts';
import {ColorWeight, useAccentColor} from '../../../theme/accentColor.ts';

export interface ProjectDetailsModalProps {
    project: Project;
    isOpen: boolean;
    onClose: () => void;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({project, isOpen, onClose}) => {
    const badgeBg = useAccentColor({lightModeWeight: ColorWeight.W200, darkModeWeight: ColorWeight.W600});
    const badgeText = useAccentColor({lightModeWeight: ColorWeight.W800, darkModeWeight: ColorWeight.W100});
    const metricBg = useColorModeValue('gray.50', 'whiteAlpha.100');
    const modalBg = useColorModeValue('white', 'gray.900');
    const borderColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.200');
    const secondaryText = useColorModeValue('gray.600', 'gray.300');
    const tagBg = useAccentColor({lightModeWeight: ColorWeight.W100, darkModeWeight: ColorWeight.W700});
    const tagText = useAccentColor({lightModeWeight: ColorWeight.W700, darkModeWeight: ColorWeight.W100});

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" motionPreset="slideInBottom">
            <ModalOverlay backdropFilter="blur(4px)"/>
            <ModalContent bg={modalBg} borderRadius="2xl" borderWidth="1px" borderColor={borderColor}>
                <ModalHeader>
                    <Stack align="flex-start" spacing={3}>
                        <Badge
                            px={3}
                            py={1}
                            borderRadius="full"
                            fontWeight="600"
                            bg={badgeBg}
                            color={badgeText}
                        >
                            {project.timeframe}
                        </Badge>
                        <Text as="h2" fontSize="2xl" fontWeight="700">
                            {project.title}
                        </Text>
                        <Text color={secondaryText}>{project.summary}</Text>
                    </Stack>
                </ModalHeader>
                <ModalCloseButton/>
                <ModalBody pb={8}>
                    <Stack spacing={6} align="flex-start">
                        <Text textAlign="left">{project.description}</Text>
                        <List spacing={2} textAlign="left" w="full">
                            {project.contributions.map((item) => (
                                <ListItem key={item} display="flex" alignItems="flex-start">
                                    <ListIcon as={FiCheckCircle} color={badgeText} mt={1}/>
                                    <Text>{item}</Text>
                                </ListItem>
                            ))}
                        </List>
                        <SimpleGrid columns={{base: 1, md: 2}} spacing={4} w="full">
                            {project.metrics.map((metric) => (
                                <Box
                                    key={`${project.id}-${metric.label}`}
                                    bg={metricBg}
                                    borderRadius="lg"
                                    px={4}
                                    py={3}
                                    borderWidth="1px"
                                    borderColor={borderColor}
                                    textAlign="left"
                                >
                                    <Text fontSize="sm" textTransform="uppercase" fontWeight="600" color={secondaryText}>
                                        {metric.label}
                                    </Text>
                                    <Text fontWeight="600">{metric.value}</Text>
                                </Box>
                            ))}
                        </SimpleGrid>
                        <HStack spacing={3} flexWrap="wrap">
                            {project.tags.map((tag) => (
                                <Tag key={`${project.id}-${tag}`} bg={tagBg} color={tagText} px={3} py={1.5} borderRadius="full">
                                    {tag}
                                </Tag>
                            ))}
                        </HStack>
                        <HStack spacing={4} flexWrap="wrap">
                            {project.links.map((link) => (
                                <Link
                                    key={`${project.id}-${link.label}`}
                                    href={link.url}
                                    isExternal
                                    fontWeight="600"
                                    display="inline-flex"
                                    alignItems="center"
                                    gap={2}
                                >
                                    {link.label}
                                    <HiArrowTopRightOnSquare/>
                                </Link>
                            ))}
                        </HStack>
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ProjectDetailsModal;
