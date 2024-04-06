import { GithubUser } from './GithubUser';
import { GithubRepo } from './GithubRepo';
import { GithubLabel, GithubLabelDTO } from './GitHubLabel';
import { GithubMilestone } from './GithubMilestone';
import { GithubTeam } from './GithubTeam';

export interface GithubPullRequest {
    url: string;
    id: number;
    node_id: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
    issue_url: string;
    number: number;
    state: string;
    locked: boolean;
    title: string;
    user: GithubUser;
    body: string;
    created_at: string;
    updated_at: string;
    closed_at: string;
    merged_at: string;
    merge_commit_sha: string | null;
    assignee: GithubUser | null;
    assignees: GithubUser[];
    requested_reviewers: GithubUser[];
    labels: GithubLabel[];
    milestone: GithubMilestone | null;
    requested_teams: GithubTeam[];
    draft: boolean;
    commits_url: string;
    review_comments_url: string;
    review_comment_url: string;
    comments_url: string;
    statuses_url: string;
    head: {
        label: string;
        ref: string;
        sha: string;
        user: GithubUser;
        repo: GithubRepo;
    };
    base: {
        label: string;
        ref: string;
        sha: string;
        user: GithubUser;
        repo: GithubRepo;
    };
    _links: {
        self: { href: string };
        html: { href: string };
        issue: { href: string };
        comments: { href: string };
        review_comments: { href: string };
        review_comment: { href: string };
        commits: { href: string };
        statuses: { href: string };
    };
    author_association: string;
    auto_merge: null;
    active_lock_reason: null;
}

export interface GithubPullRequestDTO {
    title: string;
    body: string;
    state: string;
    html_url: string;
    merged_at: string;
    labels: GithubLabelDTO[];
}
