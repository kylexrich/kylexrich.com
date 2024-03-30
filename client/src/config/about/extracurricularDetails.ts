import { IGenericAboutCardDetail } from './IGenericAboutDetail';

export type ExtracurricularDetail = IGenericAboutCardDetail;

export const extracurricularDetails: ExtracurricularDetail[] = [
    {
        title: 'Microsoft',
        subtitle: 'Student Ambassador',
        shortDescription:
            'Collaborated with campus clubs to run tech workshops and events, organized an event with 30 students and 6 Microsoft employees, hosted an advanced Microsoft Excel workshop, and engaged with over 50 students globally about UBC and Microsoft.',
        skills: ['Event Organization', 'Technical Workshops', 'Peer Engagement', 'Microsoft Technologies'],
        logoRef: '/assets/images/about/microsoftslalogo.png',
        dateText: 'Dec 2020 - May 2023',
        type: 'ambassador'
    },
    {
        title: 'UBC Toastmasters',
        subtitle: 'Member & Toastmaster',
        shortDescription:
            'Served as the Toastmaster on my second attendance, delivered multiple speeches, and organized a local ToastMasters competition for members to advance to the global stage.',
        skills: ['Public Speaking', 'Event Organization', 'Leadership', 'Content Delivery'],
        logoRef: '/assets/images/about/toastmasterslogo.jpeg',
        dateText: 'Jan 2022 - May 2023',
        type: 'club'
    },
    {
        title: 'ThinkTECH | Deloitte x SFU',
        subtitle: 'Academic Competitor',
        shortDescription:
            "Placed 1st place out of 15 teams, directed technical analysis for Vancity's open banking space, and prototyped an integrated platform using the Plaid API.",
        skills: ['Technical Analysis', 'Open Banking', 'API Integration', 'Team Collaboration'],
        logoRef: '/assets/images/about/thinktechlogo.png',
        dateText: 'Nov 2021 - Dec 2021',
        type: 'competition'
    },
    {
        title: 'BizHacks',
        subtitle: 'VP of Technology',
        shortDescription:
            'Mentored a team of 5 developers to improve the BizHacks website, introduced Agile and Scrum methodologies, and built automated kanban boards and management dashboards.',
        skills: ['Team Leadership', 'Agile Methodologies', 'Scrum', 'Web Development', 'Project Management'],
        logoRef: '/assets/images/about/bizhackslogo.png',
        dateText: 'Sep 2021 - Dec 2021',
        type: 'club'
    },
    {
        title: 'UBC Tri-Mentorship Program',
        subtitle: 'Computer Science Mentee/Mentor',
        shortDescription:
            'Engaged regularly with an industry professional and advised a lower-year student on academics, programming, and career paths.',
        skills: ['Mentorship', 'Advice & Guidance', 'Networking'],
        logoRef: '/assets/images/about/ubclogo.jpeg',
        dateText: 'Sep 2020 - May 2021',
        type: 'mentorship'
    },
    {
        title: 'Langara Business Association',
        subtitle: 'Fundraising Coordinator',
        shortDescription:
            'Consolidated member ideas into event plans and managed event logistics, hosted team-building events to reduce club turnover, increased average raised capital by over $2000, and implemented data-driven marketing to engage more professors.',
        skills: ['Event Planning', 'Fundraising', 'Data-Driven Marketing', 'Team Leadership'],
        logoRef: '/assets/images/about/langarabalogo.jpeg',
        dateText: 'Sep 2018 - Apr 2019',
        type: 'club'
    },
    {
        title: 'CPA BC Case Competition',
        subtitle: 'Academic Competitor',
        shortDescription:
            'Placed 3rd place among 64 teams. Directed analysis, recommendations, and implementation to improve Dropox’s competitive positioning and drive customer satisfaction',
        skills: ['Strategic Analysis', 'Team Collaboration', 'Case Study Analysis'],
        logoRef: '/assets/images/about/cpalogo.jpeg',
        dateText: 'Jan 2019 - Mar 2019',
        type: 'competition'
    },
    {
        title: 'OWL Orphaned Wildlife Rehabilitation Society',
        subtitle: 'Tour Guide and Bird Care',
        shortDescription:
            'Played an key role in the rehabilitation of orphaned wildlife, providing guided tours and ensuring the well-being and care of the birds.',
        skills: ['Animal Welfare', 'Public Speaking', 'Wildlife Rehabilitation'],
        logoRef: '/assets/images/about/owllogo.png',
        dateText: 'Dec 2014 - Sep 2015',
        type: 'volunteer'
    }
];
