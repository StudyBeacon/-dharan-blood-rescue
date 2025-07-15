import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Download, Wifi, WifiOff, Bell, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Extend Window interface to include deferredPrompt
declare global {
  interface Window {
    deferredPrompt?: any;
  }
}

const PWAManager = () => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [notificationPermission, setNotificationPermission] = useState(Notification.permission);
  const [pwaStats, setPwaStats] = useState({
    cacheSize: '2.4 MB',
    offlinePages: 12,
    lastSync: new Date(),
    version: '1.2.3'
  });
  const { toast } = useToast();

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setIsInstallable(true);
      window.deferredPrompt = e;
    };

    // Listen for network changes
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstallPWA = async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) return;

    promptEvent.prompt();
    const result = await promptEvent.userChoice;
    
    if (result.outcome === 'accepted') {
      setIsInstalled(true);
      setIsInstallable(false);
      toast({
        title: "App Installed",
        description: "BloodConnect has been installed on your device",
      });
    }
    
    window.deferredPrompt = null;
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      
      if (permission === 'granted') {
        toast({
          title: "Notifications Enabled",
          description: "You'll receive important emergency updates",
        });
        
        // Show a test notification
        new Notification('BloodConnect', {
          body: 'Notifications are now enabled for emergency alerts',
          icon: '/favicon.ico'
        });
      }
    }
  };

  const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        toast({
          title: "Service Worker Registered",
          description: "Offline functionality is now available",
        });
      } catch (error) {
        console.error('Service Worker registration failed:', error);
        toast({
          title: "Registration Failed",
          description: "Could not enable offline functionality",
          variant: "destructive",
        });
      }
    }
  };

  const updateCache = async () => {
    if ('serviceWorker' in navigator && 'caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      
      setPwaStats(prev => ({ ...prev, lastSync: new Date() }));
      toast({
        title: "Cache Updated",
        description: "App data has been refreshed",
      });
    }
  };

  const getRateLimitColor = () => {
    const percentage = (0 / 100) * 100; // Simplified for now
    if (percentage > 80) return 'text-red-600';
    if (percentage > 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* PWA Installation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Smartphone className="h-5 w-5 text-blue-600" />
            <span>Progressive Web App</span>
            {isInstalled ? (
              <Badge className="bg-green-100 text-green-800">Installed</Badge>
            ) : isInstallable ? (
              <Badge className="bg-blue-100 text-blue-800">Available</Badge>
            ) : (
              <Badge className="bg-gray-100 text-gray-800">Not Available</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-600">
            Install BloodConnect as a native app for better performance and offline access.
          </div>

          {isInstalled ? (
            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <p className="text-green-700 dark:text-green-300 text-sm">
                ✅ App is installed and running in standalone mode
              </p>
            </div>
          ) : isInstallable ? (
            <Button onClick={handleInstallPWA} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Install App
            </Button>
          ) : (
            <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
              <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                ⚠️ Install prompt not available. Try using Chrome or Edge browser.
              </p>
            </div>
          )}

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Version:</span>
              <span className="font-mono">{pwaStats.version}</span>
            </div>
            <div className="flex justify-between">
              <span>Cache Size:</span>
              <span>{pwaStats.cacheSize}</span>
            </div>
            <div className="flex justify-between">
              <span>Offline Pages:</span>
              <span>{pwaStats.offlinePages}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features & Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-purple-600" />
            <span>App Features</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Network Status */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center space-x-2">
              {isOnline ? (
                <Wifi className="h-4 w-4 text-green-600" />
              ) : (
                <WifiOff className="h-4 w-4 text-red-600" />
              )}
              <span className="text-sm">Network Status</span>
            </div>
            <Badge className={isOnline ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
              {isOnline ? 'Online' : 'Offline'}
            </Badge>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4 text-orange-600" />
              <span className="text-sm">Push Notifications</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={
                notificationPermission === 'granted' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }>
                {notificationPermission === 'granted' ? 'Enabled' : 'Disabled'}
              </Badge>
              {notificationPermission !== 'granted' && (
                <Button size="sm" onClick={requestNotificationPermission}>
                  Enable
                </Button>
              )}
            </div>
          </div>

          {/* Service Worker */}
          <div className="space-y-2">
            <Button onClick={registerServiceWorker} className="w-full" variant="outline">
              Register Service Worker
            </Button>
            <Button onClick={updateCache} className="w-full" variant="outline">
              Update Cache
            </Button>
          </div>

          <div className="text-xs text-gray-500">
            Last synced: {pwaStats.lastSync.toLocaleString()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PWAManager;
