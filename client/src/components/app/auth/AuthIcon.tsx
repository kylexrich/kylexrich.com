import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';

export interface AuthIconProps {
    userId: string | null;
    onLogout: () => void;
    onOpen: () => void;
}

const AuthIcon: React.FC<AuthIconProps> = ({ userId, onLogout, onOpen }) => {
    const loggedIn = !userId;

    return (
        <IconButton
            aria-label={loggedIn ? 'Login' : 'Logout'}
            size="lg"
            icon={loggedIn ? <FaSignInAlt /> : <FaSignOutAlt />}
            variant="ghost"
            isRound={true}
            onClick={loggedIn ? onOpen : onLogout}
        />
    );
};

export default AuthIcon;
