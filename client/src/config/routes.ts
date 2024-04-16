import React from 'react';
import About from '../components/pages/about/About.tsx';
import Home from '../components/pages/home/Home.tsx';
import TechStack from '../components/pages/techstack/TechStack.tsx';
import Changelog from '../components/pages/changelog/Changelog.tsx';
import Secret from '../components/pages/private/Secret.tsx';

export interface RouteItem {
    name: string;
    path: string;
    component: React.ComponentType;
    secure: boolean;
}

export const homeRoute: RouteItem = {name: 'Home', path: '/', component: Home, secure: false};

export const routes: RouteItem[] = [
    homeRoute,
    {name: 'About', path: '/about', component: About, secure: false},
    {name: 'Tech Stack', path: '/tech-stack', component: TechStack, secure: false},
    {name: 'Changelog', path: '/change-log', component: Changelog, secure: false},
    {name: 'Secret', path: '/secret', component: Secret, secure: true}
];
