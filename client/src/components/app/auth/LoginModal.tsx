import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Stack,
    Input,
    Button
} from '@chakra-ui/react';
import { AppDispatch } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/authSlice';

type LoginModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

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
                        <Button onClick={handleLogin} colorScheme="blue">
                            Login
                        </Button>
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default LoginModal;
