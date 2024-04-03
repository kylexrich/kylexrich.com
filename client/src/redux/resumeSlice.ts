// resumeSlice.ts

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getRejectedValue, handleLoading, handleRejected } from './asyncThunkHelpers';
import kylexrichApi from '../api/kylexrichAxios';
import { RESET_ALL_ERRORS } from './globalActions';
import { BaseState } from './interfaces/BaseState';
import { AxiosResponse } from 'axios';

// =================== Types ===================
export interface ResumeState extends BaseState {
    recentResumeBlobUrl: string | null;
}

// =================== Async thunks ===================
export const fetchLatestResume = createAsyncThunk<string>('resume/fetchLatestResume', async (_, { rejectWithValue }) => {
    try {
        const response: AxiosResponse<Blob> = await kylexrichApi.get<Blob>(`/resume/latest`, { responseType: 'blob' });
        return URL.createObjectURL(response.data);
    } catch (error: unknown) {
        return rejectWithValue(getRejectedValue(error));
    }
});

export const uploadResume = createAsyncThunk<string, File>('resume/uploadResume', async (file: File, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('resume', file);
    try {
        const response: AxiosResponse<Blob> = await kylexrichApi.post<Blob>('/resume', formData, { responseType: 'blob' });
        return URL.createObjectURL(response.data);
    } catch (error: unknown) {
        return rejectWithValue(getRejectedValue(error));
    }
});

// =================== Initial state ===================
const initialState: ResumeState = {
    recentResumeBlobUrl: null,
    loading: false,
    error: null
};

// =================== Slice ===================
const resumeSlice = createSlice({
    name: 'resume',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(uploadResume.pending, (state: ResumeState) => handleLoading(state, true));
        builder.addCase(uploadResume.rejected, (state: ResumeState, action: PayloadAction<unknown>) => handleRejected(state, action));
        builder.addCase(uploadResume.fulfilled, (state: ResumeState, action: PayloadAction<string>) => {
            state.recentResumeBlobUrl = action.payload;
            handleLoading(state, false);
        });
        builder.addCase(fetchLatestResume.pending, (state: ResumeState) => handleLoading(state, true));
        builder.addCase(fetchLatestResume.rejected, (state: ResumeState, action: PayloadAction<unknown>) => handleRejected(state, action));
        builder.addCase(fetchLatestResume.fulfilled, (state: ResumeState, action: PayloadAction<string>) => {
            state.recentResumeBlobUrl = action.payload;
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

export default resumeSlice.reducer;
