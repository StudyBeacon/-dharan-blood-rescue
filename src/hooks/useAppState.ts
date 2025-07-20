import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useOfflineSupport } from '@/hooks/useOfflineSupport';
import { useWebSocket } from '@/hooks/useWebSocket';
import api from '@/api/api'; // ✅ axios instance to call backend

export const useAppState = () => {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: 'donor' | 'driver' | 'patient';
    bloodGroup?: string;
    id: string;
  } | null>(null);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Offline support and WebSocket
  const { isOnline, offlineData, pendingOperations } = useOfflineSupport();
  const { isConnected: wsConnected, messages: wsMessages } = useWebSocket();

  // Language state
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ne'>(() => {
    const saved = localStorage.getItem('bloodconnect_language');
    return (saved as 'en' | 'ne') || 'en';
  });

  // On initial load, restore state from localStorage
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
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }

    setIsLoading(false);
  }, []);

  // Sync dark mode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('bloodconnect_darkmode', JSON.stringify(darkMode));
  }, [darkMode]);

  // ✅ Real login API call to backend
  const handleLogin = async (loginData: {
    email: string;
    password: string;
    role: 'donor' | 'driver' | 'patient';
  }) => {
    try {
      setIsLoading(true);
      const response = await api.post('/auth/login', loginData);

      const { token, user: userData } = response.data;

      const userWithRole = {
        ...userData,
        role: loginData.role,
      };

      setUser(userWithRole);
      localStorage.setItem('bloodconnect_user', JSON.stringify(userWithRole));
      localStorage.setItem('bloodconnect_token', token);

      toast({
        title: "Welcome back!",
        description: `Logged in as ${loginData.role}`,
      });
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error?.response?.data?.message || "Invalid credentials or server error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
    localStorage.removeItem('bloodconnect_user');
    localStorage.removeItem('bloodconnect_token');

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
    handleDarkModeToggle,
  };
};
