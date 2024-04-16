import React from 'react';
import {Box, Flex, IconButton, Link, Stack, Text, useDisclosure} from '@chakra-ui/react';
import {useAppDispatch, useAppSelector} from '../../../hooks/reduxHooks.tsx';
import {AppDispatch, RootState} from '../../../redux/store.ts';
import {logout} from '../../../redux/authSlice.ts';
import {socialAccounts} from '../../../config/socialAccounts.ts';
import {author} from '../../../config/name.ts';
import AuthIcon from '../auth/AuthIcon.tsx';
import LoginModal from '../auth/LoginModal.tsx';

const Footer: React.FC = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const dispatch: AppDispatch = useAppDispatch();
    const userId: string | null = useAppSelector((state: RootState) => state.auth.userId);

    const onLogout = () => {
        void dispatch(logout());
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
                colorScheme={acc.colorScheme}
                icon={<acc.icon/>}
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
            w={{base: '100%', sm: '85%', md: '80%'}}
            spacing={{base: 1, sm: 2}}
            maxW={800}
            mx="auto"
        >
            <Flex
                flexDirection={{base: 'column', md: 'row'}}
                flexFlow={{base: 'column-reverse'}}
                justifyContent={{base: 'center', sm: 'space-between'}}
                alignItems="center"
                w="100%"
            >
                <Text textAlign="center" fontSize="sm">
                    © {new Date().getFullYear()} {author.name}
                </Text>
                <Box textAlign="center">
                    {renderSocialMediaIcons()}
                    <AuthIcon userId={userId} onLogout={onLogout} onOpen={onOpen}/>
                </Box>
            </Flex>
            <LoginModal isOpen={isOpen} onClose={onClose}/>
        </Stack>
    );
};

export default Footer;
