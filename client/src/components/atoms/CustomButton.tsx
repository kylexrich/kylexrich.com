import { Button } from "@chakra-ui/react";
import React from "react";

type ButtonProps = {
  label: string;
  onClick: () => void;
};

const CustomButton: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <Button onClick={onClick}>{label}</Button>;
};

export default CustomButton;
