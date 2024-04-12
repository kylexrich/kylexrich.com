import axios, { AxiosError } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { isObject } from '../../util/helper/isObject';

export interface RejectedValue {
    errorMessage: string;
}

export type BackendErrorResponse = RejectedValue;

export const isBackendErrorResponse = (error: unknown): error is Required<Pick<AxiosError<BackendErrorResponse>, 'response'>> =>
    axios.isAxiosError(error) && error.response?.data.errorMessage;

export const isRejectedPayloadAction = (action: unknown): action is PayloadAction<RejectedValue> =>
    isObject(action) && 'payload' in action && isObject(action.payload) && 'errorMessage' in action.payload;
