import React from "react";
import { careerDetails } from "../../../../config/about/careerDetails";
import CareerCard from "./CareerCard";
import AboutSection from "./AboutSection";

const CareerSection: React.FC = () => {
  return <AboutSection headerText="Career" emoji="🛠️" details={careerDetails} cardComponent={CareerCard} />;
};

export default CareerSection;
