import React, { useEffect } from 'react';
import NavBar from '../navigation/NavBar';
import { Box } from '@chakra-ui/react';
import Navigation from '../navigation/Navigation';
import Footer from './Footer';
import { BrowserRouter } from 'react-router-dom';
import DottedBackground from './DottedBackground';
import { useErrorNotification } from '../../../hooks/userErrorNotifcation';
import { AppDispatch } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { me } from '../../../redux/authSlice';
import UnderConstructionBanner from './UnderConstructionBanner';
import { UNDER_CONSTRUCTION } from '../../../config/constants';
import { getPullRequests, KYLEXRICH_DOT_COM } from '../../../redux/githubSlice';

export interface MainLayoutProps {
    // empty
}

const AppLayout: React.FC<MainLayoutProps> = (props) => {
    const dispatch: AppDispatch = useDispatch();
    useErrorNotification();
    useEffect(() => {
        dispatch(me());
        dispatch(getPullRequests(KYLEXRICH_DOT_COM));
    }, [dispatch]);

    const bannerPadding = '50px';

    return (
        <BrowserRouter>
            <NavBar />
            <DottedBackground />
            <Box textAlign='center' fontSize='xl' w={{ base: '90%', sm: '85%', md: '80%' }} py={10} maxW={800} mx='auto'>
                <Navigation />
            </Box>
            <Box w='full' pb={UNDER_CONSTRUCTION ? bannerPadding : '0'}>
                <Footer />
            </Box>
            {UNDER_CONSTRUCTION && <UnderConstructionBanner />}
        </BrowserRouter>
    );
};

export default AppLayout;
