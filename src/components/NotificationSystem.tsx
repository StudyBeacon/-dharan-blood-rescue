
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Heart, Truck, Award, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  type: 'blood_request' | 'ambulance_request' | 'reward' | 'emergency' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
  actionUrl?: string;
}

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'blood_request',
      title: 'Urgent Blood Request',
      message: 'O+ blood needed at Dharan Hospital - Critical patient',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      priority: 'critical'
    },
    {
      id: '2',
      type: 'ambulance_request',
      title: 'Ambulance Request',
      message: 'Emergency transport needed from Dharan-5',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false,
      priority: 'high'
    },
    {
      id: '3',
      type: 'reward',
      title: 'Points Earned!',
      message: 'You earned 100 points for your blood donation',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      read: true,
      priority: 'low'
    }
  ]);

  const { toast } = useToast();

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const randomNotifications = [
        {
          type: 'blood_request',
          title: 'New Blood Request',
          message: 'A+ blood needed at BP Koirala Hospital',
          priority: 'high'
        },
        {
          type: 'success',
          title: 'Request Fulfilled',
          message: 'Your blood request has been accepted by a donor',
          priority: 'medium'
        },
        {
          type: 'emergency',
          title: 'Emergency Alert',
          message: 'Mass casualty event - Multiple blood types needed',
          priority: 'critical'
        }
      ];

      if (Math.random() < 0.3) { // 30% chance every 10 seconds
        const randomNotif = randomNotifications[Math.floor(Math.random() * randomNotifications.length)];
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: randomNotif.type as any,
          title: randomNotif.title,
          message: randomNotif.message,
          timestamp: new Date(),
          read: false,
          priority: randomNotif.priority as any
        };

        setNotifications(prev => [newNotification, ...prev]);
        
        // Show toast for high priority notifications
        if (randomNotif.priority === 'critical' || randomNotif.priority === 'high') {
          toast({
            title: randomNotif.title,
            description: randomNotif.message,
            variant: randomNotif.priority === 'critical' ? 'destructive' : 'default',
          });
        }
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [toast]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'blood_request': return <Heart className="h-4 w-4 text-red-600" />;
      case 'ambulance_request': return <Truck className="h-4 w-4 text-blue-600" />;
      case 'reward': return <Award className="h-4 w-4 text-yellow-600" />;
      case 'emergency': return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 border-red-200 dark:bg-red-950 dark:border-red-800';
      case 'high': return 'bg-orange-100 border-orange-200 dark:bg-orange-950 dark:border-orange-800';
      case 'medium': return 'bg-yellow-100 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800';
      case 'low': return 'bg-blue-100 border-blue-200 dark:bg-blue-950 dark:border-blue-800';
      default: return 'bg-gray-100 border-gray-200 dark:bg-gray-800 dark:border-gray-700';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-blue-600" />
            <span>Notifications</span>
            {unreadCount > 0 && (
              <Badge className="bg-red-600 text-white animate-pulse">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Mark All Read
            </Button>
            <Button variant="outline" size="sm" onClick={clearAll}>
              Clear All
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No notifications</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border transition-all duration-200 ${getPriorityColor(notification.priority)} ${
                  !notification.read ? 'shadow-md' : 'opacity-75'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        {notification.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-2">
                    <Badge variant="outline" className="text-xs">
                      {notification.priority}
                    </Badge>
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        className="h-6 w-6 p-0"
                      >
                        <CheckCircle className="h-3 w-3" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteNotification(notification.id)}
                      className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSystem;
