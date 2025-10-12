import React from 'react';
import {
    Badge,
    Box,
    Heading,
    HStack,
    Link,
    List,
    ListIcon,
    ListItem,
    SimpleGrid,
    Stack,
    Tag,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import {FiCheckCircle} from 'react-icons/fi';
import {HiArrowTopRightOnSquare} from 'react-icons/hi2';
import {ColorWeight, useAccentColor} from '../../../theme/accentColor.ts';
import {MotionBox, MotionImage} from '../../shared/MotionComponents.tsx';
import {Project} from '../../../config/projects/projectData.ts';

export interface ProjectCardProps {
    project: Project;
    variants?: Record<string, unknown>;
}

const ProjectCard: React.FC<ProjectCardProps> = ({project, variants}) => {
    const cardBg = useColorModeValue('white', 'gray.800');
    const cardBorder = useColorModeValue('blackAlpha.100', 'whiteAlpha.200');
    const secondaryText = useColorModeValue('gray.600', 'gray.400');
    const tagBg = useAccentColor({lightModeWeight: ColorWeight.W100, darkModeWeight: ColorWeight.W700});
    const tagText = useAccentColor({lightModeWeight: ColorWeight.W700, darkModeWeight: ColorWeight.W100});
    const badgeBg = useAccentColor({lightModeWeight: ColorWeight.W200, darkModeWeight: ColorWeight.W600});
    const badgeText = useAccentColor({lightModeWeight: ColorWeight.W800, darkModeWeight: ColorWeight.W100});
    const metricBg = useColorModeValue('gray.50', 'whiteAlpha.100');

    return (
        <MotionBox
            variants={variants}
            whileHover={{translateY: -6}}
            transition={{type: 'spring', stiffness: 120, damping: 18}}
        >
            <Stack
                direction={{base: 'column', md: 'row'}}
                spacing={{base: 6, md: 8}}
                p={{base: 6, md: 8}}
                borderRadius="2xl"
                bg={cardBg}
                borderWidth="1px"
                borderColor={cardBorder}
                boxShadow="lg"
                align="stretch"
            >
                <Box flex={{base: 'initial', md: '0 0 320px'}}>
                    <MotionImage
                        src={project.image}
                        alt={project.title}
                        rounded="xl"
                        borderWidth="1px"
                        borderColor={cardBorder}
                        objectFit="cover"
                        w="full"
                        h="full"
                    />
                </Box>
                <Stack spacing={5} flex={1} align="flex-start">
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
                    <Stack spacing={3} align="flex-start">
                        <Heading size="lg" textAlign="left">
                            {project.title}
                        </Heading>
                        <Text fontSize="md" color={secondaryText} textAlign="left">
                            {project.summary}
                        </Text>
                        <Text textAlign="left">
                            {project.description}
                        </Text>
                    </Stack>
                    <List spacing={2} textAlign="left">
                        {project.contributions.map((item) => (
                            <ListItem key={item} display="flex" alignItems="flex-start">
                                <ListIcon as={FiCheckCircle} color={badgeText} mt={1}/>
                                <Text>{item}</Text>
                            </ListItem>
                        ))}
                    </List>
                    <SimpleGrid columns={{base: 1, md: 3}} spacing={4} w="full">
                        {project.metrics.map((metric) => (
                            <Box
                                key={`${project.id}-${metric.label}`}
                                bg={metricBg}
                                borderRadius="lg"
                                px={4}
                                py={3}
                                borderWidth="1px"
                                borderColor={cardBorder}
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
                            <Tag key={`${project.id}-${tag}`} bg={tagBg} color={tagText} px={3} py={2} borderRadius="full">
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
            </Stack>
        </MotionBox>
    );
};

export default ProjectCard;
