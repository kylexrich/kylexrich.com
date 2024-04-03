import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const uiErrorSelector = (state: RootState) => state.ui.error;
const authErrorSelector = (state: RootState) => state.auth.error;
const resumeErrorSelector = (state: RootState) => state.resume.error;

export const siteErrorSelector = createSelector([uiErrorSelector, authErrorSelector, resumeErrorSelector], (uiErr, authErr, resumeErr) => {
    return uiErr || authErr || resumeErr;
});
