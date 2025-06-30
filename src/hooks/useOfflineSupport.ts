
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface OfflineData {
  bloodRequests: any[];
  ambulanceRequests: any[];
  donors: any[];
  userProfile: any;
  notifications: any[];
  lastSync: Date;
}

export const useOfflineSupport = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineData, setOfflineData] = useState<OfflineData | null>(null);
  const [pendingOperations, setPendingOperations] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "Back Online",
        description: "Connection restored. Syncing data...",
      });
      syncPendingOperations();
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "Offline Mode",
        description: "You're now offline. Some features may be limited.",
        variant: "destructive",
      });
      cacheCurrentData();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load cached data on mount
    loadCachedData();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  const loadCachedData = () => {
    try {
      const cached = localStorage.getItem('bloodconnect_offline_data');
      if (cached) {
        const data = JSON.parse(cached);
        setOfflineData(data);
      }

      const pending = localStorage.getItem('bloodconnect_pending_operations');
      if (pending) {
        setPendingOperations(JSON.parse(pending));
      }
    } catch (error) {
      console.error('Failed to load cached data:', error);
    }
  };

  const cacheCurrentData = () => {
    try {
      const dataToCache: OfflineData = {
        bloodRequests: JSON.parse(localStorage.getItem('bloodconnect_blood_requests') || '[]'),
        ambulanceRequests: JSON.parse(localStorage.getItem('bloodconnect_ambulance_requests') || '[]'),
        donors: JSON.parse(localStorage.getItem('bloodconnect_donors') || '[]'),
        userProfile: JSON.parse(localStorage.getItem('bloodconnect_user') || 'null'),
        notifications: JSON.parse(localStorage.getItem('bloodconnect_notifications') || '[]'),
        lastSync: new Date()
      };

      localStorage.setItem('bloodconnect_offline_data', JSON.stringify(dataToCache));
      setOfflineData(dataToCache);
    } catch (error) {
      console.error('Failed to cache data:', error);
    }
  };

  const addPendingOperation = (operation: any) => {
    const newOperations = [...pendingOperations, { ...operation, timestamp: new Date() }];
    setPendingOperations(newOperations);
    localStorage.setItem('bloodconnect_pending_operations', JSON.stringify(newOperations));
  };

  const syncPendingOperations = async () => {
    if (pendingOperations.length === 0) return;

    try {
      // Simulate API sync
      for (const operation of pendingOperations) {
        console.log('Syncing operation:', operation);
        // In a real app, you would make API calls here
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      setPendingOperations([]);
      localStorage.removeItem('bloodconnect_pending_operations');

      toast({
        title: "Sync Complete",
        description: `${pendingOperations.length} operations synced successfully`,
      });
    } catch (error) {
      console.error('Failed to sync operations:', error);
      toast({
        title: "Sync Failed",
        description: "Some operations couldn't be synced. Will retry later.",
        variant: "destructive",
      });
    }
  };

  const submitOfflineRequest = (type: 'blood' | 'ambulance', data: any) => {
    if (isOnline) {
      // Normal online submission
      return submitOnlineRequest(type, data);
    } else {
      // Queue for offline submission
      addPendingOperation({
        type: 'submit_request',
        requestType: type,
        data,
        id: Date.now().toString()
      });

      toast({
        title: "Request Queued",
        description: "Your request will be submitted when connection is restored",
      });

      return Promise.resolve({ success: true, offline: true });
    }
  };

  const submitOnlineRequest = async (type: 'blood' | 'ambulance', data: any) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, offline: false });
      }, 1000);
    });
  };

  const getCachedData = (key: keyof OfflineData) => {
    return offlineData?.[key] || null;
  };

  const canUseFeature = (feature: string) => {
    // Define which features work offline
    const offlineFeatures = [
      'view_profile',
      'view_cached_donors',
      'view_notifications',
      'view_requests'
    ];

    return isOnline || offlineFeatures.includes(feature);
  };

  return {
    isOnline,
    offlineData,
    pendingOperations: pendingOperations.length,
    submitOfflineRequest,
    getCachedData,
    canUseFeature,
    syncPendingOperations
  };
};
