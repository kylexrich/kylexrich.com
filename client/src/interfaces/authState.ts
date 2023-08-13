import { BaseState } from "./baseState";

export type AuthState = {
  userId: string | null;
} & BaseState;

export type LoginInfo = {
  email: string;
  password: string;
};

export type User = {
  _id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};
