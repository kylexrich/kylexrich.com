import { ColorMode } from '../../theme/theme';

export interface AboutCardDetail {
    imageRefs: ColorMode;
    title: string;
    subtitle?: string;
    type?: string;
    shortDescription?: string;
    longDescriptionParagraphs?: string[];
    dateText: string;
    skills?: string[];
}
