import * as React from 'react';
import { useEffect, useState } from 'react';
import { SimpleGrid, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { skills } from '../../../config/techstack/skills';
import TechCard from './organisms/TechCard';
import Container from './organisms/Container';
import { LayoutTransition } from '../../shared/MotionComponents';

export interface TechStackProps {
    // empty
}

const TechStack: React.FC<TechStackProps> = () => {
    const [skillsList, setSkillsList] = useState(skills);

    useEffect(() => {
        setSkillsList(skills);
    }, []);

    return (
        <LayoutTransition>
            <VStack spacing={8}>
                <Container>
                    <VStack>
                        <Text mt={0} mb={1} fontSize="2xl" fontWeight="bold">
                            Tech Stack
                        </Text>
                        <Text fontSize={'xl'} color={useColorModeValue('gray.500', 'gray.200')} maxW="lg" textAlign="center">
                            A list of my favorite tools and technologies that I use on a regular basis.
                        </Text>
                    </VStack>
                </Container>
                <Container zIndex={5}>
                    <SimpleGrid columns={[1, 1, 2]} spacing={4} mt={8}>
                        {skillsList.map((skill, index) => (
                            <TechCard
                                key={index}
                                title={skill.title}
                                description={skill.description}
                                imageRefs={skill.imageRefs}
                                link={skill.link}
                                categories={skill.categories}
                                bgColor={skill.bgColor}
                            />
                        ))}
                    </SimpleGrid>
                </Container>
            </VStack>
        </LayoutTransition>
    );
};

export default TechStack;
