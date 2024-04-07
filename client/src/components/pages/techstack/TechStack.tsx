import * as React from 'react';
import { useEffect, useState } from 'react';
import { SimpleGrid, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { skills } from '../../../config/techstack/skills';
import TechCard from './organisms/TechCard';
import Container from './organisms/Container';
import UnderlinedHeader from '../../shared/UnderlinedHeader';
import MainLayout from '../../app/layout/MainLayout';

export interface TechStackProps {
    // empty
}

const TechStack: React.FC<TechStackProps> = () => {
    const [skillsList, setSkillsList] = useState(skills);

    useEffect(() => {
        setSkillsList(skills);
    }, []);

    return (
        <MainLayout>
            <VStack spacing={8}>
                <Container>
                    <VStack>
                        <UnderlinedHeader mt={0} mb={2}>
                            Tech Stack
                        </UnderlinedHeader>
                        <Text fontSize={'xl'} color={useColorModeValue('gray.500', 'gray.200')} maxW="lg" textAlign="center">
                            A list of my favorite tools and technologies that I use on a regular basis.
                        </Text>
                    </VStack>
                </Container>
                <Container zIndex={5}>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={8}>
                        {skillsList.map((skill, index) => (
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
            </VStack>
        </MainLayout>
    );
};

export default TechStack;
