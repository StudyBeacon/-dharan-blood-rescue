
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useOfflineSupport } from '@/hooks/useOfflineSupport';
import { useWebSocket } from '@/hooks/useWebSocket';

export const useAppState = () => {
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

  return {
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
    handleDarkModeToggle
  };
};
