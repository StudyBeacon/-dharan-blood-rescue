
import React, { useState } from 'react';
import AuthForm from '@/components/AuthForm';
import Header from '@/components/Header';
import DonorDashboard from '@/components/DonorDashboard';
import DriverDashboard from '@/components/DriverDashboard';
import PatientDashboard from '@/components/PatientDashboard';
import BottomNavigation from '@/components/BottomNavigation';

const Index = () => {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: 'donor' | 'driver' | 'patient';
    bloodGroup?: string;
  } | null>(null);
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ne'>('en');

  const handleLogin = (role: 'donor' | 'driver' | 'patient', userData: any) => {
    setUser({ ...userData, role });
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
  };

  const handleLanguageChange = (lang: 'en' | 'ne') => {
    setCurrentLanguage(lang);
  };

  const renderDashboard = () => {
    if (!user) return null;

    switch (user.role) {
      case 'donor':
        return <DonorDashboard />;
      case 'driver':
        return <DriverDashboard />;
      case 'patient':
        return <PatientDashboard />;
      default:
        return <DonorDashboard />;
    }
  };

  if (!user) {
    return <AuthForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user} 
        onLogout={handleLogout}
        onLanguageChange={handleLanguageChange}
        currentLanguage={currentLanguage}
      />
      
      <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 capitalize">
            {user.role} Dashboard
          </h2>
          <p className="text-gray-600">
            Welcome back, {user.name}
          </p>
        </div>
        
        {renderDashboard()}
      </main>

      <BottomNavigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        userRole={user.role}
      />
    </div>
  );
};

export default Index;
