import React, {useEffect, useMemo, useState} from 'react';
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
    Stack,
    HStack,
    Tag,
    Text,
    Wrap,
    WrapItem,
    useColorModeValue
} from '@chakra-ui/react';
import {FiCheckCircle, FiPlay} from 'react-icons/fi';
import {HiArrowTopRightOnSquare} from 'react-icons/hi2';
import {Link as RouterLink} from 'react-router-dom';
import {Project, ProjectMedia} from '../../../config/projects/projectData.ts';
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
    const mutedBadgeBg = useColorModeValue('blackAlpha.50', 'whiteAlpha.100');
    const mutedBadgeText = useColorModeValue('gray.700', 'gray.200');

    const mediaItems = useMemo<[ProjectMedia, ...ProjectMedia[]]>(() => {
        const toTuple = (items: ProjectMedia[]): [ProjectMedia, ...ProjectMedia[]] | null => {
            if (items.length === 0) {
                return null;
            }
            const first = items[0];
            if (!first) {
                return null;
            }
            const rest = items.slice(1);
            return [first, ...rest];
        };

        const items = project.media?.filter((item): item is ProjectMedia => Boolean(item)) ?? [];
        const tuple = toTuple(items);

        if (tuple) {
            return tuple;
        }

        return [{type: 'image', src: project.cover, label: project.title}];
    }, [project]);

    const teamMembers = useMemo(() => project.team ?? [], [project.team]);

    const [activeMediaIndex, setActiveMediaIndex] = useState(0);

    useEffect(() => {
        setActiveMediaIndex(0);
    }, [project.id, isOpen]);

    const clampedIndex = Math.min(Math.max(activeMediaIndex, 0), mediaItems.length - 1);
    const activeMedia = mediaItems[clampedIndex] ?? mediaItems[0];
    if (!activeMedia) {
        return null;
    }

    const renderMedia = (media: ProjectMedia) => {
        if (media.type === 'video') {
            return (
                <AspectRatio ratio={16 / 9} w="full">
                    <Box
                        as="iframe"
                        src={media.src}
                        title={`${project.title} video`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        w="full"
                        h="full"
                    />
                </AspectRatio>
            );
        }

        return (
            <AspectRatio ratio={16 / 9} w="full">
                <Image src={media.src} alt={media.label ?? project.title} objectFit="cover" w="full" h="full"/>
            </AspectRatio>
        );
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="3xl"
            isCentered
            scrollBehavior="inside"
            motionPreset="slideInBottom"
            preserveScrollBarGap
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
                        <HStack spacing={3} flexWrap="wrap">
                            <Badge
                                px={3}
                                py={1}
                                borderRadius="full"
                                fontWeight="600"
                                bg={badgeBg}
                                color={badgeText}
                            >
                                {project.workType}
                            </Badge>
                            <Badge
                                px={3}
                                py={1}
                                borderRadius="full"
                                fontWeight="600"
                                bg={mutedBadgeBg}
                                color={mutedBadgeText}
                                borderWidth="1px"
                                borderColor={borderColor}
                            >
                                {project.timeframe}
                            </Badge>
                        </HStack>
                        <Heading size="lg">{project.title}</Heading>
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
                            {renderMedia(activeMedia)}
                        </Box>
                        {mediaItems.length > 1 && (
                            <Wrap spacing={2} shouldWrapChildren>
                                {mediaItems.map((item, index) => {
                                    const isActive = index === activeMediaIndex;
                                    return (
                                        <WrapItem key={`${project.id}-media-${index}`}>
                                            <Button
                                                variant="ghost"
                                                borderRadius="lg"
                                                borderWidth={isActive ? '2px' : '1px'}
                                                borderColor={isActive ? accentSolidBg : borderColor}
                                                bg={isActive ? sectionBg : 'transparent'}
                                                px={2}
                                                py={2}
                                                onClick={() => setActiveMediaIndex(index)}
                                            >
                                                {item.type === 'image' ? (
                                                    <Image
                                                        src={item.src}
                                                        alt={item.label ?? project.title}
                                                        boxSize="64px"
                                                        objectFit="cover"
                                                        borderRadius="md"
                                                    />
                                                ) : (
                                                    <HStack spacing={2}>
                                                        <FiPlay />
                                                        <Text>{item.label ?? 'Video'}</Text>
                                                    </HStack>
                                                )}
                                            </Button>
                                        </WrapItem>
                                    );
                                })}
                            </Wrap>
                        )}
                        <Box w="full">
                            <Stack spacing={1} align="flex-start">
                                <Text textAlign="left">{project.description}</Text>
                                {teamMembers.length > 0 && (
                                    <Text textAlign="left">
                                        <Text as="span" fontWeight="700">Team: </Text>
                                        {teamMembers.join(' · ')}
                                    </Text>
                                )}
                            </Stack>
                        </Box>
                        <Box bg={sectionBg} borderRadius="2xl" borderWidth="1px" borderColor={borderColor} w="full" p={{base: 5, md: 6}}>
                            <Stack spacing={4} align="flex-start">
                                <Text fontSize="sm" textTransform="uppercase" fontWeight="600" color={secondaryText}>
                                    Highlights
                                </Text>
                                <List spacing={3} textAlign="left" w="full">
                                    {project.highlights.map((item) => (
                                        <ListItem key={item} display="flex" alignItems="flex-start" gap={3}>
                                            <ListIcon as={FiCheckCircle} color={badgeText} mt={1}/>
                                            <Text>{item}</Text>
                                        </ListItem>
                                    ))}
                                </List>
                            </Stack>
                        </Box>
                        <Divider borderColor={borderColor}/>
                        <Stack spacing={4} w="full">
                            <Text fontSize="sm" textTransform="uppercase" fontWeight="600" color={secondaryText}>
                                Tags
                            </Text>
                            <Wrap spacing={2} shouldWrapChildren>
                                {project.techTags.map((tag) => (
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
                {project.links.length > 0 && (
                    <ModalFooter px={{base: 5, md: 7}} py={{base: 5, md: 6}}>
                        <ButtonGroup
                            spacing={3}
                            flexWrap="wrap"
                            w="full"
                            justifyContent="flex-start"
                            alignItems="center"
                        >
                            {project.links.map((link, index) => {
                                const isExternalLink = link.isExternal ?? true;

                                if (isExternalLink) {
                                    return (
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
                                                borderColor: index === 0 ? 'transparent' : accentSolidBg,
                                                color: index === 0 ? accentSolidText : accentSolidBg,
                                                textDecoration: 'none'
                                            }}
                                        >
                                            {link.label}
                                        </Button>
                                    );
                                }

                                return (
                                    <Button
                                        key={`${project.id}-${link.label}`}
                                        as={RouterLink}
                                        to={link.url}
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
                                            borderColor: index === 0 ? 'transparent' : accentSolidBg,
                                            color: index === 0 ? accentSolidText : accentSolidBg,
                                            textDecoration: 'none'
                                        }}
                                    >
                                        {link.label}
                                    </Button>
                                );
                            })}
                        </ButtonGroup>
                    </ModalFooter>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ProjectDetailsModal;
