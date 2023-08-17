import React from "react";
import { Box, useDisclosure } from "@chakra-ui/react";

import AboutCardContent from "./AboutCardContent";
import AboutCardBox from "../atoms/AboutCardBox";
import { GenericAboutCardDetail } from "../../config/about/GenericAboutDetail";
import AboutCardModal from "./AboutCardModal";

export type ThemeProps = {
  textColor: string;
  subTextColor: string;
  skillColor: string;
};

type GenericAboutCardProps = GenericAboutCardDetail & ThemeProps;

const AboutCard: React.FC<GenericAboutCardProps> = ({
  hasModal,
  logoRef,
  title,
  textColor,
  subtitle,
  subTextColor,
  shortDescription,
  type,
  skillColor,
  dateText,
  skills,
  additionalContent,
  longDescription,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box onClick={hasModal ? onOpen : undefined} cursor={hasModal ? "pointer" : "default"}>
      <AboutCardBox>
        <AboutCardContent
          logoRef={logoRef}
          title={title}
          textColor={textColor}
          subtitle={subtitle}
          subTextColor={subTextColor}
          shortDescription={shortDescription}
          type={type}
          skillColor={skillColor}
          dateText={dateText}
          skills={skills}
          additionalContent={additionalContent}
        />
      </AboutCardBox>

      {hasModal && (
        <AboutCardModal
          logoRef={logoRef}
          title={title}
          textColor={textColor}
          subtitle={subtitle}
          subTextColor={subTextColor}
          longDescription={longDescription}
          skills={skills}
          skillColor={skillColor}
          isOpen={isOpen}
          onClose={onClose}
          dateText={dateText}
        />
      )}
    </Box>
  );
};

export default AboutCard;
