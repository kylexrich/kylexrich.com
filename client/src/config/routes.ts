import React from "react";
import Home from "../components/pages/Home";
import TechStack from "../components/pages/TechStack";
import Projects from "../components/pages/Projects";
import About from "../components/pages/About";
import Secret from "../components/pages/private/Secret";

export type RouteItem = {
  name: string;
  path: string;
  component: React.ComponentType<any>;
  secure: boolean;
};

export const homeRoute: RouteItem = { name: "Home", path: "/", component: Home, secure: false };

export const routes: RouteItem[] = [
  homeRoute,
  { name: "About", path: "/about", component: About, secure: false },
  { name: "Tech Stack", path: "/tech-stack", component: TechStack, secure: false },
  { name: "Projects", path: "/projects", component: Projects, secure: false },
  { name: "Secret", path: "/secret", component: Secret, secure: true },
];
