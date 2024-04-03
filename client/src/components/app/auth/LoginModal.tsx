import React, { useState } from 'react';
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack } from '@chakra-ui/react';
import { AppDispatch } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/authSlice';
import { ColorWeight, useAccentColor } from '../../../theme/accentColor';

export interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const dispatch: AppDispatch = useDispatch();
    const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginInfo({
            ...loginInfo,
            [name]: value
        });
    };

    const handleLogin = () => {
        dispatch(login(loginInfo))
            .unwrap()
            .then(() => {
                setLoginInfo({ email: '', password: '' });
                onClose();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Login</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={3}>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={loginInfo.email}
                            onChange={handleInputChange}
                        />
                        <Input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={loginInfo.password}
                            onChange={handleInputChange}
                        />
                        <Button
                            onClick={handleLogin}
                            color={useAccentColor({
                                lightModeWeight: ColorWeight.W900,
                                darkModeWeight: ColorWeight.W50
                            })}
                            bg={useAccentColor({
                                lightModeWeight: ColorWeight.W100,
                                darkModeWeight: ColorWeight.W700
                            })}
                            _hover={{
                                color: useAccentColor({
                                    lightModeWeight: ColorWeight.W900,
                                    darkModeWeight: ColorWeight.W50
                                }),
                                bg: useAccentColor({
                                    lightModeWeight: ColorWeight.W300,
                                    darkModeWeight: ColorWeight.W900
                                })
                            }}
                        >
                            Login
                        </Button>
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default LoginModal;
