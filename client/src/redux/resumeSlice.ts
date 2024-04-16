import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {BaseState} from './interfaces/BaseState.ts';
import kylexrichApi from '../api/kylexrichAxios.ts';
import {getRejectedValue, handleLoading, handleRejected} from './asyncThunkHelpers.ts';
import {ContentType} from '../util/types/ContentType.ts';
import {RESET_ALL_ERRORS} from './globalActions.ts';


// =================== Types ===================
export interface ResumeState extends BaseState {
    recentResumeBlobUrl: string | null;
}

export interface ResumeResponse {
    s3Url: string;
}

// =================== Async thunks ===================
export const fetchLatestResume = createAsyncThunk<string>('resume/fetchLatestResume', async (_, {rejectWithValue}) => {
    try {
        const response: AxiosResponse<ResumeResponse> = await kylexrichApi.get<ResumeResponse>(`/resume/latest`);
        return response.data.s3Url;
    } catch (error: unknown) {
        return rejectWithValue(getRejectedValue(error));
    }
});

export const uploadResume = createAsyncThunk<string, File>('resume/uploadResume', async (file: File, {rejectWithValue}) => {
    const formData = new FormData();
    formData.append('resume', file);
    try {
        const response: AxiosResponse<ResumeResponse> = await kylexrichApi.post<ResumeResponse>('/resume', formData, {
            headers: {
                'Content-Type': ContentType.FormData
            }
        });
        return response.data.s3Url;
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
        builder.addMatcher((action: PayloadAction<string>) => action.type === RESET_ALL_ERRORS, (state: ResumeState) => {
            state.error = null;
        });
    }
});

export default resumeSlice.reducer;
