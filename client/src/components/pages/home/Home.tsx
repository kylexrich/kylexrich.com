import React from 'react';
import {Avatar, Box, Flex, Text} from '@chakra-ui/react';
import {ColorWeight, useAccentColor} from '../../../theme/accentColor.ts';
import MainLayout from '../../app/layout/MainLayout.tsx';
import {MotionBox, MotionFlex} from '../../shared/MotionComponents.tsx';
import {initialEnter, MotionDuration} from '../../shared/variants.tsx';
import {ME_CUT_REMOVE_BG} from '../../../assets/other.ts';
import UnderlinedHeader from '../../shared/UnderlinedHeader.tsx';

export interface HomeProps {
    // empty
}

const Home: React.FC<HomeProps> = () => {
    const avatarColor = useAccentColor();
    const avatarBorderColor = useAccentColor({
        lightModeWeight: ColorWeight.W800,
        darkModeWeight: ColorWeight.W700
    });

    return (
        <MainLayout>
            <Flex direction={{base: 'column', md: 'row'}} align="center">
                <MotionBox
                    opacity="0"
                    m="auto"
                    rounded="full"
                    shadow="lg"
                    mb={{base: 16, md: 'auto'}}
                    variants={{
                        initial: {
                            opacity: 0,
                            x: -100
                        },
                        enter: {
                            x: 0,
                            opacity: 1,
                            transition: {
                                duration: MotionDuration.SLOW
                            }
                        }
                    }}
                    {...initialEnter}
                    whileHover={{scale: 1.5}}
                >
                    <Avatar size={'2xl'} bg={avatarColor} showBorder={true} borderColor={avatarBorderColor}
                            src={ME_CUT_REMOVE_BG}/>
                </MotionBox>

                <MotionFlex
                    position="relative"
                    m={{base: 'auto', sm: 'initial'}}
                    ml={{base: 'auto', md: 16}}
                    w={{base: '90%', sm: '85%', md: '80%'}}
                    maxW="800px"
                    opacity="0"
                    justify="center"
                    direction="column"
                    variants={{
                        initial: {
                            opacity: 0,
                            x: 100
                        },
                        enter: {
                            x: 0,
                            opacity: 1,
                            transition: {
                                duration: MotionDuration.SLOW
                            }
                        }
                    }}
                    {...initialEnter}
                >
                    <Box position="relative">
                        <MotionBox width="100%">
                            <UnderlinedHeader header={'Hey! 👋'}/>
                        </MotionBox>
                    </Box>
                    <Box as="h2" fontSize="2xl" fontWeight="400" textAlign="left">
                        My name is{' '}
                        <Text as="strong" fontWeight="600" display="inline">
                            {'Kyle Rich '}
                        </Text>
                        <Text as="span" display="inline">
                            {'and I\'m a backend engineer from Canada 🇨🇦'}
                        </Text>
                    </Box>
                    <Box as="h2" fontSize="2xl" fontWeight="400" mt={5} textAlign="left">
                        {'This is my digital portfolio and playground. Poke around if you\'re interested 😊'}
                    </Box>
                </MotionFlex>
            </Flex>
        </MainLayout>
    );
};

export default Home;
