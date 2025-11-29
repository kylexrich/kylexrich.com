import React from 'react';
import {Tag, Wrap, WrapItem} from '@chakra-ui/react';
import {AboutCardThemeProps} from './AboutCard.tsx';

interface SkillTagsProps extends AboutCardThemeProps {
    skills?: string[];
    marginTop?: number;
}

const SkillTags: React.FC<SkillTagsProps> = ({skills, skillColor, textColor, marginTop}) => {
    if (!skills) return null;

    return (
        <Wrap mt={marginTop ?? 4}>
            {skills.map((skill) => (
                <WrapItem key={skill}>
                    <Tag
                        borderRadius="full"
                        px={{base: 2, md: 3}}
                        py={1}
                        color={textColor}
                        borderColor={skillColor}
                        borderWidth="1px"
                    >
                        {skill}
                    </Tag>
                </WrapItem>
            ))}
        </Wrap>
    );
};

export default SkillTags;
