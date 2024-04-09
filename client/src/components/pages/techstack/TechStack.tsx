import * as React from 'react';
import { useEffect, useState } from 'react';
import { Container, SimpleGrid, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { skills } from '../../../config/techstack/skills';
import TechCard from './organisms/TechCard';
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
            <VStack align="start">
                <UnderlinedHeader mt={0} mb={2}>
                    Tech Stack 👨🏻‍💻
                </UnderlinedHeader>
                <Text color={useColorModeValue('gray.500', 'gray.200')} textAlign="left" mb={6}>
                    {'A list of my favorite tools and technologies that I use on a regular basis.'}
                </Text>
            </VStack>
            <Container>
                <SimpleGrid w="85%" columns={{ base: 1, md: 1, lg: 2 }} spacing={4} mt={2} mx={4}>
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
        </MainLayout>
    );
};

export default TechStack;
