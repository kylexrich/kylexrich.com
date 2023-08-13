import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { Box, HStack, Link, Stack } from "@chakra-ui/react";
import { RouteItem } from "../../../config/routes";

type NavBarLinkProps = {
  index?: string;
  name: string;
  path: string;
  onClose?: () => void;
};

const NavBarLink: React.FC<NavBarLinkProps> = (props) => {
  return (
    <Link
      as={RouterNavLink}
      onClick={() => {
        if (props.onClose) {
          props.onClose();
        }
      }}
      to={props.path}
    >
      {props.name}
    </Link>
  );
};

export const DesktopNavLinks: React.FC<{ routes: RouteItem[] }> = ({ routes }) => {
  return (
    <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
      {routes.map((route) => (
        <NavBarLink key={route.path} name={route.name} path={route.path} />
      ))}
    </HStack>
  );
};

export const MobileNavLinks: React.FC<{ routes: RouteItem[]; onClose: () => void }> = ({ routes, onClose }) => {
  return (
    <Box pb={4} w={{ base: "100%", md: "80%" }} maxW={800} display={{ base: "inherit", md: "none" }}>
      <Stack>
        {routes.map((route) => (
          <NavBarLink key={route.path} name={route.name} path={route.path} onClose={onClose} />
        ))}
      </Stack>
    </Box>
  );
};
