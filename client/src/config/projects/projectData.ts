import {projectImageSamples} from './projectImages.ts';

export interface ProjectMetric {
    label: string;
    value: string;
}

export interface ProjectLink {
    label: string;
    url: string;
}

export interface Project {
    id: string;
    title: string;
    timeframe: string;
    summary: string;
    description: string;
    tags: string[];
    contributions: string[];
    metrics: ProjectMetric[];
    links: ProjectLink[];
    image: string;
}

export const projects: Project[] = [
    {
        id: 'realtime-collaboration-dashboard',
        title: 'Realtime Collaboration Dashboard',
        timeframe: '2023 – Present',
        summary: 'Shared analytics workspace for async product squads.',
        description: 'A composable dashboard surface that keeps distributed product teams aligned through live instrumentation, collaborative canvas editing, and asynchronous storytelling.',
        tags: ['Full-Stack', 'Realtime', 'Analytics', 'Design Systems'],
        contributions: [
            'Implemented a conflict-free layout engine that keeps up with 12+ simultaneous editors over WebSocket sessions.',
            'Launched diff-aware event ingestion that hydrates dashboards within 250ms while preserving historical context.',
            'Crafted a design-system driven card library so squads can author narrative walkthroughs without leaving the workspace.'
        ],
        metrics: [
            {label: 'Stack', value: 'React • Chakra UI • Node • WebSockets • Redis'},
            {label: 'Team', value: '2 engineers, 1 designer, 1 PM'},
            {label: 'Impact', value: '20% faster launch reviews across product pods'}
        ],
        links: [
            {label: 'Case Study', url: 'https://example.com/collaboration-dashboard'},
            {label: 'Prototype', url: 'https://example.com/collaboration-demo'}
        ],
        image: projectImageSamples[0]
    },
    {
        id: 'personal-knowledge-graph',
        title: 'Personal Knowledge Graph',
        timeframe: '2022 – 2023',
        summary: 'Semantic search over daily research notes and engineering decisions.',
        description: 'An offline-first knowledge base that continuously enriches notes with embeddings, relationships, and resurfacing heuristics so that ideas stay discoverable.',
        tags: ['AI', 'Research Ops', 'Productivity', 'Offline-first'],
        contributions: [
            'Built nightly ingestion pipeline that synthesises notebooks, highlights, and meeting transcripts into a unified schema.',
            'Trained a domain-specific embedding model for intent-aware search and spaced repetition recommendations.',
            'Designed backlink explorer and timeline views for tracing how insights evolve across projects.'
        ],
        metrics: [
            {label: 'Stack', value: 'Next.js • TypeScript • Prisma • SQLite • OpenAI embeddings'},
            {label: 'Library', value: '45k+ notes and decisions indexed'},
            {label: 'Outcome', value: 'Reduced duplicate research requests by 35%'}
        ],
        links: [
            {label: 'Architecture', url: 'https://example.com/knowledge-graph-architecture'},
            {label: 'Demo Clip', url: 'https://example.com/knowledge-graph-demo'}
        ],
        image: projectImageSamples[1]
    },
    {
        id: 'infra-cost-insights',
        title: 'Infra Cost Insights',
        timeframe: '2021 – 2022',
        summary: 'FinOps observability that keeps cloud spend ahead of the finance review.',
        description: 'Anomaly detection and alerting layer that translates infrastructure usage into actionable narratives for engineering and finance leaders.',
        tags: ['FinOps', 'Observability', 'Automation', 'Dashboards'],
        contributions: [
            'Integrated AWS, GCP, and Snowflake billing exports with daily rollups for 14 business units.',
            'Shipped alert workflows that map runaway services to accountable teams in under five minutes.',
            'Authored executive scorecards and forecast visualisations for quarterly planning.'
        ],
        metrics: [
            {label: 'Stack', value: 'React • Chakra UI • NestJS • BigQuery • dbt'},
            {label: 'Coverage', value: '>$8M annual cloud portfolio monitored'},
            {label: 'Result', value: 'Cut surprise overages by 28% within two quarters'}
        ],
        links: [
            {label: 'Write-up', url: 'https://example.com/infra-cost-insights'},
            {label: 'Playbook', url: 'https://example.com/finops-playbook'}
        ],
        image: projectImageSamples[2]
    },
];
