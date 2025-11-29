import {AboutCardDetail} from './AboutCardDetail.ts';

export const extracurricularDetails: AboutCardDetail[] = [
    {
        title: 'Microsoft',
        subtitle: 'Student Ambassador',
        shortDescription:
            'Ran ambassador events and workshops while mentoring 50+ students about Microsoft, UBC, and technical learning paths.',
        longDescriptionParagraphs: [
            'Organized a career paths event connecting ~30 students with 6 Microsoft employees across technical roles; owned planning, agenda design, outreach, and live Q&A facilitation.',
            'Built and delivered a 60 minute advanced Microsoft Excel workshop to ~50 students with live demos and Q&A.',
            'Mentored 50+ students globally on university, career decisions, and learning paths into tech.'
        ],
        skills: ['Event Organization', 'Technical Workshops', 'Peer Engagement', 'Microsoft Technologies'],
        imageRefs: {
            light: '/assets/images/about/microsoftslalogo.png',
            dark: '/assets/images/about/microsoftslalogo.png'
        },
        dateText: 'Dec 2020 - May 2023',
        type: 'ambassador'
    },
    {
        title: 'UBC Toastmasters',
        subtitle: 'Member & Toastmaster',
        shortDescription:
            'Served as the Toastmaster on my second attendance, delivered multiple speeches, and organized a local ToastMasters competition for members to advance to the global stage.',
        skills: ['Public Speaking', 'Event Organization', 'Leadership', 'Content Delivery'],
        imageRefs: {
            light: '/assets/images/about/toastmasterslogo.jpeg',
            dark: '/assets/images/about/toastmasterslogo.jpeg'
        },
        dateText: 'Jan 2022 - May 2023',
        type: 'club'
    },
    {
        title: 'ThinkTECH | Deloitte x SFU',
        subtitle: 'Academic Competitor',
        shortDescription:
            'Placed 1st place out of 15 teams, directed technical analysis for Vancity\'s open banking space, and prototyped an integrated platform using the Plaid API.',
        skills: ['Technical Analysis', 'Open Banking', 'API Integration', 'Team Collaboration'],
        imageRefs: {light: '/assets/images/about/thinktechlogo.png', dark: '/assets/images/about/thinktechlogo.png'},
        dateText: 'Nov 2021 - Dec 2021',
        type: 'competition'
    },
    {
        title: 'BizHacks',
        subtitle: 'VP of Technology',
        shortDescription:
            'Led BizHacks tech team: hired/mentored five developers, rolled out Scrum, automated Kanban reporting, and shipped website improvements.',
        longDescriptionParagraphs: [
            'Hired and mentored a five-person developer team; defined engineering practices and delivery for the website and internal tools.',
            'Introduced Scrum (sprint planning, reviews, retros) across five BizHacks teams to improve cadence and accountability.',
            'Automated Kanban boards and a leadership dashboard that surfaced status, blockers, and throughput for faster prioritization.',
            'Iterated the website to clarify event details and streamline registration, improving information access for prospective attendees.'
        ],
        skills: ['Team Leadership', 'Agile Methodologies', 'Scrum', 'Web Development', 'Project Management'],
        imageRefs: {light: '/assets/images/about/bizhackslogo.png', dark: '/assets/images/about/bizhackslogo.png'},
        dateText: 'Sep 2021 - Dec 2021',
        type: 'club'
    },
    {
        title: 'UBC Tri-Mentorship Program',
        subtitle: 'Computer Science Mentee/Mentor',
        shortDescription:
            'Engaged regularly with an industry professional and advised a lower-year student on academics, programming, and career paths.',
        skills: ['Mentorship', 'Advice & Guidance', 'Networking'],
        imageRefs: {light: '/assets/images/about/ubclogo.jpeg', dark: '/assets/images/about/ubclogo.jpeg'},
        dateText: 'Sep 2020 - May 2021',
        type: 'mentorship'
    },
    {
        title: 'Langara Business Association',
        subtitle: 'Fundraising Coordinator',
        shortDescription:
            'Coordinated LBA fundraisers and workshops, lifting average event revenue by $2,000+ through tighter planning, marketing, and team coordination.',
        longDescriptionParagraphs: [
            'Raised average funds per event by $2,000+ by tightening budgets, vendor coordination, and runbooks.',
            'Led end to end execution for workshops and fundraisers, translating member ideas into plans, budgets, logistics, and day-of operations.',
            'Drove data-driven marketing that increased faculty donations by 20% and boosted professor participation.',
            'Organized team building activities that improved engagement and reduced volunteer turnover.'
        ],
        skills: ['Event Planning', 'Fundraising', 'Data-Driven Marketing', 'Team Leadership'],
        imageRefs: {
            light: '/assets/images/about/langarabalogo.jpeg',
            dark: '/assets/images/about/langarabalogo.jpeg'
        },
        dateText: 'Sep 2018 - Apr 2019',
        type: 'club'
    },
    {
        title: 'CPA BC Case Competition',
        subtitle: 'Academic Competitor',
        shortDescription:
            'Placed 3rd place among 64 teams. Directed analysis, recommendations, and implementation to improve Dropox\'s competitive positioning and drive customer satisfaction. Watch the submission: https://www.youtube.com/watch?v=iLMz1SPIGJM',
        skills: ['Strategic Analysis', 'Team Collaboration', 'Case Study Analysis'],
        imageRefs: {light: '/assets/images/about/cpalogo.jpeg', dark: '/assets/images/about/cpalogo.jpeg'},
        dateText: 'Jan 2019 - Mar 2019',
        type: 'competition'
    },
    {
        title: 'OWL Orphaned Wildlife Rehabilitation Society',
        subtitle: 'Tour Guide and Bird Care',
        shortDescription:
            'Played an key role in the rehabilitation of orphaned wildlife, providing guided tours and ensuring the well-being and care of the birds.',
        skills: ['Animal Welfare', 'Public Speaking', 'Wildlife Rehabilitation'],
        imageRefs: {light: '/assets/images/about/owllogo.png', dark: '/assets/images/about/owllogo.png'},
        dateText: 'Dec 2014 - Sep 2015',
        type: 'volunteer'
    }
];
