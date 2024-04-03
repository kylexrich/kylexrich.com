import React from 'react';
import { AboutCardThemeProps } from './AboutCard';
import { Tag, Wrap, WrapItem } from '@chakra-ui/react';

const SkillTags: React.FC<AboutCardThemeProps & { skills?: string[] }> = ({ skills, skillColor, textColor, subTextColor }) => {
    if (!skills) return null;

    return (
        <Wrap mt={4}>
            {skills.map((skill) => (
                <WrapItem key={skill}>
                    <Tag borderRadius="full" px={{ base: 2, md: 3 }} py={1} color={textColor} borderColor={skillColor} borderWidth="1px">
                        {skill}
                    </Tag>
                </WrapItem>
            ))}
        </Wrap>
    );
};

export default SkillTags;
