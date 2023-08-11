import { isObject } from "../../util/isObject";

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

export const isErrorAction = (value: unknown): value is ErrorAction => isObject(value) && "error" in value;

export const isErrorResponse = (value: unknown): value is ErrorResponse =>
  isObject(value) &&
  "response" in value &&
  isObject(value.response) &&
  "data" in value.response &&
  isObject(value.response.data) &&
  "error" in value.response.data;
