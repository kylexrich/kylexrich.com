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

export interface GithubState extends BaseState {
    websitePullRequests: GithubPullRequest[];
}

// =================== Async thunks ===================
export const getWebsitePullRequests = createAsyncThunk<GithubPullRequest[], void>(
    'github/getWebsitePullRequests',
    async (_, { rejectWithValue }) => {
        try {
            const response: AxiosResponse<GithubPullRequest[]> = await kylexrichApi.get<GithubPullRequest[]>('/github/pull-requests');
            return response.data;
        } catch (error: unknown) {
            return rejectWithValue(getRejectedValue(error));
        }
    }
);

// =================== Initial state ===================
const initialState: GithubState = {
    loading: false,
    error: null,
    websitePullRequests: []
};

// =================== Slice ===================
const githubSlice = createSlice({
    name: 'github',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getWebsitePullRequests.pending, (state: GithubState) => handleLoading(state, true));
        builder.addCase(getWebsitePullRequests.rejected, (state: GithubState, action: PayloadAction<unknown>) =>
            handleRejected(state, action)
        );
        builder.addCase(getWebsitePullRequests.fulfilled, (state: GithubState, action: PayloadAction<GithubPullRequest[]>) => {
            state.websitePullRequests = action.payload;
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
