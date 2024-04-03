import React from 'react';
import { socialAccounts } from '../../../config/socialAccounts';
import { Box, Flex, IconButton, Link, Stack, Text, useColorModeValue, useDisclosure, useTheme } from '@chakra-ui/react';
import { author } from '../../../config/name';
import LoginModal from '../auth/LoginModal';
import AuthIcon from '../auth/AuthIcon';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { logout } from '../../../redux/authSlice';

const Footer: React.FC = () => {
    const { colors } = useTheme();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch: AppDispatch = useDispatch();
    const userId = useSelector((state: RootState) => state.auth.userId);

    const onLogout = () => {
        dispatch(logout());
    };

    const renderSocialMediaIcons = () =>
        socialAccounts.map((acc, index) => (
            <IconButton
                key={index}
                as={Link}
                isExternal
                href={acc.url}
                aria-label={acc.label}
                size="lg"
                colorScheme={acc.type}
                icon={<acc.icon />}
                variant="ghost"
                isRound={true}
            />
        ));

    return (
        <Stack
            as="footer"
            p={4}
            justifyContent="space-between"
            alignItems="center"
            w={{ base: '100%', sm: '85%', md: '80%' }}
            spacing={{ base: 1, sm: 2 }}
            maxW={800}
            mx="auto"
        >
            <Flex
                flexDirection={{ base: 'column', md: 'row' }}
                flexFlow={{ base: 'column-reverse' }}
                justifyContent={{ base: 'center', sm: 'space-between' }}
                alignItems="center"
                w="100%"
            >
                <Text textAlign="center" fontSize="sm">
                    © {new Date().getFullYear()} {author.name}
                </Text>
                <Box textAlign="center">
                    {renderSocialMediaIcons()}
                    <AuthIcon userId={userId} onLogout={onLogout} onOpen={onOpen} />
                </Box>
            </Flex>
            <LoginModal isOpen={isOpen} onClose={onClose} />
        </Stack>
    );
};

export default Footer;
