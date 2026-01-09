
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Job, Application, AuthState, UserRole, ApplicationStatus } from './types';
import { db } from './db';

interface AppContextType {
  auth: AuthState;
  jobs: Job[];
  applications: Application[];
  users: User[];
  login: (email: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, role: UserRole) => void;
  addJob: (job: Omit<Job, 'id' | 'createdAt' | 'recruiterId'>) => void;
  updateJob: (id: string, updates: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  applyToJob: (jobId: string, coverLetter?: string) => void;
  updateApplicationStatus: (id: string, status: ApplicationStatus) => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({ user: db.getCurrentUser(), isAuthenticated: !!db.getCurrentUser() });
  const [jobs, setJobs] = useState<Job[]>(db.getJobs());
  const [applications, setApplications] = useState<Application[]>(db.getApplications());
  const [users, setUsers] = useState<User[]>(db.getUsers());

  useEffect(() => {
    db.init();
  }, []);

  const login = (email: string) => {
    const user = users.find(u => u.email === email);
    if (user) {
      db.setCurrentUser(user);
      setAuth({ user, isAuthenticated: true });
      return true;
    }
    return false;
  };

  const logout = () => {
    db.setCurrentUser(null);
    setAuth({ user: null, isAuthenticated: false });
  };

  const register = (name: string, email: string, role: UserRole) => {
    const newUser: User = { id: Date.now().toString(), name, email, role };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    db.saveUsers(updatedUsers);
    login(email);
  };

  const addJob = (jobData: Omit<Job, 'id' | 'createdAt' | 'recruiterId'>) => {
    if (!auth.user) return;
    const newJob: Job = {
      ...jobData,
      id: 'j' + Date.now(),
      recruiterId: auth.user.id,
      createdAt: Date.now(),
      active: true
    };
    const updatedJobs = [newJob, ...jobs];
    setJobs(updatedJobs);
    db.saveJobs(updatedJobs);
  };

  const updateJob = (id: string, updates: Partial<Job>) => {
    const updatedJobs = jobs.map(j => j.id === id ? { ...j, ...updates } : j);
    setJobs(updatedJobs);
    db.saveJobs(updatedJobs);
  };

  const deleteJob = (id: string) => {
    const updatedJobs = jobs.filter(j => j.id !== id);
    setJobs(updatedJobs);
    db.saveJobs(updatedJobs);
  };

  const applyToJob = (jobId: string, coverLetter?: string) => {
    if (!auth.user) return;
    const newApp: Application = {
      id: 'app' + Date.now(),
      jobId,
      seekerId: auth.user.id,
      status: ApplicationStatus.APPLIED,
      appliedDate: Date.now(),
      coverLetter
    };
    const updatedApps = [...applications, newApp];
    setApplications(updatedApps);
    db.saveApplications(updatedApps);
  };

  const updateApplicationStatus = (id: string, status: ApplicationStatus) => {
    const updatedApps = applications.map(a => a.id === id ? { ...a, status } : a);
    setApplications(updatedApps);
    db.saveApplications(updatedApps);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!auth.user) return;
    const updatedUser = { ...auth.user, ...updates };
    const updatedUsers = users.map(u => u.id === auth.user?.id ? updatedUser : u);
    setUsers(updatedUsers);
    db.saveUsers(updatedUsers);
    setAuth({ ...auth, user: updatedUser });
    db.setCurrentUser(updatedUser);
  };

  return (
    <AppContext.Provider value={{
      auth, jobs, applications, users,
      login, logout, register, addJob, updateJob, deleteJob, applyToJob, updateApplicationStatus, updateProfile
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useStore must be used within AppProvider');
  return context;
};
