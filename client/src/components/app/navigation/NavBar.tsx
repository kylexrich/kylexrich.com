import React from 'react';
import {Avatar, Box, Flex, HStack, IconButton, useColorModeValue, useDisclosure, useTheme} from '@chakra-ui/react';
import {AiOutlineClose} from 'react-icons/ai';
import {NavLink as RouterNavLink} from 'react-router-dom';
import {GiHamburgerMenu} from 'react-icons/gi';
import {ColorWeight, useAccentColor} from '../../../theme/accentColor.ts';
import {RootState} from '../../../redux/store.ts';
import {homeRoute, routes} from '../../../config/routes.ts';
import {MotionBox} from '../../shared/MotionComponents.tsx';
import {ME_CUT_REMOVE_BG} from '../../../assets/other.ts';
import {DesktopNavLinks, MobileNavLinks} from './NavBarLink.tsx';
import {AccentPicker} from '../../../theme/AccentSwitcher.tsx';
import ColorModeSwitcher from '../../../theme/ColorModeSwitcher.tsx';
import {useAppSelector} from '../../../hooks/reduxHooks.tsx';

interface NavBarTheme {
    navBar?: {
        bg?: {
            light?: string;
            dark?: string;
        };
    };
}

const NavBar: React.FC = () => {
    const theme = useTheme<NavBarTheme>();

    const avatarColor = useAccentColor();
    const avatarBorderColor = useAccentColor({
        lightModeWeight: ColorWeight.W800,
        darkModeWeight: ColorWeight.W700
    });
    const {isOpen, onOpen, onClose} = useDisclosure();
    const userId = useAppSelector((state: RootState) => state.auth.userId);

    const filteredRoutes = routes.filter((route) => !route.secure || userId);
    const navBg = useColorModeValue(
        theme.navBar?.bg?.light ?? 'white',
        theme.navBar?.bg?.dark ?? 'gray.900'
    );

    return (
        <Box bg={navBg} px={4} boxShadow="lg">
            <Flex
                h={16}
                alignItems={'center'}
                justifyContent={'space-between'}
                w={{base: '90%', sm: '85%', md: '80%'}}
                maxW={800}
                mx="auto"
            >
                <IconButton
                    size={'md'}
                    icon={isOpen ? <AiOutlineClose/> : <GiHamburgerMenu/>}
                    aria-label={'Open Menu'}
                    display={{base: 'inherit', md: 'none'}}
                    onClick={isOpen ? onClose : onOpen}
                />
                <HStack spacing={8} alignItems={'center'}>
                    <MotionBox whileHover={{scale: 1.2}} shadow="md" rounded="full">
                        <Avatar
                            as={RouterNavLink}
                            bg={avatarColor}
                            boxSize="38px"
                            showBorder={true}
                            borderColor={avatarBorderColor}
                            to={homeRoute.path}
                            src={ME_CUT_REMOVE_BG}
                        />
                    </MotionBox>
                    <DesktopNavLinks routes={filteredRoutes}/>
                </HStack>
                <Flex alignItems={'center'}>
                    <MotionBox whileHover="hover">
                        <AccentPicker aria-label="Accent Color Picker" variant="ghost" zIndex={1} mr={2}/>
                    </MotionBox>
                    <ColorModeSwitcher/>
                </Flex>
            </Flex>
            {isOpen && <MobileNavLinks routes={filteredRoutes} onClose={onClose}/>}
        </Box>
    );
};

export default NavBar;
