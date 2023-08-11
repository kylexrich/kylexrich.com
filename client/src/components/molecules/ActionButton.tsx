import React from "react";
import CustomButton from "../atoms/CustomButton";

type ActionButtonProps = {
  label: string;
  action: () => void;
};

const ActionButton: React.FC<ActionButtonProps> = ({ label, action }) => {
  return <CustomButton label={label} onClick={action} />;
};

export default ActionButton;
