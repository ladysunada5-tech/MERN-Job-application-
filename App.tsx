
import React, { useState } from 'react';
import { AppProvider, useStore } from './store';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { JobsPage } from './pages/JobsPage';
import { RecruiterDashboard } from './pages/RecruiterDashboard';
import { ProfilePage } from './pages/ProfilePage';
import { MyApplications } from './pages/MyApplications';
import { AIAssistant } from './components/AIAssistant';

const AppContent: React.FC = () => {
  const { auth } = useStore();
  const [currentTab, setCurrentTab] = useState('jobs');

  if (!auth.isAuthenticated) {
    return <Login />;
  }

  const renderContent = () => {
    switch (currentTab) {
      case 'jobs': return <JobsPage />;
      case 'manage-jobs': return <RecruiterDashboard />;
      case 'my-apps': return <MyApplications />;
      case 'profile': return <ProfilePage />;
      default: return <JobsPage />;
    }
  };

  return (
    <Layout currentTab={currentTab} onTabChange={setCurrentTab}>
      {renderContent()}
      <AIAssistant />
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
