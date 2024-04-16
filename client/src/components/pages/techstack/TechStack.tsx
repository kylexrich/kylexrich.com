import * as React from 'react';
import {Container, SimpleGrid} from '@chakra-ui/react';
import HeaderWithSubheader from '../../shared/HeaderWithSubheader.tsx';
import MainLayout from '../../app/layout/MainLayout.tsx';
import {skills} from '../../../config/techstack/skills.ts';
import TechCard from './organisms/TechCard.tsx';

export interface TechStackProps {
    // empty
}

const TechStack: React.FC<TechStackProps> = () => {
    return (
        <MainLayout>
            <HeaderWithSubheader
                header={'Tech Stack 👨🏻‍💻'}
                subheader={'A list of my favorite tools and technologies that I use on a regular basis.'}
            />
            <Container>
                <SimpleGrid w="85%" columns={{base: 1, md: 1, lg: 2}} spacing={4} mx={4}>
                    {skills.map((skill, index) => (
                        <TechCard
                            key={index}
                            title={skill.title}
                            description={skill.description}
                            imageRefs={skill.imageRefs}
                            link={skill.link}
                            categories={skill.categories}
                            bgColor={skill.bgColor}
                            index={index}
                        />
                    ))}
                </SimpleGrid>
            </Container>
        </MainLayout>
    );
};

export default TechStack;
