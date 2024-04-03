import React, { useState, useCallback } from 'react';
import { AppDispatch, RootState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Box, Input, useToast } from '@chakra-ui/react';
import { fetchLatestResume, uploadResume } from '../../../redux/resumeSlice';

const FileInput: React.FC<{ onFileChange: (file: File) => void }> = ({ onFileChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            onFileChange(e.target.files[0]);
        }
    };

    return <Input type="file" accept=".pdf" onChange={handleChange} mb={4} />;
};

const ResumeSection: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const dispatch: AppDispatch = useDispatch();
    const recentResumeBlobUrl = useSelector((state: RootState) => state.resume.recentResumeBlobUrl);
    const toast = useToast();

    const handleOpenMostRecentResume = useCallback(async () => {
        try {
            let url = recentResumeBlobUrl;
            if (!url) {
                url = await dispatch(fetchLatestResume()).unwrap();
            }
            if (url) window.open(url, '_blank');
        } catch (error) {
            console.error(error);
        }
    }, [dispatch, recentResumeBlobUrl]);

    const handleUploadResume = useCallback(() => {
        if (selectedFile) {
            dispatch(uploadResume(selectedFile));
        } else {
            toast({
                title: 'No File Selected',
                description: 'Please select a file to upload.',
                status: 'warning',
                duration: 5000,
                isClosable: true
            });
        }
    }, [dispatch, selectedFile, toast]);

    return (
        <Box p={6} boxShadow="lg" borderRadius="md" bg="white">
            <FileInput onFileChange={setSelectedFile} />
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
