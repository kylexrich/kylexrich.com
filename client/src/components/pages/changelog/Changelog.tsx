import React, {useEffect} from 'react';
import {
    Box,
    Divider,
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
    VStack
} from '@chakra-ui/react';
import {GoIssueOpened} from 'react-icons/go';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import {AiFillCheckCircle} from 'react-icons/ai';
import {initialEnter, MotionDuration} from '../../shared/variants.tsx';
import {AppDispatch, RootState} from '../../../redux/store.ts';
import {getPullRequests, GithubPullRequest, KYLEXRICH_DOT_COM} from '../../../redux/githubSlice.ts';
import {useAccentColor} from '../../../theme/accentColor.ts';
import MainLayout from '../../app/layout/MainLayout.tsx';
import {MotionBox, MotionVStack} from '../../shared/MotionComponents.tsx';
import HeaderWithSubheader from '../../shared/HeaderWithSubheader.tsx';
import {useAppDispatch, useAppSelector} from '../../../hooks/reduxHooks.tsx';

const parentVariants = {
    initial: {
        opacity: 0, y: -20
    },
    enter: {
        y: 0,
        opacity: 1,
        transition: {staggerChildren: MotionDuration.FAST, delayChildren: MotionDuration.FAST}
    }
};

const childVariants = {
    initial: {
        opacity: 0, y: -20
    },
    enter: {
        y: 0,
        opacity: 1,
        transition: {
            y: {stiffness: 1000, velocity: -100}
        }
    }
};

export interface ChangelogProps {
    // empty
}

const Changelog: React.FC<ChangelogProps> = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const kylexrichPullRequests: GithubPullRequest[] | undefined = useAppSelector((state: RootState) => state.github.pullRequests[KYLEXRICH_DOT_COM]);

    const isLoading = !kylexrichPullRequests || Object.entries(kylexrichPullRequests).length === 0;

    useEffect(() => {
        try {
            if (isLoading) {
                void dispatch(getPullRequests(KYLEXRICH_DOT_COM));
            }
        } catch (error) {
            console.error(error);
        }
    }, [dispatch]);

    const colour = useAccentColor();

    if (isLoading) {
        return (<VStack align="start" spacing={4}>
            {[0, 1, 2, 3, 4, 5, 6].map((_, index) => (<React.Fragment key={index}>
                <Skeleton height="20px" width="30%"/>
                <SkeletonText mt="4" noOfLines={4} spacing="4"/>
            </React.Fragment>))}
        </VStack>);
    }

    return (<MainLayout>
        <MotionBox {...initialEnter} variants={parentVariants}>
            <HeaderWithSubheader header={'Changelog 🖥️'}
                                 subheader={'An overview of the changes I\'ve made to my portfolio website.'}/>
            <List>
                {kylexrichPullRequests.map((pr, index) => {
                    return (<MotionVStack spacing={4} align="left" mx={[0, 0, 6]} mb={4} key={pr.html_url}
                                          variants={childVariants}>
                        <ListItem>
                            <MotionBox whileHover={{x: 10}} key={index} align="left">
                                <MotionBox variants={childVariants}>
                                    <Heading fontSize="lg" textAlign="left" mt={0} mb={1}>
                                        {pr.state === 'closed' && pr.merged_at ? (
                                            <ListIcon as={AiFillCheckCircle} color="green.500"/>) : (
                                            <ListIcon as={GoIssueOpened} color="green.500"/>)}
                                        <Text as={Link} color={colour} target="_blank" href={pr.html_url}>
                                            {pr.title}
                                        </Text>
                                    </Heading>
                                    <HStack spacing={2} ml={[0, 0, 6]} wrap="wrap">
                                        <Text fontSize="sm" fontWeight="600">
                                            {moment(pr.merged_at).format('MMMM Do YYYY')}
                                        </Text>
                                        <HStack spacing={1} alignItems="center" justify="center" display="flex">
                                            {pr.labels.map((label) => (
                                                <Tag key={label.name} px={1} size="sm" bg={label.color}
                                                     color={'black'}>
                                                    {label.name}
                                                </Tag>))}
                                        </HStack>
                                    </HStack>
                                    <Box ml={12} mt={2} fontSize="md" fontWeight="400">
                                        <ReactMarkdown>{pr.body}</ReactMarkdown>
                                    </Box>
                                </MotionBox>
                            </MotionBox>
                        </ListItem>
                        {kylexrichPullRequests.length - 1 !== index && <Divider/>}
                    </MotionVStack>);
                })}
            </List>
        </MotionBox>
    </MainLayout>);
};

export default Changelog;
