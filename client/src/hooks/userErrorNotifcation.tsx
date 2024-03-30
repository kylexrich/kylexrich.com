import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { siteErrorSelector } from '../redux/selectors/siteErrorSelector';
import { useDispatch, useSelector } from 'react-redux';
import { resetError } from '../redux/uiSlice';
import { AppDispatch } from '../redux/store';

export function useErrorNotification() {
    const toast = useToast();
    const error = useSelector(siteErrorSelector);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (error) {
            toast({
                title: 'Error',
                description: error,
                status: 'error',
                duration: 5000,
                isClosable: true
            });
            dispatch(resetError());
        }
    }, [dispatch, error, toast]);
}
