import { isObject } from "../util/isObject";

export type ErrorAction = {
  error: {
    message: string;
  };
};

export type ErrorResponse = {
  response: {
    data: {
      error: string;
    };
  };
};

export type Response = {
  response: {
    data: unknown;
  };
};

export const isErrorAction = (value: unknown): value is ErrorAction => isObject(value) && "error" in value;

export const isErrorResponse = (value: unknown): value is ErrorResponse =>
  isResponse(value) && isObject(value.response.data) && "error" in value.response.data;

export const isResponse = (value: unknown): value is Response =>
  isObject(value) && "response" in value && isObject(value.response) && "data" in value.response;

export const hasMessage = (value: unknown): value is { message: string } => isObject(value) && "message" in value;
