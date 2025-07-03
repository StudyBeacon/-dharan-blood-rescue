
import React from 'react';

interface PageHeaderProps {
  activeTab: string;
  userName: string;
  userRole: string;
}

const PageHeader = ({ activeTab, userName, userRole }: PageHeaderProps) => {
  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return `${userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard`;
      case 'directory':
        return 'Donor Directory';
      case 'profile':
        return 'Profile & Settings';
      case 'help':
        return 'Help & Support';
      case 'analytics':
        return 'Smart Analytics';
      case 'emergency':
        return 'Emergency System';
      case 'settings':
        return 'Production Settings';
      case 'map':
        return 'Live Map & Tracking';
      default:
        return activeTab;
    }
  };

  const getDescription = () => {
    switch (activeTab) {
      case 'dashboard':
        return `Welcome back, ${userName}`;
      case 'directory':
        return 'Find blood donors in your area';
      case 'profile':
        return 'Manage your account and session settings';
      case 'help':
        return 'Get help and support';
      case 'analytics':
        return 'Advanced analytics and insights';
      case 'emergency':
        return 'Emergency response coordination';
      case 'settings':
        return 'Production-ready configurations and PWA features';
      case 'map':
        return 'Real-time tracking and navigation';
      default:
        return '';
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white capitalize animate-fade-in">
        {getTitle()}
      </h2>
      <p className="text-gray-600 dark:text-gray-300">
        {getDescription()}
      </p>
    </div>
  );
};

export default PageHeader;
