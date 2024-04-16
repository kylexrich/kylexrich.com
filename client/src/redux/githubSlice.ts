import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BaseState} from './interfaces/BaseState.ts';
import {AxiosResponse} from 'axios';
import kylexrichApi from '../api/kylexrichAxios.ts';
import {getRejectedValue, handleLoading, handleRejected} from './asyncThunkHelpers.ts';
import {RESET_ALL_ERRORS} from './globalActions.ts';

// =================== Types ===================
export interface GithubLabel {
    name: string;
    description: string;
    color: string;
}

export interface GithubPullRequest {
    title: string;
    body: string;
    state: string;
    html_url: string;
    merged_at: string;
    labels: GithubLabel[];
}

export type GithubPullRequestMap = Record<string, GithubPullRequest[]>;

export interface GithubRepo {
    name: string;
    full_name: string;
    html_url: string;
    description: string;
    fork: boolean;
    url: string;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    forks_count: number;
    open_issues_count: number;
}

export interface GithubState extends BaseState {
    pullRequests: GithubPullRequestMap;
    repositories: GithubRepo[];
}

// =================== Async thunks ===================
export const getPullRequests = createAsyncThunk<GithubPullRequestMap, string>('github/getPullRequests', async (repositoryName, {rejectWithValue}) => {
    try {
        const response: AxiosResponse<GithubPullRequest[]> = await kylexrichApi.get<GithubPullRequest[]>(`/github/${repositoryName}/pull-requests`);
        return {[repositoryName]: response.data};
    } catch (error: unknown) {
        return rejectWithValue(getRejectedValue(error));
    }
});

export const getGithubRepositories = createAsyncThunk<GithubRepo[], void>('github/getGithubRepositories', async (_, {rejectWithValue}) => {
    try {
        const response: AxiosResponse<GithubRepo[]> = await kylexrichApi.get<GithubRepo[]>('/github/repositories');
        return response.data;
    } catch (error: unknown) {
        return rejectWithValue(getRejectedValue(error));
    }
});

// =================== Initial state ===================
const initialState: GithubState = {
    loading: false,
    error: null,
    pullRequests: {},
    repositories: []
};

// =================== Slice ===================
export const KYLEXRICH_DOT_COM = 'kylexrich.com';

const githubSlice = createSlice({
    name: 'github',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPullRequests.pending, (state: GithubState) => handleLoading(state, true));
        builder.addCase(getPullRequests.rejected, (state: GithubState, action: PayloadAction<unknown>) => handleRejected(state, action));
        builder.addCase(getPullRequests.fulfilled, (state: GithubState, action: PayloadAction<GithubPullRequestMap>) => {
            state.pullRequests = {...state.pullRequests, ...action.payload};
            handleLoading(state, false);
        });
        builder.addCase(getGithubRepositories.pending, (state: GithubState) => handleLoading(state, true));
        builder.addCase(getGithubRepositories.rejected, (state: GithubState, action: PayloadAction<unknown>) => handleRejected(state, action));
        builder.addCase(getGithubRepositories.fulfilled, (state: GithubState, action: PayloadAction<GithubRepo[]>) => {
            state.repositories = action.payload;
            handleLoading(state, false);
        });
        builder.addMatcher((action: PayloadAction<string>) => action.type === RESET_ALL_ERRORS, (state: GithubState) => {
            state.error = null;
        });
    }
});

export default githubSlice.reducer;
