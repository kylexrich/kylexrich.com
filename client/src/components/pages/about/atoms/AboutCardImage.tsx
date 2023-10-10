import React from "react";
import { Image } from "@chakra-ui/react";

type SizeType = { base?: string; sm?: string; md?: string; lg?: string; xl?: string; [key: string]: any };

type AboutCardImageProps = {
  logoRef: string;
  title: string;
  size?: { width: SizeType; height: SizeType };
};

const AboutCardImage: React.FC<AboutCardImageProps> = ({ logoRef, title, size }) => {
  return (
    <Image
      rounded="full"
      w={size?.width || { base: "16", md: "32" }}
      h={size?.height || { base: "16", md: "32" }}
      objectFit="cover"
      src={logoRef || "/assets/images/placeholder.png"}
      alt={title}
    />
  );
};

export default AboutCardImage;
