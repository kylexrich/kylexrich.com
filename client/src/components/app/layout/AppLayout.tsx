import React, {useEffect} from 'react';
import {Box} from '@chakra-ui/react';

import {useAppDispatch} from '../../../hooks/reduxHooks.tsx';
import {AppDispatch} from '../../../redux/store.ts';
import {useErrorNotification} from '../../../hooks/userErrorNotifcation.tsx';
import {me} from '../../../redux/authSlice.ts';
import {getPullRequests, KYLEXRICH_DOT_COM} from '../../../redux/githubSlice.ts';
import {BrowserRouter} from 'react-router-dom';
import NavBar from '../navigation/NavBar.tsx';
import DottedBackground from './DottedBackground.tsx';
import Navigation from '../navigation/Navigation.tsx';
import {UNDER_CONSTRUCTION} from '../../../config/constants.ts';
import Footer from './Footer.tsx';
import UnderConstructionBanner from './UnderConstructionBanner.tsx';

export interface MainLayoutProps {
    // empty
}

const AppLayout: React.FC<MainLayoutProps> = () => {
    const dispatch: AppDispatch = useAppDispatch();
    useErrorNotification();
    useEffect(() => {
        void dispatch(me());
        void dispatch(getPullRequests(KYLEXRICH_DOT_COM));
    }, [dispatch]);

    const bannerPadding = '50px';

    return (
        <BrowserRouter>
            <NavBar/>
            <DottedBackground/>
            <Box textAlign="center" fontSize="xl" w={{base: '90%', sm: '85%', md: '80%'}} py={10} maxW={800}
                 mx="auto">
                <Navigation/>
            </Box>
            <Box w="full" pb={UNDER_CONSTRUCTION ? bannerPadding : '0'}>
                <Footer/>
            </Box>
            {UNDER_CONSTRUCTION && <UnderConstructionBanner/>}
        </BrowserRouter>
    );
};

export default AppLayout;
