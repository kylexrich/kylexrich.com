import React, {useCallback, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../hooks/reduxHooks.tsx';
import {AppDispatch, RootState} from '../../../redux/store.ts';
import {Box, Button, Input, useToast} from '@chakra-ui/react';
import {fetchLatestResume, uploadResume} from '../../../redux/resumeSlice.ts';

interface FileInputProps {
    onFileChange: (file: File | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({onFileChange}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onFileChange(e.target.files[0] ?? null);
        } else {
            onFileChange(null);
        }
    };

    return <Input type="file" accept=".pdf" onChange={handleChange} mb={4}/>;
};

const ResumeSection: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const dispatch: AppDispatch = useAppDispatch();
    const recentResumeBlobUrl: string | null = useAppSelector((state: RootState) => state.resume.recentResumeBlobUrl);
    const toast = useToast();

    const handleOpenMostRecentResume = useCallback(() => {
        try {
            if (recentResumeBlobUrl === null) {
                void dispatch(fetchLatestResume());
            } else {
                window.open(recentResumeBlobUrl, '_blank');
            }
        } catch (error) {
            console.error(error);
        }
    }, [dispatch, recentResumeBlobUrl]);

    const handleUploadResume = useCallback(() => {
        if (selectedFile) {
            dispatch(uploadResume(selectedFile))
                .unwrap()
                .then(() => {
                    setSelectedFile(null);
                    toast({
                        title: 'Upload Successful',
                        description: 'Your resume has been uploaded successfully.',
                        status: 'success',
                        duration: 5000,
                        isClosable: true
                    });
                })
                .catch(() => {
                    setSelectedFile(null);
                });
        }
    }, [dispatch, selectedFile, toast]);


    return (
        <Box p={6} boxShadow="lg" borderRadius="md" bg="white">
            <FileInput onFileChange={setSelectedFile}/>
            <Button colorScheme="blue" mr={4} onClick={handleUploadResume}>
                Upload Resume
            </Button>
            <Button colorScheme="green" onClick={handleOpenMostRecentResume}>
                Open Most Recent Resume
            </Button>
        </Box>
    );
};

export default ResumeSection;
