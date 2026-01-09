
import { User, Job, Application, UserRole, ApplicationStatus } from './types';

const STORAGE_KEYS = {
  USERS: 'hiresync_users',
  JOBS: 'hiresync_jobs',
  APPLICATIONS: 'hiresync_applications',
  CURRENT_USER: 'hiresync_current_user'
};

// Initial Data
const DEFAULT_USERS: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@hiresync.com', role: UserRole.ADMIN },
  { id: '2', name: 'John Recruiter', email: 'hr@google.com', role: UserRole.RECRUITER },
  { 
    id: '3', 
    name: 'Alice Seeker', 
    email: 'hassaanjatt48@gmail.com', 
    phone: '03173226331',
    role: UserRole.SEEKER, 
    skills: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    experience: 'Passionate frontend developer with a focus on creating intuitive and high-performance user interfaces.',
    education: 'Bachelor of Computer Science',
    location: 'Thatta, Sindh, Pakistan',
    languages: ['English', 'Urdu', 'Punjabi'],
    socialLinks: {
      linkedin: 'linkedin.com/in/hassaanjatt',
      github: 'github.com/hassaanjatt',
      portfolio: 'hassaanjatt.dev'
    }
  }
];

const DEFAULT_JOBS: Job[] = [
  {
    id: 'j1',
    recruiterId: '2',
    title: 'Senior Frontend Engineer',
    company: 'Google',
    location: 'Mountain View, CA',
    type: 'Full-time',
    salary: '$150k - $220k',
    description: 'We are looking for a React expert to lead our dashboard team.',
    requirements: ['5+ years React', 'TypeScript expertise', 'System design'],
    createdAt: Date.now() - 86400000,
    active: true
  },
  {
    id: 'j2',
    recruiterId: '2',
    title: 'Backend Developer',
    company: 'Stripe',
    location: 'Remote',
    type: 'Remote',
    salary: '$140k - $200k',
    description: 'Help us scale global payments infrastructure.',
    requirements: ['Node.js', 'PostgreSQL', 'Microservices'],
    createdAt: Date.now() - 172800000,
    active: true
  },
  {
    id: 'j3',
    recruiterId: '2',
    title: 'UI/UX Designer',
    company: 'Airbnb',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$130k - $180k',
    description: 'Join our design team to create beautiful and accessible travel experiences.',
    requirements: ['Figma mastery', 'Prototyping skills', 'User research experience'],
    createdAt: Date.now() - 259200000,
    active: true
  },
  {
    id: 'j4',
    recruiterId: '2',
    title: 'Data Scientist',
    company: 'Meta',
    location: 'Menlo Park, CA',
    type: 'Full-time',
    salary: '$160k - $240k',
    description: 'Leverage data to drive insights and product decisions for billions of users.',
    requirements: ['Python/R expertise', 'SQL proficiency', 'Machine Learning fundamentals'],
    createdAt: Date.now() - 345600000,
    active: true
  },
  {
    id: 'j5',
    recruiterId: '2',
    title: 'Product Manager',
    company: 'Slack',
    location: 'Remote',
    type: 'Remote',
    salary: '$145k - $210k',
    description: 'Define the roadmap for the future of business communication.',
    requirements: ['Product strategy', 'Agile methodologies', 'Excellent communication'],
    createdAt: Date.now() - 432000000,
    active: true
  },
  {
    id: 'j6',
    recruiterId: '2',
    title: 'Mobile Engineer (iOS)',
    company: 'Apple',
    location: 'Cupertino, CA',
    type: 'Full-time',
    salary: '$155k - $230k',
    description: 'Work on the next generation of iOS features and frameworks.',
    requirements: ['Swift', 'Objective-C', 'UIKit/SwiftUI'],
    createdAt: Date.now() - 518400000,
    active: true
  }
];

export const db = {
  getUsers: (): User[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || JSON.stringify(DEFAULT_USERS)),
  saveUsers: (users: User[]) => localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users)),
  
  getJobs: (): Job[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.JOBS) || JSON.stringify(DEFAULT_JOBS)),
  saveJobs: (jobs: Job[]) => localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs)),
  
  getApplications: (): Application[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS) || '[]'),
  saveApplications: (apps: Application[]) => localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps)),
  
  getCurrentUser: (): User | null => JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER) || 'null'),
  setCurrentUser: (user: User | null) => localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user)),

  // Helper to initialize if empty
  init: () => {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
    if (!localStorage.getItem(STORAGE_KEYS.JOBS)) localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(DEFAULT_JOBS));
  }
};
