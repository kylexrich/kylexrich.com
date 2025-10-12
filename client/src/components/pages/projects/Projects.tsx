import React, {useMemo, useState} from 'react';
import {Box, Stack, Text} from '@chakra-ui/react';
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
    const [activeTag, setActiveTag] = useState('All');

    const tags = useMemo(() => {
        const tagSet = new Set<string>();
        projects.forEach((project) => project.tags.forEach((tag) => tagSet.add(tag)));
        return ['All', ...Array.from(tagSet).sort((a, b) => a.localeCompare(b))];
    }, []);

    const filteredProjects = useMemo(() => {
        if (activeTag === 'All') {
            return projects;
        }
        return projects.filter((project) => project.tags.includes(activeTag));
    }, [activeTag]);

    return (
        <MainLayout>
            <MotionVStack spacing={12} align="stretch" variants={containerVariants}>
                <MotionVStack spacing={6} align="flex-start" variants={childVariants}>
                    <UnderlinedHeader header="Projects ✨" variants={childVariants}/>
                    <Text maxW={{base: '100%', md: '85%'}} textAlign="left">
                        Case studies that highlight how I design, build, and ship thoughtful developer experiences. Filter by
                        focus area to explore the work that resonates most with what you need next.
                    </Text>
                    <ProjectTagFilter tags={tags} activeTag={activeTag} onTagSelect={setActiveTag}/>
                </MotionVStack>
                <Stack spacing={10}>
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} variants={childVariants}/>
                    ))}
                    {filteredProjects.length === 0 && (
                        <Box textAlign="left">
                            <Text>No projects found for this filter just yet. Try another tag.</Text>
                        </Box>
                    )}
                </Stack>
            </MotionVStack>
        </MainLayout>
    );
};

export default Projects;
