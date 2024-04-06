import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import authReducer from './authSlice';
import resumeReducer from './resumeSlice';
import githubReducer from './githubSlice';

const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
        resume: resumeReducer,
        github: githubReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
