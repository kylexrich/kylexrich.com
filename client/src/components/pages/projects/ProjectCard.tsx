import React, {useCallback} from 'react';
import {
    AspectRatio,
    Badge,
    Box,
    Button,
    Heading,
    HStack,
    Stack,
    Tag,
    Text,
    Wrap,
    WrapItem,
    useBoolean,
    useColorModeValue,
    useDisclosure
} from '@chakra-ui/react';
import {HiArrowLongRight, HiArrowTopRightOnSquare} from 'react-icons/hi2';
import {ColorWeight, useAccentColor} from '../../../theme/accentColor.ts';
import {MotionBox, MotionImage} from '../../shared/MotionComponents.tsx';
import {Project} from '../../../config/projects/projectData.ts';
import ProjectDetailsModal from './ProjectDetailsModal.tsx';

export interface ProjectCardProps {
    project: Project;
    variants?: Record<string, unknown>;
}

const ProjectCard: React.FC<ProjectCardProps> = ({project, variants}) => {
    const [isHovered, {on: onHover, off: onLeave}] = useBoolean(false);

    const cardBg = useColorModeValue('white', 'gray.900');
    const cardHoverBg = useAccentColor({lightModeWeight: ColorWeight.W50, darkModeWeight: ColorWeight.W900});
    const cardBorder = useColorModeValue('blackAlpha.100', 'whiteAlpha.200');
    const summaryColor = useColorModeValue('gray.600', 'gray.400');
    const hintColor = useColorModeValue('gray.500', 'gray.300');
    const tagBg = useAccentColor({lightModeWeight: ColorWeight.W100, darkModeWeight: ColorWeight.W700});
    const tagText = useAccentColor({lightModeWeight: ColorWeight.W700, darkModeWeight: ColorWeight.W100});
    const badgeBg = useAccentColor({lightModeWeight: ColorWeight.W200, darkModeWeight: ColorWeight.W600});
    const badgeText = useAccentColor({lightModeWeight: ColorWeight.W800, darkModeWeight: ColorWeight.W100});
    const overlayTint = useColorModeValue('blackAlpha.150', 'whiteAlpha.100');
    const focusOutline = useAccentColor({lightModeWeight: ColorWeight.W300, darkModeWeight: ColorWeight.W400});
    const {isOpen, onOpen, onClose} = useDisclosure();

    const primaryLink = project.links[0];

    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onOpen();
        }
    }, [onOpen]);

    return (
        <>
            <MotionBox
                variants={variants}
                whileHover={{translateY: -8}}
                transition={{type: 'spring', stiffness: 140, damping: 16}}
                borderRadius="2xl"
                borderWidth="1px"
                borderColor={cardBorder}
                bg={isHovered ? cardHoverBg : cardBg}
                overflow="hidden"
                boxShadow={isHovered ? 'xl' : 'lg'}
                cursor="pointer"
                role="button"
                tabIndex={0}
                aria-label={`Open project details for ${project.title}`}
                onClick={onOpen}
                onKeyDown={handleKeyDown}
                onMouseEnter={onHover}
                onMouseLeave={onLeave}
                _focusVisible={{boxShadow: `0 0 0 3px ${focusOutline}`}}
            >
                <Stack spacing={6} align="flex-start" p={{base: 5, md: 6}}>
                    <Box position="relative" w="full">
                        <AspectRatio ratio={16 / 9} w="full" borderRadius="xl" overflow="hidden" borderWidth="1px" borderColor={cardBorder}>
                            <MotionImage
                                src={project.image}
                                alt={project.title}
                                objectFit="cover"
                                w="full"
                                h="full"
                                whileHover={{scale: 1.04}}
                                transition={{duration: 0.4}}
                            />
                        </AspectRatio>
                        <Box
                            position="absolute"
                            inset={0}
                            bg={isHovered ? overlayTint : 'transparent'}
                            transition="background-color 0.2s ease"
                        />
                        <Badge
                            px={3}
                            py={1}
                            borderRadius="full"
                            fontWeight="600"
                            bg={badgeBg}
                            color={badgeText}
                            position="absolute"
                            top={4}
                            left={4}
                            boxShadow="md"
                        >
                            {project.timeframe}
                        </Badge>
                    </Box>
                    <Stack spacing={3} align="flex-start" w="full">
                        <Heading size="md" textAlign="left">
                            {project.title}
                        </Heading>
                        <Text textAlign="left" color={summaryColor}>
                            {project.summary}
                        </Text>
                    </Stack>
                    <Wrap spacing={2} shouldWrapChildren>
                        {project.tags.map((tag) => (
                            <WrapItem key={`${project.id}-${tag}`}>
                                <Tag bg={tagBg} color={tagText} px={3} py={1.5} borderRadius="full">
                                    {tag}
                                </Tag>
                            </WrapItem>
                        ))}
                    </Wrap>
                    <HStack w="full" justify="space-between" align="center">
                        <HStack spacing={2} color={hintColor} fontWeight="600">
                            <Text>Open project story</Text>
                            <HiArrowLongRight/>
                        </HStack>
                        {primaryLink && (
                            <Button
                                as="a"
                                href={primaryLink.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                rightIcon={<HiArrowTopRightOnSquare/>}
                                variant="ghost"
                                borderRadius="full"
                                fontWeight="600"
                                colorScheme="gray"
                                onClick={(event) => event.stopPropagation()}
                            >
                                {primaryLink.label}
                            </Button>
                        )}
                    </HStack>
                </Stack>
            </MotionBox>
            <ProjectDetailsModal project={project} isOpen={isOpen} onClose={onClose}/>
        </>
    );
};

export default ProjectCard;
