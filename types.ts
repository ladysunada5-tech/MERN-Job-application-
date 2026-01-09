
export enum UserRole {
  ADMIN = 'ADMIN',
  RECRUITER = 'RECRUITER',
  SEEKER = 'SEEKER'
}

export enum ApplicationStatus {
  APPLIED = 'APPLIED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  SHORTLISTED = 'SHORTLISTED',
  REJECTED = 'REJECTED',
  HIRED = 'HIRED'
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  coverUrl?: string;
  skills?: string[];
  experience?: string;
  resumeUrl?: string;
  location?: string;
  education?: string;
  languages?: string[];
  socialLinks?: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
}

export interface Job {
  id: string;
  recruiterId: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  salary: string;
  description: string;
  requirements: string[];
  createdAt: number;
  active: boolean;
}

export interface Application {
  id: string;
  jobId: string;
  seekerId: string;
  status: ApplicationStatus;
  appliedDate: number;
  coverLetter?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
