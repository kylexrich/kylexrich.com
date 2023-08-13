import React from "react";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import UserIcon from "../../assets/images/me.png";
import { MotionBox, MotionFlex } from "../atoms/MotionComponents";

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  const ANIMATION_DURATION = 0.5;

  return (
    <Flex direction="column" align="center">
      <Flex direction={{ base: "column", md: "row" }}>
        <MotionBox
          opacity="0"
          initial={{
            translateX: -150,
            opacity: 0,
          }}
          animate={{
            translateX: 0,
            opacity: 1,
            transition: {
              duration: ANIMATION_DURATION,
            },
          }}
          m="auto"
          mb={{ base: 16, md: "auto" }}
        >
          <MotionBox whileHover={{ scale: 1.2 }} rounded="full" shadow="lg">
            <Avatar size={"2xl"} showBorder={true} src={UserIcon} />
          </MotionBox>
        </MotionBox>
        <MotionFlex
          position="relative"
          m={{ base: "auto", sm: "initial" }}
          ml={{ base: "auto", md: 16 }}
          w={{ base: "90%", sm: "85%", md: "80%" }}
          maxW="800px"
          opacity="0"
          justify="center"
          direction="column"
          initial={{
            opacity: 0,
            translateX: 150,
          }}
          animate={{
            opacity: 1,
            translateX: 0,
            transition: {
              duration: ANIMATION_DURATION,
            },
          }}
        >
          <Box position="relative">
            <MotionBox whileHover={{ translateY: -5 }} width="max-content">
              <Box as="h1" mt={0} mb={6} fontSize="3xl" lineHeight="shorter" fontWeight="bold" textAlign="left">
                <Box as="span" display="inline-block" position="relative">
                  Hey! 👋
                  <Box as="span" display="block" position="absolute" bg={"gray.200"} w={"100%"} h={"1px"} bottom={-2} />
                </Box>
              </Box>
            </MotionBox>
          </Box>
          <Box as="h2" fontSize="2xl" fontWeight="400" textAlign="left">
            My name is{" "}
            <Text as="strong" fontWeight="600" display="inline">
              Kyle
            </Text>{" "}
            and I&apos;m a full stack developer <Text as="span" whiteSpace="nowrap" display="inline"></Text>
            from{" "}
            <Text as="span" whiteSpace="nowrap" display="inline">
              Canada 🇨🇦
            </Text>
          </Box>
          <Box as="h2" fontSize="2xl" fontWeight="400" mt={5} textAlign="left">
            This is my digital portfolio and playground. Poke around if you&apos;re interested 😊
          </Box>
        </MotionFlex>
      </Flex>
    </Flex>
  );
};

export default Home;
