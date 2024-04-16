export interface GithubLabel {
    id: number;
    node_id: string;
    url: string;
    name: string;
    description: string;
    color: string;
    default: boolean;
}

export interface GithubLabelDTO {
    name: string;
    description: string;
    color: string;
}
