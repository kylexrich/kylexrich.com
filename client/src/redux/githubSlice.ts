import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import kylexrichApi from '../api/kylexrichAxios';
import { getRejectedValue, handleLoading, handleRejected } from './asyncThunkHelpers';
import { RESET_ALL_ERRORS } from './globalActions';
import { AxiosResponse } from 'axios';
import { BaseState } from './interfaces/BaseState';

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

export type GithubPullRequestMap = { [key: string]: GithubPullRequest[] };

export interface GithubState extends BaseState {
    pullRequests: GithubPullRequestMap;
}

// =================== Async thunks ===================
export const getPullRequests = createAsyncThunk<GithubPullRequestMap, string>(
    'github/getPullRequests',
    async (repositoryName, { rejectWithValue }) => {
        try {
            const response: AxiosResponse<GithubPullRequest[]> = await kylexrichApi.get<GithubPullRequest[]>(
                `/github/${repositoryName}/pull-requests`
            );
            return { [repositoryName]: response.data };
        } catch (error: unknown) {
            return rejectWithValue(getRejectedValue(error));
        }
    }
);

// =================== Initial state ===================
const initialState: GithubState = {
    loading: false,
    error: null,
    pullRequests: {}
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
            state.pullRequests = { ...state.pullRequests, ...action.payload };
            handleLoading(state, false);
        });
        builder.addMatcher(
            (action) => action.type === RESET_ALL_ERRORS,
            (state) => {
                state.error = null;
            }
        );
    }
});

export default githubSlice.reducer;
