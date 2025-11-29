export interface ProjectLink {
    label: string;
    url: string;
    isExternal?: boolean;
}

export interface ProjectMedia {
    type: 'image' | 'video';
    src: string;
    label?: string;
}

export interface Project {
    id: string;
    title: string;
    timeframe: string;
    workType: string;
    descriptionPreview: string;
    description: string;
    techTags: string[];
    workTypeTags: string[];
    highlights: string[];
    team?: string[];
    links: ProjectLink[];
    cover: string;
    media?: ProjectMedia[];
}

export const projects: Project[] = [
    {
        id: 'coursegpt',
        title: 'CourseGPT',
        timeframe: '2023',
        workType: 'full-stack web app',
        descriptionPreview: 'Professor-trained AI teaching assistant that answers course-specific questions instantly',
        description: 'CourseGPT is more than an AI app - it\'s a vision for a more responsive, personalized education system. By allowing professors to train Al models on-demand, students gain immediate access to course-specific materials and logistical details. Professors and TA\'s can sit back and relax with a personal AI assistant managing repetitive Q&A, while students can enjoy instant answers to questions for all of their courses in one place.',
        techTags: [
            'JavaScript',
            'React',
            'Redux',
            'Redux Toolkit',
            'Chakra UI',
            'Framer Motion',
            'Chart.js',
            'MongoDB',
            'OpenAI API',
            'TensorFlow.js',
            'JWT',
            'Passport',
            'Google OAuth',
            'Heroku'
        ],
        workTypeTags: ['Full Stack'],
        highlights: [
            'Professors upload PDFs or text to train each course model so students get answers with the right class context.',
            'Chat UI includes history, fuzzy search across conversations, favorites, prompt suggestions, feedback, copy to clipboard, and profile settings.',
            'Training pipeline chunks and embeds uploads, polls long-running jobs, and feeds analytics dashboards with sentiment and usage charts.'
        ],
        team: ['Amy Jo', 'Carolyn Huang', 'Ritik Keswani', 'Duffy Du'],
        links: [
            {label: 'CourseGPT (wait 30s)', url: 'https://course-gpt.herokuapp.com/'},
            {label: 'GitHub', url: 'https://github.com/kylexrich/coursegpt'}
        ],
        cover: '/assets/images/projects/coursegpt/hero.png',
        media: [
            {type: 'video', src: 'https://www.youtube.com/embed/E03N5ZUhKmY', label: 'Demo'},
            {type: 'image', src: '/assets/images/projects/coursegpt/hero.png', label: 'Chat'},
            {type: 'image', src: '/assets/images/projects/coursegpt/search.png', label: 'Search'},
            {type: 'image', src: '/assets/images/projects/coursegpt/login.png', label: 'Login'}
        ]
    },
    {
        id: 'new-kyle-rich-site',
        title: 'kylexrich.com',
        timeframe: '2025',
        workType: 'full-stack portfolio',
        descriptionPreview: 'Portfolio with animated showcases and an admin login so I can make updates quickly',
        description: 'Full-stack portfolio built to showcase my work and experiment with new ideas.',
        techTags: [
            'TypeScript',
            'React',
            'Redux Toolkit',
            'Chakra UI',
            'Framer Motion',
            'MongoDB',
            'JWT',
            'GitHub API',
            'AWS S3',
            'Heroku'
        ],
        workTypeTags: ['Full Stack', 'Website'],
        highlights: [
            'Animated projects grid with detail modals, tag filters, and light/dark + accent themes powered by Chakra UI and Framer Motion.',
            'Admin portal with JWT login, Express/Mongo APIs for editing site content, and GitHub changelog ingestion.',
            'Heroku staging and production pipelines with environment-aware builds and scripts that run client and server together.'
        ],
        links: [
            {label: 'Production', url: 'https://kylerich.com'},
            {label: 'Staging', url: 'https://kylexrich-staging-d5a9dbd6a715.herokuapp.com/'},
            {label: 'Github', url: 'https://github.com/kylexrich/kylexrich.com'}
        ],
        cover: '/assets/images/projects/new-kyle-rich-site/cover.png',
        media: [
            {type: 'image', src: '/assets/images/projects/new-kyle-rich-site/cover.png', label: 'Homepage'}
        ]
    },
    {
        id: 'map-generator-language',
        title: 'Map Generator Language (.mg)',
        timeframe: '2024',
        workType: 'VS Code extension + DSL',
        descriptionPreview: 'DSL + VS Code extension to script 2D maps and preview them instantly',
        description: 'Toolkit that lets planners and developers define repeatable 2D maps in a purpose-built DSL, then preview the output without leaving VS Code. Authors script markers, roads, buildings, and water with functions and control flow while the extension linted and rendered the maps through an Express + Google Maps preview service.',
        techTags: ['TypeScript', 'Language Server', 'VS Code Extension', 'DSL', 'ANTLR4', 'Google Maps API'],
        workTypeTags: ['Developer Tool'],
        highlights: [
            '.mg language supports functions, loops, recursion, and CREATE statements to place markers, roads, polygons, and set canvas size.',
            'VS Code extension highlights the language with semantic tokens and shows inline diagnostics while you write maps.',
            'An Open Map command sends the current .mg file to an Express + Google Maps preview at localhost:1337 for instant renders.'
        ],
        team: ['Maxwell Yang', 'Michael Cheung', 'Eric Yan', 'Aidan Perras'],
        links: [
            {label: 'Github', url: 'https://github.com/kylexrich/map-generator/tree/main'}
        ],
        cover: '/assets/images/projects/map-generator/best-complete-map.png',
        media: [
            {type: 'video', src: 'https://www.youtube.com/embed/Z73PQD5kL8Y', label: 'Map generator demo'},
            {type: 'image', src: '/assets/images/projects/map-generator/best-complete-map.png', label: 'Rendered map from .mg program'}
        ]
    },
    {
        id: 'c-memory-leak-detector',
        title: 'C Memory Leak Detector',
        timeframe: '2024',
        workType: 'VS Code memory analyzer',
        descriptionPreview: 'VS Code language extension that statically flags definite and possible C heap leaks',
        description: 'Language server that gives C developers early, in-editor warnings about leaking heap allocations by analyzing clang ASTs.',
        techTags: ['C', 'TypeScript', 'Language Server', 'VS Code Extension', 'Clang'],
        workTypeTags: ['Developer Tool'],
        highlights: [
            'Static leak checks run on any open C file in VS Code, parsing clang JSON ASTs and showing inline diagnostics without executing code.',
            'Three-state heap tracker follows malloc/calloc/realloc, frees, and pointer assignments through branches, loops, and function calls to surface definite vs possible leaks and double-frees.',
            'Control-flow and struct-aware analysis unrolls loops 0/1/2 iterations, models nested structs, and keeps scope cleanup accurate so warnings stay precise.'
        ],
        team: ['Maxwell Yang', 'Michael Cheung', 'Eric Yan', 'Aidan Perras'],
        links: [
            {label: 'Github', url: 'https://github.com/kylexrich/c-memory-leak-detector/tree/main'}
        ],
        cover: '/assets/images/projects/c-memory-leak-detector/cover.png',
        media: [
            {type: 'video', src: 'https://www.youtube.com/embed/uelnd_E9BJY', label: 'C memory leak detector walkthrough'}
        ]
    },
    {
        id: 'devsocial',
        title: 'DevSocial',
        timeframe: 'May 2021',
        workType: 'Full-stack web app',
        descriptionPreview: 'Developer network with GitHub-integrated profiles, post sharing, comments, and likes',
        description: 'Community app that lets developers showcase experience and education, surface GitHub repos, and discuss in an authenticated feed. Built as a MERN stack project with JWT-backed profiles and content moderation, then deployed to Heroku.',
        techTags: ['JavaScript', 'React', 'Redux', 'MongoDB', 'JWT', 'GitHub API', 'Heroku'],
        workTypeTags: ['Full Stack'],
        highlights: [
            'Email/password login with JWT secures profiles where developers fill in skills, experience, education, and social links.',
            'Community feed supports posts, comments, likes/unlikes, and owners can delete their posts from the React/Redux UI.',
            'Profiles display GitHub repo cards via the GitHub API, and the MERN stack runs on Heroku.'
        ],
        links: [
            {label: 'DevSocial (wait 30s)', url: 'https://devsocial.herokuapp.com/'},
            {label: 'Github', url: 'https://github.com/kyledvrich/DevSocial'}
        ],
        cover: '/assets/images/projects/devsocial/cover.png',
        media: [
            {type: 'image', src: '/assets/images/projects/devsocial/detail.png', label: 'Dashboard'},
            {type: 'image', src: '/assets/images/projects/devsocial/posts.png', label: 'Posts feed'},
            {type: 'image', src: '/assets/images/projects/devsocial/profile.png', label: 'Profile view'}
        ]
    },
    {
        id: 'inhabitation',
        title: 'inHABITation',
        timeframe: 'October 2020',
        workType: 'desktop app',
        descriptionPreview: 'Gamified habit tracker that turns daily goals into XP races to keep users engaged',
        description: 'Habit app built at DubHacks 2020 to keep friends accountable by turning goals into XP races instead of checklists.',
        techTags: ['Java', 'JavaFX', 'JSON'],
        workTypeTags: ['Desktop App'],
        highlights: [
            'Habit creator lets you set difficulty, choose which days per week to complete it, and tie progress to XP races.',
            'Friends list supports adding/removing friends and an analytics dashboard compares your stats to friends and highlights your own trends.',
            'DubHacks emailed to explain our project was just shy of the top 3; with UI being the primary concern.'
        ],
        team: ['Martin Yushko'],
        links: [
            {label: 'XP Chart (prototype doc)', url: '/assets/files/xpchart.xlsx'}
        ],
        cover: '/assets/images/projects/inhabitation/cover.png',
        media: [
            {type: 'video', src: 'https://www.youtube.com/embed/peC0Fc_Y1c8', label: 'Demo video'},
            {type: 'image', src: '/assets/images/projects/inhabitation/cover.png', label: 'Screenshot'}
        ]
    },
    {
        id: 'dark-mode-todo',
        title: 'Dark Mode Todo App',
        timeframe: 'September 2020',
        workType: 'Desktop app',
        descriptionPreview: 'Desktop to-do manager with a dark UI, smart filters, and JSON auto-save so tasks stay organized offline',
        description: 'Desktop productivity app built to keep tasks organized offline while I practiced Java, Swing UI composition, and file-backed storage in a dark-themed experience.',
        techTags: ['Java', 'Java Swing', 'JSON'],
        workTypeTags: ['Desktop App'],
        highlights: [
            'Dark-mode desktop to-do list with tasks that track name, due date, category, priority, and completion.',
            'Smart filters show overdue, due today/7/30 days, by priority/category, or completion state, with a toggle for match-any vs match-all.',
            'Tasks save to JSON (optional auto-save) and play subtle audio cues when you add, complete, or delete items.'
        ],
        links: [
            {label: 'Github', url: 'https://github.com/kyledvrich/Dark-Mode-Todo-App'}
        ],
        cover: '/assets/images/projects/dark-mode-todo/cover.jpg',
        media: [
            {type: 'image', src: '/assets/images/projects/dark-mode-todo/detail.png', label: 'Interface preview'}
        ]
    },
    {
        id: 'kyle-rich-site',
        title: 'Kyle Rich (Legacy)',
        timeframe: 'August 2020',
        workType: 'Personal website (legacy)',
        descriptionPreview: 'First personal site built from a customized Bootstrap template to showcase projects',
        description: 'Early portfolio that helped me learn front-end basics while sharing projects. I heavily customized a HTML/Bootstrap template, restructured markup, tuned styling/scripts, and deployed the static site via GitHub and FileZilla.',
        techTags: ['HTML', 'CSS', 'JavaScript'],
        workTypeTags: ['Website'],
        highlights: [
            'Single-page portfolio with education timeline, skills lists, and a filtered portfolio grid for projects, websites, videos, and more.',
            'Portfolio cards open AJAX modals with project details and media; education section links directly to transcript and certifications.',
            'Bootstrap-based template heavily customized in HTML/CSS/JS and shipped as a static site via HostGator plus FileZilla uploads.'
        ],
        links: [
            {label: 'Open legacy site', url: '/assets/old-kylerich.com/index.html'}
        ],
        cover: '/assets/images/projects/old-kyle-rich-site/cover.png',
        media: [
            {type: 'image', src: '/assets/images/projects/old-kyle-rich-site/detail.png', label: 'Homepage detail'}
        ]
    },
    {
        id: 'smudge-twins',
        title: 'Smudge Twins',
        timeframe: 'May 2018',
        workType: 'Client website',
        descriptionPreview: 'Branded custom WordPress site driving business for The Smudge Twins',
        description: 'Marketing site built on WordPress to showcase The Smudge Twins services and pricing, align the look to their brand, and capture client inquiries without friction.',
        techTags: ['JavaScript', 'CSS', 'HTML', 'WordPress'],
        workTypeTags: ['Client Work', 'Website'],
        highlights: [
            'WordPress marketing site built with custom HTML/CSS/JS (no off-the-shelf theme) to fit Smudge Twins branding and pricing.',
            'Navigation, services, and pricing sections are structured to drive visitors into the contact/booking call-to-action.',
            'Custom styling, imagery, and content handoff so the client could keep updating the site after launch.'
        ],
        links: [
            {label: 'Visit site', url: 'http://smudgetwins.com/'}
        ],
        cover: '/assets/images/projects/smudge-twins/cover.jpg',
        media: [
            {type: 'image', src: '/assets/images/projects/smudge-twins/detail.png', label: 'Homepage preview'}
        ]
    },
    {
        id: 'green-and-rich',
        title: 'Green and Rich Productions',
        timeframe: 'July 2017 - September 2018',
        workType: 'Side business',
        descriptionPreview: 'Portfolio and pricing site that helped Green and Rich Productions win video clients',
        description: 'Launched a small production company with Travis Green and photographer Taylor Brown and used a WordPress site as the sales front door. The site packaged our portfolio, pricing, and contact flows that led to client wins like the Kneebone Wedding and multiple property videos.',
        techTags: ['JavaScript', 'CSS', 'HTML', 'WordPress'],
        workTypeTags: ['Client Work', 'Website'],
        highlights: [
            'WordPress site assembled with custom HTML/CSS/JS (no prebuilt theme) to showcase reels, pricing, and services.',
            'Portfolio galleries and package pages funnel visitors into contact and booking requests.',
            'Site served as the sales front door that helped land Kneebone Wedding and multiple property video clients.'
        ],
        team: ['Travis Green', 'Taylor Brown'],
        links: [],
        cover: '/assets/images/projects/green-and-rich/cover.png',
        media: [
            {type: 'image', src: '/assets/images/projects/green-and-rich/slide-1.jpeg', label: 'Homepage hero'},
            {type: 'image', src: '/assets/images/projects/green-and-rich/slide-2.jpg', label: 'Branding variation'}
        ]
    },
    {
        id: 'kneebone-wedding',
        title: 'Kneebone Wedding',
        timeframe: 'September 2017',
        workType: 'Client video',
        descriptionPreview: 'Wedding highlight film delivered to Jessica and Daniel Kneebone',
        description: 'Produced a wedding highlight film for Jessica and Daniel Kneebone so they could share a polished recap of their day with family and friends.',
        techTags: ['DaVinci Resolve', 'Adobe Premiere Pro'],
        workTypeTags: ['Client Work', 'Video'],
        highlights: [
            'Shot full-day coverage focused on moments the couple wanted to remember and share.',
            'Cut a cinematic highlight with music sync and color grading in DaVinci Resolve/Premiere.',
            'Delivered a web-ready video so the couple could stream and share easily.'
        ],
        team: ['Travis Green'],
        links: [
            {label: 'Watch on Vimeo', url: 'https://vimeo.com/235849277'}
        ],
        cover: '/assets/images/projects/kneebone-wedding/cover.png',
        media: [
            {type: 'video', src: 'https://player.vimeo.com/video/235849277', label: 'Highlight film'},
            {type: 'image', src: '/assets/images/projects/kneebone-wedding/cover.png', label: 'Thumbnail'}
        ]
    },
    {
        id: 'buddha-cottage',
        title: 'Buddha Cottage',
        timeframe: 'October 2017',
        workType: 'Client video',
        descriptionPreview: 'Promo video boosting bookings for the Buddha Cottage vacation rental',
        description: 'Created a promo video for Buddha Cottage to help the vacation rental attract more bookings by showcasing the space and surroundings.',
        techTags: ['DaVinci Resolve', 'Adobe Premiere Pro'],
        workTypeTags: ['Client Work', 'Video'],
        highlights: [
            'Captured aerial and interior footage to showcase the property.',
            'Edited and color graded the footage in DaVinci Resolve and Premiere Pro.',
            'Coordinated delivery and distribution instructions with the client.'
        ],
        team: ['Travis Green'],
        links: [
            {label: 'Vimeo', url: 'https://vimeo.com/257814976'},
            {label: 'Client site', url: 'https://bcislandviews.com'}
        ],
        cover: '/assets/images/projects/buddha-cottage/cover.jpg',
        media: [
            {type: 'video', src: 'https://player.vimeo.com/video/257814976', label: 'Promo video'},
            {type: 'image', src: '/assets/images/projects/buddha-cottage/cover.jpg', label: 'Thumbnail'}
        ]
    },
    {
        id: 'whale-pod-chalet',
        title: 'Whale Pod Chalet',
        timeframe: 'October 2017',
        workType: 'Client video',
        descriptionPreview: 'Promo video boosting bookings for the Whale Pod Chalet vacation rental',
        description: 'Produced a promo video for Whale Pod Chalet to boost rental bookings by showing the property with aerials and interior walkthroughs.',
        techTags: ['DaVinci Resolve', 'Adobe Premiere Pro'],
        workTypeTags: ['Client Work', 'Video'],
        highlights: [
            'Captured aerial and interior footage to showcase the property.',
            'Edited and color graded the footage in DaVinci Resolve and Premiere Pro.',
            'Coordinated delivery and distribution instructions with the client.'
        ],
        team: ['Travis Green'],
        links: [
            {label: 'Vimeo', url: 'https://vimeo.com/257813260'},
            {label: 'Client site', url: 'https://bcislandviews.com'}
        ],
        cover: '/assets/images/projects/whale-pod-chalet/cover.jpg',
        media: [
            {type: 'video', src: 'https://player.vimeo.com/video/257813260', label: 'Feature video'},
            {type: 'image', src: '/assets/images/projects/whale-pod-chalet/cover.jpg', label: 'Thumbnail'}
        ]
    }
];
