import React from "react";
import { useColorModeValue } from "@chakra-ui/react";
import { ExtracurricularDetail } from "../../../../config/about/extracurricularDetails";
import AboutCard from "../molecules/AboutCard";

type ExtracurricularCardProps = ExtracurricularDetail;

const ExtracurricularCard: React.FC<ExtracurricularCardProps> = ({
  title,
  subtitle,
  dateText,
  type,
  shortDescription,
  longDescription,
  skills,
  logoRef,
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
      skills={skills}
      dateText={dateText}
      textColor={textColor}
      subTextColor={subTextColor}
      skillColor={skillColor}
      type={type}
      hasModal={!!longDescription}
    />
  );
};

export default ExtracurricularCard;
