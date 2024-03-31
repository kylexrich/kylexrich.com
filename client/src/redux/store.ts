// store.ts

import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import authReducer from './authSlice';
import resumeReducer from './resumeSlice';

const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
        resume: resumeReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
