import React, {useState} from 'react';
import {Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack} from '@chakra-ui/react';
import {AppDispatch} from '../../../redux/store.ts';
import {useAppDispatch} from '../../../hooks/reduxHooks.tsx';
import {login} from '../../../redux/authSlice.ts';

export interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({isOpen, onClose}) => {
    const dispatch: AppDispatch = useAppDispatch();
    const [loginInfo, setLoginInfo] = useState({email: '', password: ''});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setLoginInfo({
                         ...loginInfo, [name]: value
                     });
    };

    const handleLogin = () => {
        dispatch(login(loginInfo))
            .unwrap()
            .then(() => {
                setLoginInfo({email: '', password: ''});
                onClose();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Login</ModalHeader>
                <ModalCloseButton/>
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
                        <Button variant="primaryButton" onClick={handleLogin}>
                            Login
                        </Button>
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default LoginModal;
