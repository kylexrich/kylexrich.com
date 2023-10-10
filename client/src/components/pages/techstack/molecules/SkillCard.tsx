import React from "react";
import { Box, HStack, Image, Link, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { ISkillDetail } from "../../../../config/techstack/ISkillDetail";
import { MotionBox } from "../../../shared/MotionComponents";

type SkillCardProps = ISkillDetail;

const SkillCard: React.FC<SkillCardProps> = ({ name, description, link, categories, image, bg }) => {
  const cardBackground = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");
  const descriptionColor = useColorModeValue("gray.500", "gray.200");

  return (
    <MotionBox>
      <MotionBox whileHover={{ y: -5 }}>
        <Link href={link} isExternal>
          <HStack
            p={4}
            bg={cardBackground}
            rounded="xl"
            borderWidth="1px"
            borderColor={borderColor}
            w="100%"
            textAlign="left"
            align="start"
            spacing={4}
            _hover={{ shadow: "md" }}
          >
            <Box
              bgColor={bg}
              rounded="lg"
              p={2}
              position="relative"
              overflow="hidden"
              lineHeight={0}
              boxShadow="inset 0 0 1px 1px rgba(0, 0, 0, 0.015)"
            >
              <Box position="absolute" top={0} bottom={0} left={0} right={0} opacity={0.25}></Box>
              <Image src={image} height={26} width={26} rounded="md" />
            </Box>
            <VStack align="start" justify="flex-start" spacing={1} maxW="lg" h="100%">
              <VStack spacing={0} align="start" flexGrow={1}>
                <Text fontWeight="bold" fontSize="md" noOfLines={2}>
                  {name}
                </Text>
                <Text fontSize="sm" color={descriptionColor}>
                  {description}
                </Text>
              </VStack>
            </VStack>
          </HStack>
        </Link>
      </MotionBox>
    </MotionBox>
  );
};

export default SkillCard;
