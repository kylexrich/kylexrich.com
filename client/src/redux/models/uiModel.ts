import { BaseState } from "./baseModel";

export type ResumeState = {
  resumeBlobUrl: string | null;
} & BaseState;
