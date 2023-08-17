import React from "react";

export type GenericAboutCardDetail = {
  logoRef: string;
  title: string;
  subtitle?: string;
  type?: string;
  shortDescription?: string;
  longDescription?: string;
  hasModal?: boolean;
  dateText: string;
  skills?: string[];
  additionalContent?: React.ReactNode;
};
