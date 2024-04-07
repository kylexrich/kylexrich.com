import React, { useEffect } from 'react';
import { MotionBox } from '../../shared/MotionComponents';
import {
    Box,
    Divider,
    Flex,
    Heading,
    HStack,
    Link,
    List,
    ListIcon,
    ListItem,
    Skeleton,
    SkeletonText,
    Tag,
    Text,
    useColorModeValue,
    VStack
} from '@chakra-ui/react';
import { GoIssueOpened } from 'react-icons/go';
import { AppDispatch, RootState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getWebsitePullRequests, GithubPullRequest } from '../../../redux/githubSlice';
import { useAccentColor } from '../../../theme/accentColor';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import { AiFillCheckCircle } from 'react-icons/ai';
import UnderlinedHeader from '../../shared/UnderlinedHeader';
import { initialenter, MotionDuration } from '../../shared/variants';
import MainLayout from '../../app/layout/MainLayout';

const parentVariants = {
    initial: {
        opacity: 0,
        y: -20
    },
    enter: {
        y: 0,
        opacity: 1,
        transition: { staggerChildren: MotionDuration.FAST, delayChildren: MotionDuration.FAST }
    }
};

const childVariants = {
    initial: {
        opacity: 0,
        y: -20
    },
    enter: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
        }
    }
};

export interface ChangelogProps {
    // empty
}

const Changelog: React.FC<ChangelogProps> = () => {
    const dispatch: AppDispatch = useDispatch();
    let pullRequests: GithubPullRequest[] = useSelector((state: RootState) => state.github.websitePullRequests);

    let isLoading = pullRequests.length === 0;

    useEffect(() => {
        try {
            if (pullRequests.length === 0) {
                dispatch(getWebsitePullRequests());
            }
        } catch (error) {
            console.error(error);
        }
    }, [dispatch]);

    const colour = useAccentColor();

    const subHeaderColor = useColorModeValue('gray.500', 'gray.200');

    if (isLoading) {
        return (
            <VStack align="start" spacing={4}>
                {[0, 1, 2, 3, 4, 5, 6].map((_, index) => (
                    <React.Fragment key={index}>
                        <Skeleton height="20px" width="30%" />
                        <SkeletonText mt="4" noOfLines={4} spacing="4" />
                    </React.Fragment>
                ))}
            </VStack>
        );
    }

    return (
        <MainLayout>
            <MotionBox {...initialenter} variants={parentVariants}>
                <VStack align="start">
                    <UnderlinedHeader mt={0} mb={2}>
                        Changelog
                    </UnderlinedHeader>
                    <Text color={subHeaderColor} textAlign="left" mb={6}>
                        {"An overview of the changes I've made to my portfolio website."}
                    </Text>
                </VStack>
                <List>
                    {pullRequests.map((pr, index) => {
                        return (
                            <MotionBox key={pr.html_url} variants={childVariants}>
                                <VStack spacing={4} align="left" mx={[0, 0, 6]} mt={8}>
                                    <ListItem>
                                        <MotionBox whileHover={{ x: 10 }} key={index} align="left">
                                            <MotionBox variants={childVariants}>
                                                <Heading fontSize="lg" textAlign="left" mt={0} mb={1}>
                                                    {pr.state === 'closed' && pr.merged_at ? (
                                                        <ListIcon as={AiFillCheckCircle} color="green.500" />
                                                    ) : (
                                                        <ListIcon as={GoIssueOpened} color="gray.500" />
                                                    )}
                                                    <Text as={Link} color={colour} target="_blank" href={pr.html_url}>
                                                        {pr.title}
                                                    </Text>
                                                </Heading>
                                                <HStack spacing={2} ml={[0, 0, 6]}>
                                                    <Text fontSize="sm" fontWeight="600">
                                                        {moment(pr.merged_at).format('MMMM Do YYYY')}
                                                    </Text>
                                                    <HStack spacing={1} alignItems="center" display={['none', 'none', 'flex']}>
                                                        <Flex alignItems="center" flexWrap="wrap" m="-2px">
                                                            {pr.labels.map((label) => (
                                                                <Tag
                                                                    key={label.name}
                                                                    m="2px"
                                                                    padding="0 3px"
                                                                    size="sm"
                                                                    bg={label.color}
                                                                    color={'black'}
                                                                >
                                                                    {label.name}
                                                                </Tag>
                                                            ))}
                                                        </Flex>
                                                    </HStack>
                                                </HStack>
                                                <Box ml={12} mt={2} fontSize="md" fontWeight="400">
                                                    <ReactMarkdown>{pr.body}</ReactMarkdown>
                                                </Box>
                                            </MotionBox>
                                        </MotionBox>
                                    </ListItem>
                                    {pullRequests.length - 1 !== index && <Divider />}
                                </VStack>
                            </MotionBox>
                        );
                    })}
                </List>
            </MotionBox>
        </MainLayout>
    );
};

export default Changelog;
