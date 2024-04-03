import React from 'react';
import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import { LayoutTransition, MotionBox, MotionFlex } from '../shared/MotionComponents';
import { ME_CUT_REMOVE_BG } from '../../assets/other';
import UnderlinedEmojiHeader from '../shared/UnderlinedEmojiHeader';
import { ColorWeight, useAccentColor } from '../../theme/accentColor';

export interface HomeProps {
    // empty
}

const Home: React.FC<HomeProps> = () => {
    const ANIMATION_DURATION = 0.5;
    const avatarColor = useAccentColor();
    const avatarBorderColor = useAccentColor({
        lightModeWeight: ColorWeight.W800,
        darkModeWeight: ColorWeight.W700
    });

    return (
        <LayoutTransition>
            <Flex direction="column" align="center">
                <Flex direction={{ base: 'column', md: 'row' }}>
                    <MotionBox
                        opacity="0"
                        initial={{
                            translateX: -150,
                            opacity: 0
                        }}
                        animate={{
                            translateX: 0,
                            opacity: 1,
                            transition: {
                                duration: ANIMATION_DURATION
                            }
                        }}
                        m="auto"
                        mb={{ base: 16, md: 'auto' }}
                    >
                        <MotionBox whileHover={{ scale: 1.5 }} rounded="full" shadow="lg">
                            <Avatar
                                size={'2xl'}
                                bg={avatarColor}
                                showBorder={true}
                                borderColor={avatarBorderColor}
                                src={ME_CUT_REMOVE_BG}
                            />
                        </MotionBox>
                    </MotionBox>
                    <MotionFlex
                        position="relative"
                        m={{ base: 'auto', sm: 'initial' }}
                        ml={{ base: 'auto', md: 16 }}
                        w={{ base: '90%', sm: '85%', md: '80%' }}
                        maxW="800px"
                        opacity="0"
                        justify="center"
                        direction="column"
                        initial={{
                            opacity: 0,
                            translateX: 150
                        }}
                        animate={{
                            opacity: 1,
                            translateX: 0,
                            transition: {
                                duration: ANIMATION_DURATION
                            }
                        }}
                    >
                        <Box position="relative">
                            <MotionBox whileHover={{ translateY: -5 }} width="max-content">
                                <UnderlinedEmojiHeader text={'Hey!'} emoji={'👋'} />
                            </MotionBox>
                        </Box>
                        <Box as="h2" fontSize="2xl" fontWeight="400" textAlign="left">
                            My name is{' '}
                            <Text as="strong" fontWeight="600" display="inline">
                                Kyle
                            </Text>{' '}
                            and I&apos;m a full stack developer <Text as="span" whiteSpace="nowrap" display="inline"></Text>
                            from{' '}
                            <Text as="span" whiteSpace="nowrap" display="inline">
                                Canada 🇨🇦
                            </Text>
                        </Box>
                        <Box as="h2" fontSize="2xl" fontWeight="400" mt={5} textAlign="left">
                            This is my digital portfolio and playground. Poke around if you&apos;re interested 😊
                        </Box>
                    </MotionFlex>
                </Flex>
            </Flex>
        </LayoutTransition>
    );
};

export default Home;
