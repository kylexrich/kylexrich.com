import React, {useCallback, useMemo} from 'react';
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
    useBoolean,
    useColorModeValue,
    useDisclosure
} from '@chakra-ui/react';
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
    const [showAllTags, {toggle: toggleTags, off: collapseTags}] = useBoolean(false);
    const COLLAPSED_CHAR_LIMIT = 48;

    const cardBg = useColorModeValue('white', 'gray.900');
    const cardHoverBg = useAccentColor({lightModeWeight: ColorWeight.W50, darkModeWeight: ColorWeight.W900});
    const cardBorder = useColorModeValue('blackAlpha.100', 'whiteAlpha.200');
    const previewColor = useColorModeValue('gray.600', 'gray.400');
    const tagBg = useAccentColor({lightModeWeight: ColorWeight.W100, darkModeWeight: ColorWeight.W700});
    const tagText = useAccentColor({lightModeWeight: ColorWeight.W700, darkModeWeight: ColorWeight.W100});
    const badgeBg = useAccentColor({lightModeWeight: ColorWeight.W200, darkModeWeight: ColorWeight.W600});
    const badgeText = useAccentColor({lightModeWeight: ColorWeight.W800, darkModeWeight: ColorWeight.W100});
    const overlayTint = useColorModeValue('blackAlpha.150', 'whiteAlpha.100');
    const focusOutline = useAccentColor({lightModeWeight: ColorWeight.W300, darkModeWeight: ColorWeight.W400});
    const {isOpen, onOpen, onClose} = useDisclosure();
    const timeframeBg = useColorModeValue('blackAlpha.50', 'whiteAlpha.100');
    const timeframeText = useColorModeValue('gray.700', 'gray.200');

    const {visibleTags, hiddenTagCount} = useMemo(() => {
        const collapsedVisibleTags: string[] = [];
        let characterTotal = 0;

        for (const tag of project.techTags) {
            const nextLength = tag.length;
            if (characterTotal + nextLength > COLLAPSED_CHAR_LIMIT) {
                break;
            }
            collapsedVisibleTags.push(tag);
            characterTotal += nextLength;
        }

        const collapsedHiddenCount = Math.max(project.techTags.length - collapsedVisibleTags.length, 0);

        return {
            visibleTags: showAllTags ? project.techTags : collapsedVisibleTags,
            hiddenTagCount: collapsedHiddenCount
        };
    }, [COLLAPSED_CHAR_LIMIT, project.techTags, showAllTags]);

    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onOpen();
        }
    }, [onOpen]);

    const handleMouseLeave = useCallback(() => {
        onLeave();
        collapseTags();
    }, [collapseTags, onLeave]);

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
                onMouseLeave={handleMouseLeave}
                _focusVisible={{boxShadow: `0 0 0 3px ${focusOutline}`}}
            >
                <Stack spacing={6} align="flex-start" p={{base: 5, md: 6}} h="full">
                    <Box position="relative" w="full">
                        <AspectRatio ratio={16 / 9} w="full" borderRadius="xl" overflow="hidden" borderWidth="1px" borderColor={cardBorder}>
                            <MotionImage
                                src={project.cover}
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
                            pointerEvents="none"
                        />
                    </Box>
                    <HStack spacing={3}>
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
                            bg={timeframeBg}
                            color={timeframeText}
                            borderWidth="1px"
                            borderColor={cardBorder}
                        >
                            {project.timeframe}
                        </Badge>
                    </HStack>
                    <Stack spacing={3} align="flex-start" w="full">
                        <Heading size="md" textAlign="left">
                            {project.title}
                        </Heading>
                        <Text textAlign="left" color={previewColor} noOfLines={3}>
                            {project.descriptionPreview}
                        </Text>
                    </Stack>
                    <HStack spacing={2} flexWrap="wrap">
                        {visibleTags.map((tag) => (
                            <Tag key={`${project.id}-${tag}`} bg={tagBg} color={tagText} px={3} py={1.5} borderRadius="full">
                                {tag}
                            </Tag>
                        ))}
                        {hiddenTagCount > 0 && (
                            <Button
                                size="sm"
                                borderRadius="full"
                                px={3}
                                py={1.5}
                                variant="ghost"
                                bg={showAllTags ? 'transparent' : tagBg}
                                color={tagText}
                                borderWidth={showAllTags ? '1px' : 0}
                                borderColor={cardBorder}
                                _hover={{bg: showAllTags ? tagBg : tagBg}}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    toggleTags();
                                }}
                                onKeyDown={(event) => event.stopPropagation()}
                                onMouseDown={(event) => event.stopPropagation()}
                                aria-expanded={showAllTags}
                                aria-label={showAllTags ? 'Show fewer tags' : `Show ${hiddenTagCount} more tags`}
                            >
                                {showAllTags ? 'Show less' : `+${hiddenTagCount} more`}
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
