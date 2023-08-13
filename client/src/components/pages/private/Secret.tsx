import React from "react";
import ResumeSection from "../../organisms/ResumeSection";

type SecretProps = {};

const Secret: React.FC<SecretProps> = (props) => {
  return (
    <div>
      <h1>Secret</h1>
      <ResumeSection />
    </div>
  );
};

export default Secret;
