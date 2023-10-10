import * as React from "react";
import { useState, useEffect } from "react";
import { VStack, Text, useColorModeValue, SimpleGrid } from "@chakra-ui/react";
import { skills } from "../../../config/techstack/skills";
import SkillCard from "./molecules/SkillCard";
import Container from "./atoms/Container";

type TechStackProps = {};

const TechStack: React.FC<TechStackProps> = () => {
  const [skillsList, setSkillsList] = useState(skills);

  useEffect(() => {
    setSkillsList(skills);
  }, []);

  return (
    <VStack spacing={8}>
      <Container>
        <VStack>
          <Text mt={0} mb={1} fontSize="2xl" fontWeight="bold">
            Tech Stack
          </Text>
          <Text fontSize={"xl"} color={useColorModeValue("gray.500", "gray.200")} maxW="lg" textAlign="center">
            A list of my favorite tools and technologies that I use on a regular basis.
          </Text>
        </VStack>
      </Container>
      <Container zIndex={5}>
        <SimpleGrid columns={[1, 1, 2]} spacing={4} mt={8}>
          {skillsList.map((skill, index) => (
            <SkillCard
              key={index}
              name={skill.name}
              description={skill.description}
              image={skill.image}
              link={skill.link}
              categories={skill.categories}
              bg={skill.bg}
            />
          ))}
        </SimpleGrid>
      </Container>
    </VStack>
  );
};

export default TechStack;
