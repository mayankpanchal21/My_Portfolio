import type { Education, NavItem, Profile } from '../types';

export const profile: Profile = {
  name: 'Mayank Panchal',
  title: 'Software Engineer | Full Stack Developer',
  email: 'mayankpanchal2002@gmail.com',
  githubUrl: 'https://github.com/mayankpanchal21',
  linkedinUrl: 'https://www.linkedin.com/in/mayank-panchal-6040b1241/',
  // PLACEHOLDER: add your PDF to /public/resume/ and set e.g. '/resume/Mayank-Panchal-Resume.pdf'.
  resumeUrl: '',
  availability: {
    // Hidden by default. Set visible: true only while this is accurate.
    visible: false,
    label: 'Open to software engineering roles',
  },
};

export const education: Education = {
  degree: 'Bachelor of Technology (B.Tech)',
  field: 'Computer Science and Engineering',
  institution: 'Dr. A.P.J. Abdul Kalam Technical University',
  location: 'Lucknow',
  graduationYear: 2024,
};

export const navItems: NavItem[] = [
  { kind: 'section', id: 'home', label: 'Home' },
  { kind: 'section', id: 'about', label: 'About' },
  { kind: 'section', id: 'skills', label: 'Skills' },
  { kind: 'section', id: 'experience', label: 'Experience' },
  { kind: 'section', id: 'contact', label: 'Contact' },
  { kind: 'page', path: '/projects', label: 'Our Projects' },
  { kind: 'page', path: '/gallery', label: 'Gallery' },
  { kind: 'page', path: '/blog', label: 'Blog' },
];
