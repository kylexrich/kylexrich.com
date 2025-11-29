import {AboutCardDetail} from './AboutCardDetail.ts';

export const careerDetails: AboutCardDetail[] = [
    {
        title: 'Amazon',
        subtitle: 'Software Development Engineer',
        shortDescription:
            'Coding to ensure you receive your packages as quickly as humanly possible. If your package was late, you can blame me!',
        skills: [
            'Java',
            'Mockito',
            'JUnit',
            'AWS Fargate',
            'AWS Lambda',
            'DynamoDB',
            'API Validation',
            'Load Testing',
            'SQS Failure Handling'
        ],
        imageRefs: {
            light: '/assets/images/about/amazonlogo.png',
            dark: '/assets/images/about/amazonlogowhite.png'
        },
        dateText: 'May 2023 - Current'
    },
    {
        title: 'Amazon',
        subtitle: 'Software Engineer Intern',
        shortDescription:
            'Shipped a VS Code extension and Language Server to add full IEC 61131 PLC language support for control engineers - replacing a proprietary IDE dependency, improving security, and accelerating development speed for Amazon Control Engineers.',
        longDescriptionParagraphs: [
            'Built a custom parser with immediate syntax-error recovery and integrated with VS Code using Language Server Protocol (LSP).',
            'Implemented core editor capabilities: autocomplete, Go to Definition, Rename Symbols, Hover info, syntax highlighting, diagnostics, and find references.',
            'Ran iterative user demos with control engineers; incorporated feedback and earned approval to continue the project beyond the internship; delivered thorough docs for a seamless handoff.',
            'Recognized by management for SDE II-level performance - delivered 3x the initial scope and kept stakeholders aligned through proactive communication.'
        ],
        skills: [
            'React',
            'Language Server Protocol (LSP)',
            'VS Code Extension Development',
            'IEC 61131',
            'TypeScript',
            'Recursive Descent Parsers'
        ],
        imageRefs: {
            light: '/assets/images/about/amazonlogo.png',
            dark: '/assets/images/about/amazonlogowhite.png'
        },
        dateText: 'Jun 2022 - Sep 2022'
    },
    {
        title: 'Traction on Demand (acquired by Salesforce)',
        subtitle: 'Salesforce Consultant Intern',
        shortDescription:
            'Only intern ever trusted with end to end client ownership - owned 3 accounts, aligned stakeholders, prioritized parallel CRM improvement projects, and shipped Apex/Flow automations that delivered measurable outcomes.',
        longDescriptionParagraphs: [
            'Achieved 100% client retention across 3 accounts, sustaining $100K+ in contract revenue via proactive communication, clear expectations, and on time delivery.',
            'Reduced lead response time by >40% for one client by building a ZIP code + lead score based Apex routing automation (Apex, SOQL, Salesforce Flow).',
            'Saved my team ~30 hours/week by proactively redesigning the daily stand up (cadence, agenda, facilitation) using teammate feedback and agile best practices; planned and executed a $10,000 team building offsite to strengthen cohesion.',
            'Built reusable talk tracks/FAQs to standardize responses and accelerate discovery.'
        ],
        skills: [
            'IT Consulting',
            'Sales Automation',
            'Apex Programming',
            'SOQL (Salesforce Object Query Language)',
            'Salesforce Flow',
            'Salesforce.com Development'
        ],
        imageRefs: {
            light: '/assets/images/about/salesforcelogo.png',
            dark: '/assets/images/about/salesforcelogo.png'
        },
        dateText: 'May 2021 - Dec 2021'
    },
    {
        title: 'University of British Columbia',
        subtitle: 'Undergraduate Teaching Assistant',
        shortDescription:
            'Led 3x weekly, 3 hour guided tutorials (~30 students per session) focused on complex programming problems (e.g., mutual recursion, graph algorithms, system design). Drove comprehension through structured walkthroughs and live problem solving.',
        longDescriptionParagraphs: [
            'Facilitated high engagement tutorials with emphasis on mastery: frequent comprehension checks and clear step by step explanations before students left each lab.',
            'Earned 100% student satisfaction across all evaluation dimensions (vs 77% average for other TAs) in end of semester feedback.',
            'Recognized by many students for preparation, approachability, and depth of knowledge; noted an example verbatim student feedback below.',
            'Student feedback (verbatim): "Kyle was an absolute joy to have around for our tutorials and was extremely well put together. He would always be prepared, had a fantastic attitude in each lab, and was very approachable for questions. Similarly, he was extremely knowledgeable and made sure you understood every concept in the lab before you left. I have no suggestions for Kyle to improve because I believe he was a "perfect" TA who nailed every part of his job. Kyle was a huge reason why I looked forward to attending these tutorials every week and definitely one of the best TAs I have ever had."'
        ],
        skills: ['Instructional Techniques', 'Technical Mentoring', 'Interactive Feedback', 'Student Engagement'],
        imageRefs: {
            light: '/assets/images/about/ubclogo.jpeg',
            dark: '/assets/images/about/ubclogo.jpeg'
        },
        dateText: 'Jan 2021 - May 2021'
    },
    {
        title: 'Best Builders Ltd',
        subtitle: 'Carpenter Apprentice',
        shortDescription:
            'Developed a new lumber transportation approach that reduced average labor costs while leading a team of labourers during construction projects. Enhanced client relations through personal rapport-building and proactive conflict resolution.',
        skills: ['Construction Management', 'Team Coordination', 'Client Relationship Management', 'Operational Efficiency'],
        imageRefs: {
            light: '/assets/images/about/bestbuilders_logo.png',
            dark: '/assets/images/about/bestbuilders_logo.png'
        },
        dateText: 'Jun 2016 - Aug 2019'
    },
    {
        title: 'The Links at Hampton Cove',
        subtitle: 'Bartender',
        shortDescription:
            'Developed and introduced promotional activities to build company image by regularly providing on-the-ground insight and coordinating with upper management. Optimized customer service experience by strategically reorganizing bar supplies.',
        skills: ['Sales & Promotion', 'Stakeholder Collaboration', 'Operational Layouts', 'Customer Experience Improvement'],
        imageRefs: {
            light: '/assets/images/about/linkslogo.png',
            dark: '/assets/images/about/linkslogo.png'
        },
        dateText: 'Apr 2018 - Jul 2019'
    },
    {
        title: 'Speeds Pub',
        subtitle: 'Head Cook',
        shortDescription:
            'Promoted to Head Cook within six months due to outstanding leadership. Implemented a revamped kitchen layout, labeling systems, and cooking timers that accelerated order preparation times and reduced food waste. Further decreased employee turnover by fostering a positive work environment.',
        skills: ['Leadership', 'Operational Layouts', 'Training', 'Employee Relations'],
        imageRefs: {
            light: '/assets/images/about/speedslogo.jpeg',
            dark: '/assets/images/about/speedslogo.jpeg'
        },
        dateText: 'Jun 2013 - Jun 2016'
    }
];
