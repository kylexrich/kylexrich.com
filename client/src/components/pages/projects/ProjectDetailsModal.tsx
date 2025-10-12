import React from 'react';
import {
    AspectRatio,
    Badge,
    Box,
    Button,
    ButtonGroup,
    Divider,
    Heading,
    Image,
    Link,
    List,
    ListIcon,
    ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    SimpleGrid,
    Stack,
    Tag,
    Text,
    Wrap,
    WrapItem,
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
    const modalBg = useColorModeValue('white', 'gray.900');
    const borderColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.200');
    const sectionBg = useColorModeValue('gray.50', 'whiteAlpha.100');
    const secondaryText = useColorModeValue('gray.600', 'gray.300');
    const tagBg = useAccentColor({lightModeWeight: ColorWeight.W100, darkModeWeight: ColorWeight.W700});
    const tagText = useAccentColor({lightModeWeight: ColorWeight.W700, darkModeWeight: ColorWeight.W100});
    const accentSolidBg = useAccentColor({lightModeWeight: ColorWeight.W600, darkModeWeight: ColorWeight.W400});
    const accentSolidHover = useAccentColor({lightModeWeight: ColorWeight.W700, darkModeWeight: ColorWeight.W300});
    const accentSolidText = useColorModeValue('white', 'gray.900');

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="3xl"
            isCentered
            scrollBehavior="inside"
            motionPreset="slideInBottom"
        >
            <ModalOverlay bg="rgba(8, 12, 22, 0.65)" backdropFilter="blur(8px)"/>
            <ModalContent
                bg={modalBg}
                borderRadius="3xl"
                borderWidth="1px"
                borderColor={borderColor}
                boxShadow="2xl"
            >
                <ModalHeader px={{base: 5, md: 7}} pt={{base: 6, md: 8}} pb={0}>
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
                        <Heading size="lg">{project.title}</Heading>
                        <Text color={secondaryText}>{project.summary}</Text>
                    </Stack>
                </ModalHeader>
                <ModalCloseButton top={{base: 4, md: 5}} right={{base: 4, md: 5}} size="lg"/>
                <ModalBody px={{base: 5, md: 7}} pt={6} pb={{base: 6, md: 8}}>
                    <Stack spacing={6} align="flex-start" w="full">
                        <Box
                            w="full"
                            borderRadius="2xl"
                            overflow="hidden"
                            borderWidth="1px"
                            borderColor={borderColor}
                            boxShadow="md"
                        >
                            <AspectRatio ratio={16 / 9} w="full">
                                <Image src={project.image} alt={project.title} objectFit="cover" w="full" h="full"/>
                            </AspectRatio>
                        </Box>
                        <Text textAlign="left">{project.description}</Text>
                        <Box bg={sectionBg} borderRadius="2xl" borderWidth="1px" borderColor={borderColor} w="full" p={{base: 5, md: 6}}>
                            <Stack spacing={4} align="flex-start">
                                <Text fontSize="sm" textTransform="uppercase" fontWeight="600" color={secondaryText}>
                                    Key contributions
                                </Text>
                                <List spacing={3} textAlign="left" w="full">
                                    {project.contributions.map((item) => (
                                        <ListItem key={item} display="flex" alignItems="flex-start" gap={3}>
                                            <ListIcon as={FiCheckCircle} color={badgeText} mt={1}/>
                                            <Text>{item}</Text>
                                        </ListItem>
                                    ))}
                                </List>
                            </Stack>
                        </Box>
                        <Stack spacing={4} w="full">
                            <Text fontSize="sm" textTransform="uppercase" fontWeight="600" color={secondaryText}>
                                Snapshot
                            </Text>
                            <SimpleGrid columns={{base: 1, md: 2}} spacing={4} w="full">
                                {project.metrics.map((metric) => (
                                    <Box
                                        key={`${project.id}-${metric.label}`}
                                        borderRadius="xl"
                                        px={5}
                                        py={4}
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
                        </Stack>
                        <Divider borderColor={borderColor}/>
                        <Stack spacing={4} w="full">
                            <Text fontSize="sm" textTransform="uppercase" fontWeight="600" color={secondaryText}>
                                Capabilities
                            </Text>
                            <Wrap spacing={2} shouldWrapChildren>
                                {project.tags.map((tag) => (
                                    <WrapItem key={`${project.id}-${tag}`}>
                                        <Tag bg={tagBg} color={tagText} px={3} py={1.5} borderRadius="full">
                                            {tag}
                                        </Tag>
                                    </WrapItem>
                                ))}
                            </Wrap>
                        </Stack>
                    </Stack>
                </ModalBody>
                <ModalFooter px={{base: 5, md: 7}} pb={{base: 6, md: 8}} pt={0}>
                    <ButtonGroup spacing={3} flexWrap="wrap" w="full" justifyContent="flex-start">
                        {project.links.map((link, index) => (
                            <Button
                                key={`${project.id}-${link.label}`}
                                as={Link}
                                href={link.url}
                                isExternal
                                rightIcon={<HiArrowTopRightOnSquare/>}
                                borderRadius="full"
                                fontWeight="600"
                                bg={index === 0 ? accentSolidBg : 'transparent'}
                                color={index === 0 ? accentSolidText : badgeText}
                                borderWidth={index === 0 ? 0 : 1}
                                borderColor={index === 0 ? 'transparent' : borderColor}
                                px={index === 0 ? 6 : 5}
                                py={index === 0 ? 3 : 2.5}
                                _hover={{
                                    bg: index === 0 ? accentSolidHover : sectionBg,
                                    textDecoration: 'none'
                                }}
                            >
                                {link.label}
                            </Button>
                        ))}
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ProjectDetailsModal;
