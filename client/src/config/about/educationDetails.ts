import { IGenericAboutCardDetail } from "./IGenericAboutDetail";

export type EducationDetail = IGenericAboutCardDetail;
export const educationDetails: EducationDetail[] = [
  {
    title: "University of British Columbia",
    subtitle: "Bachelor of Business and Computer Science",
    shortDescription: "GPA: 3.9/4",
    dateText: "Graduation: 2023",
    logoRef: "/assets/images/about/ubclogo.jpeg",
    skills: ["Java", "C++", "HTML", "CSS", "JavaScript", "TypeScript"],
    hasModal: false,
  },
];
