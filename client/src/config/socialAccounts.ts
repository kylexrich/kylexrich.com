import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import React from "react";

type SocialAccount = {
  url: string;
  label: string;
  type: string;
  icon: React.ElementType;
};

export const socialAccounts: SocialAccount[] = [
  {
    url: "https://github.com/kylexrich",
    label: "Github Account",
    type: "red",
    icon: FaGithub,
  },
  {
    url: "https://www.linkedin.com/in/kylexrich/",
    label: "LinkedIn Account",
    type: "linkedin",
    icon: FaLinkedin,
  },
  {
    url: "https://www.facebook.com/kylexrich/",
    label: "Facebook Account",
    type: "facebook",
    icon: FaFacebook,
  },
  {
    url: "https://www.instagram.com/kylexrich/",
    label: "Instagram Account",
    type: "pink",
    icon: FaInstagram,
  },
  {
    url: "mailto:kylexrich@gmail.com",
    label: "Mail Kyle",
    type: "gray",
    icon: FiMail,
  },
];
