import React, { useState } from 'react';
import { Box, HStack, Image, Link, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { SkillDetail } from '../../../../config/techstack/SkillDetail';
import { MotionBox } from '../../../shared/MotionComponents';
import { useAccentColor } from '../../../../theme/accentColor';
import { MotionDuration } from '../../../shared/variants';

const leftVariants = {
    initial: { opacity: 0, x: 100 },
    enter: (index: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: index * MotionDuration.BLIP
        }
    })
};

const rightVariants = {
    initial: { opacity: 0, x: -100 },
    enter: (index: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: index * MotionDuration.BLIP
        }
    })
};

export interface SkillCardProps extends SkillDetail {
    index: number;
    // empty
}

const TechCard: React.FC<SkillCardProps> = ({ title, description, link, categories, imageRefs, bgColor, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const cardBackground = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.900', 'gray.700');
    const descriptionColor = useColorModeValue('gray.500', 'gray.200');
    const descriptionHoverColor = useColorModeValue('inherit', 'accent.500');
    const titleColor = useAccentColor();

    return (
        <MotionBox>
            <MotionBox
                initial="initial"
                animate="enter"
                variants={index % 2 === 0 ? rightVariants : leftVariants}
                custom={index}
                key={index}
                whileHover={{ scale: 1.05 }}
            >
                <Link href={link} isExternal>
                    <HStack
                        p={4}
                        bg={cardBackground}
                        rounded="xl"
                        borderWidth="0.5px"
                        borderColor={borderColor}
                        w="100%"
                        textAlign="left"
                        align="start"
                        spacing={4}
                        _hover={{
                            shadow: 'md',
                            bg: bgColor,
                            color: descriptionHoverColor
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <Box
                            bgColor={bgColor}
                            rounded="lg"
                            p={2}
                            position="relative"
                            overflow="initial"
                            lineHeight={0}
                            boxShadow="inset 0 0 1px 1px rgba(0, 0, 0, 0.015)"
                        >
                            <Box position="absolute" top={0} bottom={0} left={0} right={0} opacity={0.25}></Box>
                            <Image src={imageRefs} height={26} width={26} rounded="md" />
                        </Box>
                        <VStack align="start" justify="flex-start" spacing={1} maxW="lg" h="100%">
                            <VStack spacing={0} align="start" flexGrow={1}>
                                <Text fontWeight="bold" fontSize="md" noOfLines={2} color={titleColor}>
                                    {title}
                                </Text>
                                <Text fontSize="sm" color={isHovered ? descriptionHoverColor : descriptionColor}>
                                    {description}
                                </Text>
                            </VStack>
                        </VStack>
                    </HStack>
                </Link>
            </MotionBox>
        </MotionBox>
    );
};

export default TechCard;
