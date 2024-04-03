import React from 'react';
import { LayoutTransition } from '../../shared/MotionComponents';

export interface ProjectsProps {
    // empty
}

const Projects: React.FC<ProjectsProps> = () => {
    return (
        <LayoutTransition>
            <h1>Projects</h1>
        </LayoutTransition>
    );
};

export default Projects;
