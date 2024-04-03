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

export interface MainLayoutProps {
    // empty
}

const AppLayout: React.FC<MainLayoutProps> = (props) => {
    const dispatch: AppDispatch = useDispatch();
    useErrorNotification();
    useEffect(() => {
        dispatch(me());
    }, [dispatch]);

    const bannerPadding = '50px';

    return (
        <BrowserRouter>
            <NavBar />
            <DottedBackground />
            <Box textAlign="center" fontSize="xl" w={['90%', '85%', '80%']} maxW={800} mx="auto">
                <Box pt={10} pb={10}>
                    <Navigation />
                </Box>
            </Box>
            <Box w="full" pb={UNDER_CONSTRUCTION ? bannerPadding : '0'}>
                <Footer />
            </Box>
            {UNDER_CONSTRUCTION && <UnderConstructionBanner />}
        </BrowserRouter>
    );
};

export default AppLayout;
