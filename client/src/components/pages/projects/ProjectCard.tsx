import React from 'react';
import {
    AspectRatio,
    Badge,
    Button,
    Heading,
    HStack,
    Stack,
    Tag,
    Text,
    useColorModeValue,
    useDisclosure
} from '@chakra-ui/react';
import {HiArrowTopRightOnSquare} from 'react-icons/hi2';
import {ColorWeight, useAccentColor} from '../../../theme/accentColor.ts';
import {MotionBox, MotionImage} from '../../shared/MotionComponents.tsx';
import {Project} from '../../../config/projects/projectData.ts';
import ProjectDetailsModal from './ProjectDetailsModal.tsx';

export interface ProjectCardProps {
    project: Project;
    variants?: Record<string, unknown>;
}

const ProjectCard: React.FC<ProjectCardProps> = ({project, variants}) => {
    const cardBg = useColorModeValue('white', 'gray.900');
    const cardBorder = useColorModeValue('blackAlpha.100', 'whiteAlpha.200');
    const summaryColor = useColorModeValue('gray.600', 'gray.400');
    const tagBg = useAccentColor({lightModeWeight: ColorWeight.W100, darkModeWeight: ColorWeight.W700});
    const tagText = useAccentColor({lightModeWeight: ColorWeight.W700, darkModeWeight: ColorWeight.W100});
    const badgeBg = useAccentColor({lightModeWeight: ColorWeight.W200, darkModeWeight: ColorWeight.W600});
    const badgeText = useAccentColor({lightModeWeight: ColorWeight.W800, darkModeWeight: ColorWeight.W100});
    const ctaBg = useAccentColor({lightModeWeight: ColorWeight.W600, darkModeWeight: ColorWeight.W500});
    const ctaHoverBg = useAccentColor({lightModeWeight: ColorWeight.W700, darkModeWeight: ColorWeight.W400});
    const ctaText = useColorModeValue('white', 'gray.900');
    const {isOpen, onOpen, onClose} = useDisclosure();

    const primaryLink = project.links[0];

    return (
        <>
            <MotionBox
                variants={variants}
                whileHover={{translateY: -6}}
                transition={{type: 'spring', stiffness: 120, damping: 18}}
                borderRadius="2xl"
                borderWidth="1px"
                borderColor={cardBorder}
                bg={cardBg}
                overflow="hidden"
            >
                <Stack spacing={6} align="flex-start" p={{base: 5, md: 6}}>
                    <AspectRatio ratio={16 / 9} w="full" borderRadius="xl" overflow="hidden" borderWidth="1px" borderColor={cardBorder}>
                        <MotionImage
                            src={project.image}
                            alt={project.title}
                            objectFit="cover"
                            w="full"
                            h="full"
                        />
                    </AspectRatio>
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
                    <Stack spacing={3} align="flex-start" w="full">
                        <Heading size="md" textAlign="left">
                            {project.title}
                        </Heading>
                        <Text textAlign="left" color={summaryColor}>
                            {project.summary}
                        </Text>
                    </Stack>
                    <HStack spacing={2} flexWrap="wrap">
                        {project.tags.map((tag) => (
                            <Tag key={`${project.id}-${tag}`} bg={tagBg} color={tagText} px={3} py={1.5} borderRadius="full">
                                {tag}
                            </Tag>
                        ))}
                    </HStack>
                    <Stack direction={{base: 'column', md: 'row'}} spacing={3} w="full">
                        <Button
                            onClick={onOpen}
                            bg={ctaBg}
                            color={ctaText}
                            _hover={{bg: ctaHoverBg}}
                            borderRadius="full"
                            fontWeight="600"
                            flex={1}
                        >
                            View details
                        </Button>
                        {primaryLink && (
                            <Button
                                as="a"
                                href={primaryLink.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                rightIcon={<HiArrowTopRightOnSquare/>}
                                variant="outline"
                                borderRadius="full"
                                fontWeight="600"
                            >
                                {primaryLink.label}
                            </Button>
                        )}
                    </Stack>
                </Stack>
            </MotionBox>
            <ProjectDetailsModal project={project} isOpen={isOpen} onClose={onClose}/>
        </>
    );
};

export default ProjectCard;
