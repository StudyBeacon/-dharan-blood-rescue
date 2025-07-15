
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Wifi, WifiOff, Volume2, VolumeX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RealTimeNotifications = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [liveNotifications, setLiveNotifications] = useState<any[]>([]);
  const { toast } = useToast();

  // Simulate WebSocket connection
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isConnected) {
      interval = setInterval(() => {
        const notifications = [
          { type: 'emergency', message: 'Critical blood request - O+ needed urgently', priority: 'high' },
          { type: 'ambulance', message: 'Ambulance dispatched to your area', priority: 'medium' },
          { type: 'donor', message: 'New donor registered nearby', priority: 'low' },
          { type: 'success', message: 'Blood request fulfilled successfully', priority: 'medium' }
        ];

        if (Math.random() < 0.4) {
          const notification = notifications[Math.floor(Math.random() * notifications.length)];
          const newNotif = {
            id: Date.now(),
            ...notification,
            timestamp: new Date()
          };

          setLiveNotifications(prev => [newNotif, ...prev.slice(0, 4)]);

          if (soundEnabled && notification.priority === 'high') {
            // Would play notification sound
            console.log('🔊 Emergency notification sound');
          }

          toast({
            title: "Live Update",
            description: notification.message,
            variant: notification.priority === 'high' ? 'destructive' : 'default',
          });
        }
      }, 8000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isConnected, soundEnabled, toast]);

  const toggleConnection = () => {
    setIsConnected(!isConnected);
    toast({
      title: isConnected ? "Disconnected" : "Connected",
      description: isConnected ? "Real-time updates disabled" : "Real-time updates enabled",
    });
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        toast({
          title: "Notifications Enabled",
          description: "You'll receive browser notifications for urgent updates",
        });
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-orange-600" />
            <span>Real-Time Updates</span>
            <Badge className={isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
              {isConnected ? 'Live' : 'Offline'}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSoundEnabled(!soundEnabled)}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleConnection}
            >
              {isConnected ? <Wifi className="h-4 w-4 text-green-600" /> : <WifiOff className="h-4 w-4 text-red-600" />}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Button size="sm" onClick={requestNotificationPermission}>
            Enable Browser Notifications
          </Button>
          <Button size="sm" variant="outline" onClick={toggleConnection}>
            {isConnected ? 'Disconnect' : 'Connect'} Live Updates
          </Button>
        </div>

        <div className="space-y-2 max-h-48 overflow-y-auto">
          {liveNotifications.length > 0 ? (
            liveNotifications.map((notif) => (
              <div key={notif.id} className="p-2 border rounded text-sm bg-blue-50 dark:bg-blue-950">
                <div className="font-medium">{notif.message}</div>
                <div className="text-xs text-gray-500">
                  {notif.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-4">
              {isConnected ? 'Listening for updates...' : 'Connect to receive live updates'}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RealTimeNotifications;
