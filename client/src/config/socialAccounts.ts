import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import React from 'react';

export interface SocialAccount {
    url: string;
    label: string;
    colorScheme: string;
    icon: React.ElementType;
}

export const socialAccounts: SocialAccount[] = [
    {
        url: 'https://github.com/kylexrich',
        label: 'Github Account',
        colorScheme: 'red',
        icon: FaGithub
    },
    {
        url: 'https://www.linkedin.com/in/kylexrich/',
        label: 'LinkedIn Account',
        colorScheme: 'linkedin',
        icon: FaLinkedin
    },
    {
        url: 'https://www.facebook.com/kylexrich/',
        label: 'Facebook Account',
        colorScheme: 'facebook',
        icon: FaFacebook
    },
    {
        url: 'https://www.instagram.com/kylexrich/',
        label: 'Instagram Account',
        colorScheme: 'pink',
        icon: FaInstagram
    },
    {
        url: 'mailto:kylexrich@gmail.com',
        label: 'Mail Kyle',
        colorScheme: 'gray',
        icon: FiMail
    }
];
