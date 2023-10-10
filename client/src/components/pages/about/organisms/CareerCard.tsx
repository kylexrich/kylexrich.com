import React from "react";
import { useColorModeValue } from "@chakra-ui/react";
import { CareerDetail } from "../../../../config/about/careerDetails";
import AboutCard from "../molecules/AboutCard";

type CareerCardProps = CareerDetail;

const CareerCard: React.FC<CareerCardProps> = ({
  title,
  subtitle,
  shortDescription,
  longDescription,
  skills,
  logoRef,
  dateText,
}) => {
  const textColor = useColorModeValue("gray.700", "gray.300");
  const subTextColor = useColorModeValue("gray.500", "gray.400");
  const skillColor = useColorModeValue("gray.200", "gray.700");

  return (
    <AboutCard
      logoRef={logoRef}
      title={title}
      subtitle={subtitle}
      shortDescription={shortDescription}
      longDescription={longDescription}
      dateText={dateText}
      textColor={textColor}
      subTextColor={subTextColor}
      skillColor={skillColor}
      skills={skills}
      hasModal={!!longDescription}
    />
  );
};

export default CareerCard;
