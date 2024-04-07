import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { Box, HStack, Link, Stack } from '@chakra-ui/react';
import { RouteItem } from '../../../config/routes';
import { ColorWeight, useAccentColor } from '../../../theme/accentColor';
export interface NavBarLinkProps {
    index?: string;
    name: string;
    path: string;
    onClose?: () => void;
}

const NavBarLink: React.FC<NavBarLinkProps> = (props) => {
    return (
        <Link
            as={RouterNavLink}
            px={2}
            py={1}
            rounded={'md'}
            _hover={{
                bg: useAccentColor({ lightModeWeight: ColorWeight.W100, darkModeWeight: ColorWeight.W900 }),
                color: useAccentColor({ lightModeWeight: ColorWeight.W900, darkModeWeight: ColorWeight.W50 })
            }}
            _activeLink={{
                bg: useAccentColor({ lightModeWeight: ColorWeight.W100, darkModeWeight: ColorWeight.W900 }),
                color: useAccentColor({ lightModeWeight: ColorWeight.W900, darkModeWeight: ColorWeight.W50 })
            }}
            to={props.path}
            onClick={props.onClose}
        >
            {props.name}
        </Link>
    );
};

export const DesktopNavLinks: React.FC<{ routes: RouteItem[] }> = ({ routes }) => {
    return (
        <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {routes.map((route) => (
                <NavBarLink key={route.path} name={route.name} path={route.path} />
            ))}
        </HStack>
    );
};

export const MobileNavLinks: React.FC<{ routes: RouteItem[]; onClose: () => void }> = ({ routes, onClose }) => {
    return (
        <Box pb={4} w={{ base: '100%', md: '80%' }} maxW={800} display={{ base: 'inherit', md: 'none' }}>
            <Stack>
                {routes.map((route) => (
                    <NavBarLink key={route.path} name={route.name} path={route.path} onClose={onClose} />
                ))}
            </Stack>
        </Box>
    );
};
