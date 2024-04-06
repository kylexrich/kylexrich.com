export interface GithubTeam {
    id: number;
    node_id: string;
    url: string;
    html_url: string;
    name: string;
    slug: string;
    description: string;
    privacy: string;
    permission: string;
    notification_setting?: string;
    members_url: string;
    repositories_url: string;
}
