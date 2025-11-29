import React, {useState} from 'react';
import {Box, Button, Collapse, Icon, useColorModeValue, Wrap, WrapItem} from '@chakra-ui/react';
import {FiFilter} from 'react-icons/fi';
import {ColorWeight, useAccentColor} from '../../../theme/accentColor.ts';

export interface ProjectTagFilterProps {
    primaryTags: string[];
    secondaryTags: string[];
    selectedTags: string[];
    onToggleTag: (tag: string) => void;
}

const ProjectTagFilter: React.FC<ProjectTagFilterProps> = ({primaryTags, secondaryTags, selectedTags, onToggleTag}) => {
    const accentBg = useAccentColor({lightModeWeight: ColorWeight.W100, darkModeWeight: ColorWeight.W700});
    const accentBorder = useAccentColor({lightModeWeight: ColorWeight.W400, darkModeWeight: ColorWeight.W500});
    const accentText = useAccentColor({lightModeWeight: ColorWeight.W700, darkModeWeight: ColorWeight.W100});
    const inactiveBg = useColorModeValue('white', 'gray.900');
    const inactiveBorder = useColorModeValue('blackAlpha.100', 'whiteAlpha.200');
    const inactiveText = useColorModeValue('gray.600', 'gray.300');
    const hoverBg = useColorModeValue('gray.100', 'gray.700');
    const toggleText = useColorModeValue('gray.700', 'gray.200');
    const toggleBorder = useColorModeValue('blackAlpha.200', 'whiteAlpha.200');
    const toggleBg = useColorModeValue('gray.50', 'whiteAlpha.50');
    const [showAll, setShowAll] = useState(false);

    const isTagActive = (tag: string): boolean => {
        if (tag === 'All') {
            return selectedTags.length === 0;
        }
        return selectedTags.includes(tag);
    };

    return (
        <Box w="full">
            <Wrap spacing={3} justify="center">
                {primaryTags.map((tag) => {
                    const active = isTagActive(tag);
                    return (
                        <WrapItem key={tag}>
                            <Button
                                size="sm"
                                variant="outline"
                                fontWeight="600"
                                rounded="full"
                                px={4}
                                py={2}
                                bg={active ? accentBg : inactiveBg}
                                color={active ? accentText : inactiveText}
                                borderColor={active ? accentBorder : inactiveBorder}
                                borderWidth={2}
                                _hover={{bg: active ? accentBg : hoverBg}}
                                _active={{bg: accentBg}}
                                onClick={() => onToggleTag(tag)}
                                aria-pressed={active}
                                transition="all 0.2s ease"
                            >
                                {tag}
                            </Button>
                        </WrapItem>
                    );
                })}
                {secondaryTags.length > 0 && (
                    <WrapItem>
                        <Button
                            size="sm"
                            variant="outline"
                            leftIcon={<Icon as={FiFilter}/>}
                            rounded="full"
                            px={4}
                            py={2}
                            bg={toggleBg}
                            color={toggleText}
                            borderColor={toggleBorder}
                            onClick={() => setShowAll((prev) => !prev)}
                            aria-expanded={showAll}
                        >
                            {showAll ? 'Hide more' : `More filters (${secondaryTags.length})`}
                        </Button>
                    </WrapItem>
                )}
            </Wrap>
            {secondaryTags.length > 0 && (
                <Collapse in={showAll} animateOpacity style={{width: '100%'}} unmountOnExit={false}>
                    <Box pt={3}>
                        <Wrap spacing={3} justify="center">
                            {secondaryTags.map((tag) => {
                                const active = isTagActive(tag);
                                return (
                                    <WrapItem key={tag}>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            fontWeight="600"
                                            rounded="full"
                                            px={4}
                                            py={2}
                                            bg={active ? accentBg : inactiveBg}
                                            color={active ? accentText : inactiveText}
                                            borderColor={active ? accentBorder : inactiveBorder}
                                            borderWidth={2}
                                            _hover={{bg: active ? accentBg : hoverBg}}
                                            _active={{bg: accentBg}}
                                            onClick={() => onToggleTag(tag)}
                                            aria-pressed={active}
                                            transition="all 0.2s ease"
                                        >
                                            {tag}
                                        </Button>
                                    </WrapItem>
                                );
                            })}
                        </Wrap>
                    </Box>
                </Collapse>
            )}
        </Box>
    );
};

export default ProjectTagFilter;
