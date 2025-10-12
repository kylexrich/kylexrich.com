import React, {useMemo, useState} from 'react';
import {Box, SimpleGrid, Text} from '@chakra-ui/react';
import MainLayout from '../../app/layout/MainLayout.tsx';
import {MotionVStack} from '../../shared/MotionComponents.tsx';
import {MotionDuration} from '../../shared/variants.tsx';
import UnderlinedHeader from '../../shared/UnderlinedHeader.tsx';
import ProjectTagFilter from './ProjectTagFilter.tsx';
import ProjectCard from './ProjectCard.tsx';
import {projects} from '../../../config/projects/projectData.ts';

const containerVariants = {
    initial: {opacity: 0, y: -20},
    enter: {
        opacity: 1,
        y: 0,
        transition: {staggerChildren: MotionDuration.FAST}
    }
};

const childVariants = {
    initial: {opacity: 0, y: -12},
    enter: {opacity: 1, y: 0}
};

const Projects: React.FC = () => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const tags = useMemo(() => {
        const tagSet = new Set<string>();
        projects.forEach((project) => project.tags.forEach((tag) => tagSet.add(tag)));
        return ['All', ...Array.from(tagSet).sort((a, b) => a.localeCompare(b))];
    }, []);

    const filteredProjects = useMemo(() => {
        if (selectedTags.length === 0) {
            return projects;
        }
        return projects.filter((project) => selectedTags.every((tag) => project.tags.includes(tag)));
    }, [selectedTags]);

    const handleToggleTag = (tag: string) => {
        if (tag === 'All') {
            setSelectedTags([]);
            return;
        }

        setSelectedTags((prev) => {
            if (prev.includes(tag)) {
                return prev.filter((item) => item !== tag);
            }
            return [...prev, tag];
        });
    };

    return (
        <MainLayout>
            <MotionVStack spacing={10} align="stretch" variants={containerVariants}>
                <MotionVStack spacing={5} align="flex-start" variants={childVariants}>
                    <UnderlinedHeader header="Projects ✨" variants={childVariants}/>
                    <Text maxW={{base: '100%', md: '70%'}} textAlign="left">
                        A curated set of recent work that blends product strategy, thoughtful UX, and durable engineering.
                        Choose the capabilities you care about to tailor the list.
                    </Text>
                    <ProjectTagFilter tags={tags} selectedTags={selectedTags} onToggleTag={handleToggleTag}/>
                </MotionVStack>
                <SimpleGrid columns={{base: 1, lg: 2}} spacing={8}>
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} variants={childVariants}/>
                    ))}
                </SimpleGrid>
                {filteredProjects.length === 0 && (
                    <Box textAlign="left">
                        <Text>No projects match that combination just yet. Try adjusting a filter or two.</Text>
                    </Box>
                )}
            </MotionVStack>
        </MainLayout>
    );
};

export default Projects;
