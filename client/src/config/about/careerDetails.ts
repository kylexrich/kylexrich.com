import React from "react";
import { GenericAboutCardDetail } from "./GenericAboutDetail";

export type CareerDetail = GenericAboutCardDetail;

export const careerDetails: CareerDetail[] = [
  {
    title: "Amazon",
    subtitle: "Software Development Engineer",
    shortDescription:
      "Coding to ensure you receive your packages as quickly as humanly possible. If your package was late, you can blame me!",
    skills: [
      "Java",
      "Mockito",
      "JUnit",
      "AWS Fargate",
      "AWS Lambda",
      "DynamoDB",
      "API Validation",
      "Load Testing",
      "SQS Failure Handling",
    ],
    logoRef: "/assets/images/amazonlogo.png",
    dateText: "May 2023 – Current",
  },
  {
    title: "Amazon",
    subtitle: "Software Engineer Intern",
    shortDescription:
      "Developed a VS Code Extension for IEC-61131 PLC languages, designed a dynamic error recovery parser, and enhanced Amazon Control Engineers' development speed.",
    longDescription:
      "At Amazon, I led a project to integrate IEC-61131 PLC languages into VS Code. The project's core intention was to phase out a proprietary IDE, mitigating security vulnerabilities and optimizing the workflow for Amazon Control Engineers." +
      "\n I wrote a custom recursive predictive parser with immediate syntax error recovery. I then leveraged my parser and the Language Server Protocol (LSP) to implement workspace features such as: autocomplete, goto definition, symbol rename, hover information, syntax highlighting, error messages, and see symbol references." +
      "\n To ensure the tool met user needs, I routinely presented demos to prospective users, absorbing and implementing their feedback.",
    skills: [
      "React",
      "Language Server Protocol (LSP)",
      "VS Code Extension Development",
      "IEC 61131",
      "TypeScript",
      "Recursive Descent Parsers",
    ],
    logoRef: "/assets/images/amazonlogo.png",
    dateText: "Jun 2022 - Sep 2022",
  },
  {
    title: "Traction on Demand (acquired by Salesforce)",
    subtitle: "Business Solutions Consultant Intern",
    shortDescription:
      "Achieved a 100% client retention rate, generated over $100,000 in contract revenue, and reduced lead response time by 40% with custom automation.",
    longDescription:
      "At Traction on Demand, I was the first intern in history to solely manage clients. My proactive communication and innovative solutions led to a 100% retention rate across my three clients, which subsequently drove over $100,000 in contract revenue." +
      "\n A notable achievement was the implementation of a custom lead routing automation for a client in a highly competitive industry. This system efficiently allocated leads based on specific criteria, resulting in a 40% reduction in lead response time. " +
      "\n Besides technical contributions, I took ownership of improving team productivity. I proposed a revamped daily stand-up structure based on feedback and best practices, saving the team 30 hours weekly.",
    skills: [
      "IT Consulting",
      "Sales Automation",
      "Apex Programming",
      "SOQL (Salesforce Object Query Language)",
      "Salesforce Flow",
      "Salesforce.com Development",
    ],
    logoRef: "/assets/images/salesforcelogo.png",
    dateText: "May 2021 - Dec 2021",
  },
  {
    title: "University of British Columbia",
    subtitle: "Undergraduate Teaching Assistant",
    shortDescription:
      "Led 3-hour tutorials for ~30 students three times weekly, focusing on advanced programming topics. Attained an exceptional 100% satisfaction rate, surpassing the 77% average.",
    longDescription:
      "At UBC, I led in-depth 3-hour tutorials for around 30 students, three times per week. These sessions centered around helping students navigate complex programming challenges, from mutual recursion to system design. " +
      "\nMy commitment to student success was reflected in a 100% satisfaction rate on teaching feedback, notably exceeding the 77% average for other TAs. " +
      "\nStudents frequently commented on my approachability, thoroughness, and preparation. Written feedback such as 'Kyle was an absolute joy...definitely one of the best TAs I have ever had.' stand testament to the impact I had on their learning.",
    skills: ["Instructional Techniques", "Technical Mentoring", "Interactive Feedback", "Student Engagement"],
    logoRef: "/assets/images/ubclogo.jpeg",
    dateText: "Jan 2021 - May 2021",
  },
  {
    title: "Best Builders Ltd",
    subtitle: "Carpenter Apprentice",
    shortDescription:
      "Developed a new lumber transportation approach that reduced average labor costs while leading a team of labourers during construction projects. Enhanced client relations through personal rapport-building and proactive conflict resolution.",
    skills: [
      "Construction Management",
      "Team Coordination",
      "Client Relationship Management",
      "Operational Efficiency",
    ],
    logoRef: "/assets/images/bestbuilders_logo.png",
    dateText: "Jun 2016 - Aug 2019",
  },
  {
    title: "The Links at Hampton Cove",
    subtitle: "Bartender",
    shortDescription:
      "Developed and introduced promotional activities to build company image by regularly providing on-the-ground insight and coordinating with upper management. Optimized customer service experience by strategically reorganizing bar supplies.",
    skills: [
      "Sales & Promotion",
      "Stakeholder Collaboration",
      "Operational Layouts",
      "Customer Experience Improvement",
    ],
    logoRef: "/assets/images/linkslogo.png",
    dateText: "Apr 2018 - Jul 2019",
  },
  {
    title: "Speeds Pub",
    subtitle: "Head Cook",
    shortDescription:
      "Promoted to Head Cook within six months due to outstanding leadership. Implemented a revamped kitchen layout, labeling systems, and cooking timers that accelerated order preparation times and reduced food waste. Further decreased employee turnover by fostering a positive work environment.",
    skills: ["Leadership", "Operational Layouts", "Training", "Employee Relations"],
    logoRef: "/assets/images/speedslogo.jpeg",
    dateText: "Jun 2013 - Jun 2016",
  },
];
