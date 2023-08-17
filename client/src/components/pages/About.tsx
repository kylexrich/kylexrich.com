import React from "react";
import { VStack } from "@chakra-ui/react";
import EducationSection from "../organisms/EducationSection";
import CareerSection from "../organisms/CareerSection";
import ExtracurricularSection from "../organisms/ExtracurricularSection";

type AboutProps = {};

const About: React.FC<AboutProps> = () => {
  return (
    <VStack spacing={8} align="start">
      <CareerSection />
      <EducationSection />
      <ExtracurricularSection />
    </VStack>
  );
};

export default About;
