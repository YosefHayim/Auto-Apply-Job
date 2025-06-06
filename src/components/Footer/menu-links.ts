import facebookSvg from "/svgs/facebook.svg";
import instagramSvg from "/svgs/instegram.svg";
import tiktokSvg from "/svgs/tiktok.svg";
import twitter from "/svgs/twitter.svg";
import customSvg from "/svgs/custom.svg";
import linkedinSvg from "/svgs/linkedin.svg";
import youtubeSvg from "/svgs/youtube.svg";

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

export const svgsLinks = {
  facebook: facebookSvg,
  instegram: instagramSvg,
  tiktok: tiktokSvg,
  youtube: youtubeSvg,
  linkedin: linkedinSvg,
  twitter: twitter,
  custom: customSvg,
};

export const sociaLinks = [
  { title: "Facebook", to: "https://facebook.com" },
  { title: "Instagram", to: "https://instagram.com" },
  { title: "Tiktok", to: "https://tiktok.com" },
  { title: "Youtube", to: "https://youtube.com" },
];

export const footerLinks: FooterSection[] = [
  {
    label: "About",
    links: [
      { title: "Download the app", href: "#features" },
      { title: "Pricing", href: "#pricing" },
      { title: "Contact us", href: "#testimonials" },
      { title: "Start free trial", href: "/" },
    ],
  },
  {
    label: "Product",
    links: [
      { title: "Appointment confirmations", href: "/faqs" },
      { title: "Calendar management", href: "/about" },
      { title: "Payments", href: "/privacy" },
      { title: "Reports", href: "/terms" },
    ],
  },
  {
    label: "Customer Service",
    links: [
      { title: "Call us", href: "/blog" },
      { title: "Send a message", href: "/changelog" },
      { title: "Customer support", href: "/brand" },
    ],
  },
];
