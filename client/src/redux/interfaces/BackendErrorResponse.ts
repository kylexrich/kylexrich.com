import {AxiosError, isAxiosError} from 'axios';
import {PayloadAction} from '@reduxjs/toolkit';
import {isObject} from '../../util/helper/isObject.ts';

export interface RejectedValue {
    errorMessage: string;
}

export type BackendErrorResponse = RejectedValue;

export const isBackendErrorResponse = (
    error: unknown
): error is Required<Pick<AxiosError<BackendErrorResponse>, 'response'>> => {
    if (!isAxiosError<BackendErrorResponse>(error)) {
        return false;
    }

    const data = error.response?.data;

    if (!isObject(data)) {
        return false;
    }

    const message = (data as Partial<BackendErrorResponse>).errorMessage;
    return typeof message === 'string' && message.length > 0;
};

const hasErrorMessage = (payload: unknown): payload is RejectedValue =>
    isObject(payload) && typeof (payload as { errorMessage?: unknown }).errorMessage === 'string';

export const isRejectedPayloadAction = (action: unknown): action is PayloadAction<RejectedValue> => {
    if (!isObject(action) || !('payload' in action)) {
        return false;
    }

    const payload = (action as { payload?: unknown }).payload;
    return hasErrorMessage(payload);
};
