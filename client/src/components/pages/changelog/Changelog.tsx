import React, { useEffect } from 'react';
import { LayoutSlideFade, LayoutTransition, MotionBox, StaggerChildren } from '../../shared/MotionComponents';
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
    Tag,
    Text,
    useColorModeValue,
    VStack
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { GoIssueOpened } from 'react-icons/go';
import { AppDispatch, RootState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getWebsitePullRequests, GithubPullRequest } from '../../../redux/githubSlice';
import { useAccentColor } from '../../../theme/accentColor';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import { AiFillCheckCircle } from 'react-icons/ai';
import UnderlinedHeader from '../../shared/UnderlinedHeader';

export interface ChangelogProps {
    // empty
}

const Changelog: React.FC<ChangelogProps> = () => {
    const dispatch: AppDispatch = useDispatch();
    let pullRequests: GithubPullRequest[] = useSelector((state: RootState) => state.github.websitePullRequests);

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

    return (
        <LayoutTransition>
            <LayoutSlideFade>
                <StaggerChildren>
                    <MotionBox>
                        <VStack align="start">
                            <UnderlinedHeader mt={0} mb={2}>
                                Changelog
                            </UnderlinedHeader>
                            <Text color={useColorModeValue('gray.500', 'gray.200')} textAlign="left">
                                {"An overview of the changes I've made to my portfolio website."}
                            </Text>
                        </VStack>
                    </MotionBox>
                    <AnimatePresence>
                        <List>
                            {pullRequests?.map((pr, index) => {
                                return (
                                    <motion.div
                                        initial="hidden"
                                        animate="visible"
                                        variants={{
                                            hidden: (i: number) => ({
                                                opacity: 0,
                                                y: -30 * i
                                            }),
                                            visible: (i: number) => ({
                                                opacity: 1,
                                                y: 0,
                                                transition: {
                                                    delay: i * 0.1
                                                }
                                            })
                                        }}
                                        custom={index}
                                        key={pr.html_url}
                                    >
                                        <VStack spacing={4} align="left" mx={[0, 0, 6]} mt={8}>
                                            <ListItem>
                                                <MotionBox whileHover={{ x: 10 }} key={index} align="left">
                                                    <LayoutTransition>
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
                                                    </LayoutTransition>
                                                </MotionBox>
                                            </ListItem>
                                            {pullRequests.length - 1 !== index && <Divider />}
                                        </VStack>
                                    </motion.div>
                                );
                            })}
                        </List>
                    </AnimatePresence>
                </StaggerChildren>
            </LayoutSlideFade>
        </LayoutTransition>
    );
};

export default Changelog;
