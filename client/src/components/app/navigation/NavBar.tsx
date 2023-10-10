import React from "react";
import { Avatar, Box, Flex, HStack, IconButton, useColorModeValue, useDisclosure, useTheme } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import { NavLink as RouterNavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { DesktopNavLinks, MobileNavLinks } from "./NavBarLink";
import ColorModeSwitcher from "../layout/ColorModeSwitcher";
import { homeRoute, routes } from "../../../config/routes";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { MotionBox } from "../../shared/MotionComponents";
import { myIcon } from "../../../assets/myIcon";

const NavBar: React.FC = () => {
  const { colors } = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userId = useSelector((state: RootState) => state.auth.userId);

  const filteredRoutes = routes.filter((route) => !route.secure || userId);

  return (
    <Box bg={useColorModeValue(colors.navBar.bg.light, colors.navBar.bg.dark)} px={4} boxShadow={"lg"}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        w={["90%", "85%", "80%"]}
        maxW={800}
        mx="auto"
      >
        <IconButton
          size={"md"}
          icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
          aria-label={"Open Menu"}
          display={{ base: "inherit", md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <MotionBox whileHover={{ scale: 1.2 }} shadow="md" rounded="full">
            <Avatar as={RouterNavLink} size={"sm"} to={homeRoute.path} src={myIcon} />
          </MotionBox>
          <DesktopNavLinks routes={filteredRoutes} />
        </HStack>
        <Flex alignItems={"center"}>
          <ColorModeSwitcher />
        </Flex>
      </Flex>
      {isOpen && <MobileNavLinks routes={filteredRoutes} onClose={onClose} />}
    </Box>
  );
};

export default NavBar;
