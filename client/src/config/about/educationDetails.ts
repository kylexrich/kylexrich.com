import {AboutCardDetail} from './AboutCardDetail.ts';

export const educationDetails: AboutCardDetail[] = [
    {
        title: 'University of British Columbia',
        subtitle: 'Bachelor of Business and Computer Science',
        shortDescription: 'GPA: 3.9/4',
        dateText: 'Graduation: 2025',
        imageRefs: {
            light: '/assets/images/about/ubclogo.jpeg',
            dark: '/assets/images/about/ubclogo.jpeg'
        },
        skills: ['Java', 'C++', 'HTML', 'CSS', 'JavaScript', 'TypeScript']
    },
    {
        title: 'Langara',
        subtitle: 'UBC Transfer Program',
        shortDescription: 'GPA: 4/4',
        dateText: '',
        imageRefs: {
            light: '/assets/images/about/langaralogo.jpeg',
            dark: '/assets/images/about/langaralogo.jpeg'
        },
        skills: []
    }
];
