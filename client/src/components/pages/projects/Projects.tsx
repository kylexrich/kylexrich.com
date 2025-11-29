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

    const {workTypeTags, techTags} = useMemo(() => {
        const workTypeSet = new Set<string>();
        const techTagSet = new Set<string>();

        projects.forEach((project) => {
            project.workTypeTags.forEach((tag) => workTypeSet.add(tag));
            project.techTags.forEach((tag) => techTagSet.add(tag));
        });

        const sortedWorkTypeTags = Array.from(workTypeSet).sort((a, b) => a.localeCompare(b));
        const sortedTechTags = Array.from(techTagSet).sort((a, b) => a.localeCompare(b));

        return {
            workTypeTags: ['All', ...sortedWorkTypeTags],
            techTags: sortedTechTags
        };
    }, []);

    const filteredProjects = useMemo(() => {
        if (selectedTags.length === 0) {
            return projects;
        }
        return projects.filter((project) => {
            const projectTagSet = new Set([...project.workTypeTags, ...project.techTags]);
            return selectedTags.every((tag) => projectTagSet.has(tag));
        });
    }, [selectedTags]);

    const handleToggleTag = (tag: string) => {
        if (tag === 'All') {
            setSelectedTags([]);
            return;
        }

        setSelectedTags((prev) => {
            if (prev.includes(tag)) {
                return [];
            }
            return [tag];
        });
    };

    return (
        <MainLayout>
            <MotionVStack spacing={{base: 4, md: 6}} align="stretch" variants={containerVariants}>
                <MotionVStack spacing={4} align="flex-start" variants={childVariants}>
                    <UnderlinedHeader header="Projects 🛠️" variants={childVariants}/>
                    <Box w="full" display="flex" justifyContent="center">
                        <ProjectTagFilter
                            primaryTags={workTypeTags}
                            secondaryTags={techTags}
                            selectedTags={selectedTags}
                            onToggleTag={handleToggleTag}
                        />
                    </Box>
                </MotionVStack>
                <SimpleGrid columns={{base: 1, lg: 2}} spacing={{base: 6, md: 8}}>
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} variants={childVariants}/>
                    ))}
                </SimpleGrid>
                {filteredProjects.length === 0 && (
                    <Box textAlign="left">
                        <Text>No projects match that filter just yet. Try a different one.</Text>
                    </Box>
                )}
            </MotionVStack>
        </MainLayout>
    );
};

export default Projects;
