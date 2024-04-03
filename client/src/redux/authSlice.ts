import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import kylexrichApi from '../api/kylexrichAxios';
import { getRejectedValue, handleLoading, handleRejected } from './asyncThunkHelpers';
import { RESET_ALL_ERRORS } from './globalActions';
import { AxiosResponse } from 'axios';
import { BaseState } from './interfaces/BaseState';

// =================== Types ===================
export interface LoginInfo {
    email: string;
    password: string;
}

export interface User {
    _id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AuthState extends BaseState {
    userId: string | null;
}

// =================== Async thunks ===================
export const login = createAsyncThunk<User, LoginInfo>('auth/login', async (payload: LoginInfo, { rejectWithValue }) => {
    try {
        const response: AxiosResponse<User> = await kylexrichApi.post<User>('/auth/login', payload);
        return response.data;
    } catch (error: unknown) {
        return rejectWithValue(getRejectedValue(error));
    }
});

export const logout = createAsyncThunk<string, void>('auth/logout', async (_, { rejectWithValue }) => {
    try {
        const response: AxiosResponse<string> = await kylexrichApi.post<string>('/auth/logout');
        return response.data;
    } catch (error: unknown) {
        return rejectWithValue(getRejectedValue(error));
    }
});

export const me = createAsyncThunk<User, void>('auth/me', async (_, { rejectWithValue }) => {
    try {
        const response: AxiosResponse<User> = await kylexrichApi.get<User>('/auth/me');
        return response.data;
    } catch (error: unknown) {
        return rejectWithValue(getRejectedValue(error));
    }
});

// =================== Initial state ===================
const initialState: AuthState = {
    userId: null,
    loading: false,
    error: null
};

// =================== Slice ===================
const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state: AuthState) => handleLoading(state, true));
        builder.addCase(login.rejected, (state: AuthState, action: PayloadAction<unknown>) => handleRejected(state, action));
        builder.addCase(login.fulfilled, (state: AuthState, action: PayloadAction<User>) => {
            state.userId = action.payload._id;
            handleLoading(state, false);
        });
        builder.addCase(me.pending, (state: AuthState) => handleLoading(state, true));
        builder.addCase(me.rejected, (state: AuthState, action: PayloadAction<unknown>) => handleLoading(state, false));
        builder.addCase(me.fulfilled, (state: AuthState, action: PayloadAction<User>) => {
            state.userId = action.payload._id;
            handleLoading(state, false);
        });
        builder.addCase(logout.pending, (state: AuthState) => handleLoading(state, true));
        builder.addCase(logout.rejected, (state: AuthState, action: PayloadAction<unknown>) => handleRejected(state, action));
        builder.addCase(logout.fulfilled, (state: AuthState, action: PayloadAction<string>) => {
            state.userId = null;
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

export default authSlice.reducer;
