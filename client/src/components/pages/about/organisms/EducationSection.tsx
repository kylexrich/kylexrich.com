import React from "react";
import { educationDetails } from "../../../../config/about/educationDetails";
import EducationCard from "./EducationCard";
import AboutSection from "./AboutSection";

const EducationSection: React.FC = () => {
  return <AboutSection headerText="Education" emoji="🎓" details={educationDetails} cardComponent={EducationCard} />;
};

export default EducationSection;
