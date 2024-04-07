import React from 'react';
import Home from '../components/pages/home/Home';
import TechStack from '../components/pages/techstack/TechStack';
import Changelog from '../components/pages/changelog/Changelog';
import About from '../components/pages/about/About';
import Secret from '../components/pages/private/Secret';

export interface RouteItem {
    name: string;
    path: string;
    component: React.ComponentType<any>;
    secure: boolean;
}

export const homeRoute: RouteItem = { name: 'Home', path: '/', component: Home, secure: false };

export const routes: RouteItem[] = [
    homeRoute,
    { name: 'About', path: '/about', component: About, secure: false },
    { name: 'Tech Stack', path: '/tech-stack', component: TechStack, secure: false },
    { name: 'Changelog', path: '/change-log', component: Changelog, secure: false },
    { name: 'Secret', path: '/secret', component: Secret, secure: true }
];
