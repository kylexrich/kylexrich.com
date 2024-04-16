import {useToast} from '@chakra-ui/react';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from './reduxHooks.tsx';
import {siteErrorSelector} from '../redux/selectors/siteErrorSelector.ts';
import {AppDispatch} from '../redux/store.ts';
import {RESET_ALL_ERRORS} from '../redux/globalActions.ts';

export function useErrorNotification() {
    const toast = useToast();
    const error = useAppSelector(siteErrorSelector);
    const dispatch: AppDispatch = useAppDispatch();

    useEffect(() => {
        if (error) {
            toast({
                title: 'Error',
                description: error,
                status: 'error',
                duration: 5000,
                isClosable: true
            });
            dispatch({type: RESET_ALL_ERRORS});
        }
    }, [dispatch, error, toast]);
}
