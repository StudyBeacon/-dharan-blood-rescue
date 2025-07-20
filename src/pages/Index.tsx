import React from "react";
import AuthForm from "@/components/AuthForm";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import ErrorBoundary from "@/components/ErrorBoundary";
import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import StatusIndicators from "@/components/StatusIndicators";
import PageHeader from "@/components/PageHeader";
import MainContent from "@/components/MainContent";
import { useAppState } from "@/hooks/useAppState";

const Index: React.FC = () => {
  const {
    user,
    setUser,
    activeTab,
    setActiveTab,
    currentLanguage,
    darkMode,
    isLoading,
    isOnline,
    pendingOperations,
    wsConnected,
    handleLogin,
    handleLogout,
    handleLanguageChange,
    handleDarkModeToggle,
  } = useAppState();

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
        <AuthForm />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <StatusIndicators
          isOnline={isOnline}
          pendingOperations={pendingOperations}
          wsConnected={wsConnected}
        />

        {/*user={user}*/}
        <Header
          onLogout={handleLogout}
          onLanguageChange={handleLanguageChange}
          currentLanguage={currentLanguage}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
          <BreadcrumbNavigation activeTab={activeTab} userRole={user.role} />

          <PageHeader
            activeTab={activeTab}
            userName={user.name}
            userRole={user.role}
          />

          <MainContent
            activeTab={activeTab}
            user={user}
            onUserUpdate={setUser}
            onDarkModeToggle={handleDarkModeToggle}
            darkMode={darkMode}
            onLogout={handleLogout}
          />
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
