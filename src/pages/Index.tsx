import React, { useState, useEffect } from 'react';
import AuthForm from '@/components/AuthForm';
import Header from '@/components/Header';
import DonorDashboard from '@/components/DonorDashboard';
import DriverDashboard from '@/components/DriverDashboard';
import PatientDashboard from '@/components/PatientDashboard';
import DonorDirectory from '@/components/DonorDirectory';
import AdvancedSearch from '@/components/AdvancedSearch';
import RewardsSystem from '@/components/RewardsSystem';
import EnhancedRewardsSystem from '@/components/EnhancedRewardsSystem';
import NotificationSystem from '@/components/NotificationSystem';
import RealTimeNotifications from '@/components/RealTimeNotifications';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import SmartAnalytics from '@/components/SmartAnalytics';
import AccessibilityFeatures from '@/components/AccessibilityFeatures';
import ProfileSettings from '@/components/ProfileSettings';
import HelpSupport from '@/components/HelpSupport';
import BottomNavigation from '@/components/BottomNavigation';
import ErrorBoundary from '@/components/ErrorBoundary';
import MapIntegration from '@/components/MapIntegration';
import EmergencySystem from '@/components/EmergencySystem';
import ProductionFeatures from '@/components/ProductionFeatures';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import FormValidation from '@/components/FormValidation';
import LiveChatSystem from '@/components/LiveChatSystem';
import SessionManager from '@/components/SessionManager';
import PWAManager from '@/components/PWAManager';
import { useToast } from '@/hooks/use-toast';
import { useOfflineSupport } from '@/hooks/useOfflineSupport';
import { useWebSocket } from '@/hooks/useWebSocket';

const Index = () => {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: 'donor' | 'driver' | 'patient';
    bloodGroup?: string;
    id: string;
  } | null>(null);
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ne'>('en');
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Initialize offline support and WebSocket
  const { isOnline, offlineData, pendingOperations } = useOfflineSupport();
  const { isConnected: wsConnected, messages: wsMessages } = useWebSocket();

  // Initialize user session and dark mode
  useEffect(() => {
    const savedUser = localStorage.getItem('bloodconnect_user');
    const savedDarkMode = localStorage.getItem('bloodconnect_darkmode');
    
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('bloodconnect_user');
      }
    }
    
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    } else {
      // Auto-detect system preference
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    
    setIsLoading(false);
  }, []);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('bloodconnect_darkmode', JSON.stringify(darkMode));
  }, [darkMode]);

  const handleLogin = (role: 'donor' | 'driver' | 'patient', userData: any) => {
    const userWithId = { ...userData, role, id: Date.now().toString() };
    setUser(userWithId);
    localStorage.setItem('bloodconnect_user', JSON.stringify(userWithId));
    toast({
      title: "Welcome back!",
      description: `Logged in as ${role}`,
    });
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
    localStorage.removeItem('bloodconnect_user');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const handleLanguageChange = (lang: 'en' | 'ne') => {
    setCurrentLanguage(lang);
    localStorage.setItem('bloodconnect_language', lang);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const renderContent = () => {
    if (!user) return null;

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
      case 'accessibility':
        return <AccessibilityFeatures />;
      case 'profile':
        return (
          <div className="space-y-6">
            <ProfileSettings user={user} onUpdate={setUser} onDarkModeToggle={handleDarkModeToggle} darkMode={darkMode} />
            <SessionManager user={user} onLogout={handleLogout} />
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <ErrorBoundary>
        <AuthForm onLogin={handleLogin} currentLanguage={currentLanguage} />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Offline indicator */}
        {!isOnline && (
          <div className="bg-orange-600 text-white text-center py-2 text-sm">
            ⚠️ You're offline. {pendingOperations} operations pending sync.
          </div>
        )}
        
        {/* WebSocket status */}
        {!wsConnected && isOnline && (
          <div className="bg-blue-600 text-white text-center py-1 text-xs">
            📡 Connecting to live updates...
          </div>
        )}
        
        <Header 
          user={user} 
          onLogout={handleLogout}
          onLanguageChange={handleLanguageChange}
          currentLanguage={currentLanguage}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
          <BreadcrumbNavigation activeTab={activeTab} userRole={user.role} />
          
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white capitalize animate-fade-in">
              {activeTab === 'dashboard' ? `${user.role} Dashboard` : 
               activeTab === 'directory' ? 'Donor Directory' :
               activeTab === 'profile' ? 'Profile & Settings' :
               activeTab === 'help' ? 'Help & Support' :
               activeTab === 'analytics' ? 'Smart Analytics' :
               activeTab === 'emergency' ? 'Emergency System' :
               activeTab === 'settings' ? 'Production Settings' :
               activeTab === 'map' ? 'Live Map & Tracking' : activeTab}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {activeTab === 'dashboard' ? `Welcome back, ${user.name}` :
               activeTab === 'directory' ? 'Find blood donors in your area' :
               activeTab === 'profile' ? 'Manage your account and session settings' :
               activeTab === 'help' ? 'Get help and support' :
               activeTab === 'analytics' ? 'Advanced analytics and insights' :
               activeTab === 'emergency' ? 'Emergency response coordination' :
               activeTab === 'settings' ? 'Production-ready configurations and PWA features' :
               activeTab === 'map' ? 'Real-time tracking and navigation' : ''}
            </p>
          </div>
          
          {renderContent()}
        </main>

        <BottomNavigation 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          userRole={user.role}
        />
      </div>
    </ErrorBoundary>
  );
};

export default Index;
