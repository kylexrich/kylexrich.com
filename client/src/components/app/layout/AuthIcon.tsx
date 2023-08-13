import React from "react";
import { IconButton } from "@chakra-ui/react";
import { FaSignOutAlt, FaSignInAlt } from "react-icons/fa";

type AuthIconProps = {
  userId: string | null;
  onLogout: () => void;
  onOpen: () => void;
};

const AuthIcon: React.FC<AuthIconProps> = ({ userId, onLogout, onOpen }) => {
  const isLogin = !userId;

  return (
    <IconButton
      aria-label={isLogin ? "Login" : "Logout"}
      size="lg"
      icon={isLogin ? <FaSignInAlt /> : <FaSignOutAlt />}
      variant="ghost"
      isRound={true}
      onClick={isLogin ? onOpen : onLogout}
    />
  );
};

export default AuthIcon;
