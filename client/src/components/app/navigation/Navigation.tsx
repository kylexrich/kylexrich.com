import React from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import {AnimatePresence} from 'framer-motion';
import {routes} from '../../../config/routes.ts';
import ProtectedRoute from './ProtectedRoute.tsx';

export interface NavigationProps {
    // empty
}

const Navigation: React.FC<NavigationProps> = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
            <Routes location={location} key={location.pathname}>
                {routes.map((route, index) => {
                    if (route.secure) {
                        return (
                            <Route key={index} path={route.path} element={<ProtectedRoute/>}>
                                <Route index element={<route.component/>}/>
                            </Route>
                        );
                    } else {
                        return <Route key={index} path={route.path} element={<route.component/>}/>;
                    }
                })}
            </Routes>
        </AnimatePresence>
    );
};

export default Navigation;
