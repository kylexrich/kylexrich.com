import React from 'react';
import {Button, useColorModeValue, Wrap, WrapItem} from '@chakra-ui/react';
import {ColorWeight, useAccentColor} from '../../../theme/accentColor.ts';

export interface ProjectTagFilterProps {
    tags: string[];
    activeTag: string;
    onTagSelect: (tag: string) => void;
}

const ProjectTagFilter: React.FC<ProjectTagFilterProps> = ({tags, activeTag, onTagSelect}) => {
    const accentBg = useAccentColor({lightModeWeight: ColorWeight.W100, darkModeWeight: ColorWeight.W700});
    const accentBorder = useAccentColor({lightModeWeight: ColorWeight.W400, darkModeWeight: ColorWeight.W500});
    const accentText = useAccentColor({lightModeWeight: ColorWeight.W700, darkModeWeight: ColorWeight.W100});
    const inactiveBg = useColorModeValue('white', 'gray.800');
    const inactiveBorder = useColorModeValue('blackAlpha.100', 'whiteAlpha.200');
    const inactiveText = useColorModeValue('gray.600', 'gray.300');

    const hoverBg = useColorModeValue('gray.100', 'gray.700');

    return (
        <Wrap spacing={3} shouldWrapChildren>
            {tags.map((tag) => {
                const isActive = tag === activeTag;
                return (
                    <WrapItem key={tag}>
                        <Button
                            size="sm"
                            variant="outline"
                            fontWeight="600"
                            rounded="full"
                            px={4}
                            py={2}
                            bg={isActive ? accentBg : inactiveBg}
                            color={isActive ? accentText : inactiveText}
                            borderColor={isActive ? accentBorder : inactiveBorder}
                            borderWidth={2}
                            _hover={{bg: isActive ? accentBg : hoverBg}}
                            onClick={() => onTagSelect(tag)}
                        >
                            {tag}
                        </Button>
                    </WrapItem>
                );
            })}
        </Wrap>
    );
};

export default ProjectTagFilter;
