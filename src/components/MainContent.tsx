
import React from 'react';
import DonorDashboard from '@/components/DonorDashboard';
import DriverDashboard from '@/components/DriverDashboard';
import PatientDashboard from '@/components/PatientDashboard';
import DonorDirectory from '@/components/DonorDirectory';
import AdvancedSearch from '@/components/AdvancedSearch';
import EnhancedRewardsSystem from '@/components/EnhancedRewardsSystem';
import RealTimeNotifications from '@/components/RealTimeNotifications';
import NotificationSystem from '@/components/NotificationSystem';
import SmartAnalytics from '@/components/SmartAnalytics';
import ProfileSettings from '@/components/ProfileSettings';
import SessionManager from '@/components/SessionManager';
import HelpSupport from '@/components/HelpSupport';
import MapIntegration from '@/components/MapIntegration';
import EmergencySystem from '@/components/EmergencySystem';
import ProductionFeatures from '@/components/ProductionFeatures';
import PWAManager from '@/components/PWAManager';
import FormValidation from '@/components/FormValidation';
import LiveChatSystem from '@/components/LiveChatSystem';

interface MainContentProps {
  activeTab: string;
  user: {
    name: string;
    email: string;
    role: 'donor' | 'driver' | 'patient';
    bloodGroup?: string;
    id: string;
  };
  onUserUpdate: (user: any) => void;
  onDarkModeToggle: () => void;
  darkMode: boolean;
  onLogout: () => void;
}

const MainContent = ({ 
  activeTab, 
  user, 
  onUserUpdate, 
  onDarkModeToggle, 
  darkMode, 
  onLogout 
}: MainContentProps) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        switch (user.role) {
          case 'donor':
            return <DonorDashboard user={user} />;
          case 'driver':
            return <DriverDashboard user={user} />;
          case 'patient':
            return <PatientDashboard user={user} />;
          default:
            return <DonorDashboard user={user} />;
        }
      case 'directory':
        return <DonorDirectory />;
      case 'search':
        return (
          <div className="space-y-6">
            <AdvancedSearch />
            <FormValidation />
          </div>
        );
      case 'rewards':
        return <EnhancedRewardsSystem user={user} />;
      case 'notifications':
        return (
          <div className="space-y-6">
            <RealTimeNotifications />
            <NotificationSystem />
            <LiveChatSystem user={user} />
          </div>
        );
      case 'analytics':
        return <SmartAnalytics />;
      case 'profile':
        return (
          <div className="space-y-6">
            <ProfileSettings 
              user={user} 
              onUpdate={onUserUpdate} 
              onDarkModeToggle={onDarkModeToggle} 
              darkMode={darkMode} 
            />
            <SessionManager user={user} onLogout={onLogout} />
          </div>
        );
      case 'help':
        return <HelpSupport />;
      case 'map':
        return <MapIntegration />;
      case 'emergency':
        return <EmergencySystem />;
      case 'settings':
        return (
          <div className="space-y-6">
            <ProductionFeatures />
            <PWAManager />
          </div>
        );
      default:
        return renderContent();
    }
  };

  return renderContent();
};

export default MainContent;
