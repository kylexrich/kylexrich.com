import React from 'react';
import {Button, useColorModeValue, Wrap, WrapItem} from '@chakra-ui/react';
import {ColorWeight, useAccentColor} from '../../../theme/accentColor.ts';

export interface ProjectTagFilterProps {
    tags: string[];
    selectedTags: string[];
    onToggleTag: (tag: string) => void;
}

const ProjectTagFilter: React.FC<ProjectTagFilterProps> = ({tags, selectedTags, onToggleTag}) => {
    const accentBg = useAccentColor({lightModeWeight: ColorWeight.W100, darkModeWeight: ColorWeight.W700});
    const accentBorder = useAccentColor({lightModeWeight: ColorWeight.W400, darkModeWeight: ColorWeight.W500});
    const accentText = useAccentColor({lightModeWeight: ColorWeight.W700, darkModeWeight: ColorWeight.W100});
    const inactiveBg = useColorModeValue('white', 'gray.900');
    const inactiveBorder = useColorModeValue('blackAlpha.100', 'whiteAlpha.200');
    const inactiveText = useColorModeValue('gray.600', 'gray.300');
    const hoverBg = useColorModeValue('gray.100', 'gray.700');

    const isTagActive = (tag: string): boolean => {
        if (tag === 'All') {
            return selectedTags.length === 0;
        }
        return selectedTags.includes(tag);
    };

    return (
        <Wrap spacing={3} shouldWrapChildren>
            {tags.map((tag) => {
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
                            onClick={() => onToggleTag(tag)}
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
