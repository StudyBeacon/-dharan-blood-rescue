
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Clock, LogOut, RefreshCw, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SessionManagerProps {
  user: any;
  onLogout: () => void;
}

const SessionManager = ({ user, onLogout }: SessionManagerProps) => {
  const [sessionData, setSessionData] = useState({
    loginTime: new Date(),
    lastActivity: new Date(),
    sessionDuration: 0,
    isActive: true,
    ipAddress: '192.168.1.100', // Simulated
    device: 'Desktop Chrome',
    location: 'Dharan, Nepal'
  });
  const [autoLogoutTimer, setAutoLogoutTimer] = useState(1800); // 30 minutes
  const [rateLimitStatus, setRateLimitStatus] = useState({
    requests: 0,
    limit: 100,
    resetTime: new Date(Date.now() + 3600000) // 1 hour from now
  });
  const { toast } = useToast();

  // Update session duration every second
  useEffect(() => {
    const interval = setInterval(() => {
      setSessionData(prev => ({
        ...prev,
        sessionDuration: Math.floor((Date.now() - prev.loginTime.getTime()) / 1000)
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Auto logout timer
  useEffect(() => {
    const interval = setInterval(() => {
      setAutoLogoutTimer(prev => {
        if (prev <= 1) {
          handleAutoLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Reset timer on user activity
    const resetTimer = () => {
      setAutoLogoutTimer(1800); // Reset to 30 minutes
      setSessionData(prev => ({ ...prev, lastActivity: new Date() }));
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    window.addEventListener('click', resetTimer);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      window.removeEventListener('click', resetTimer);
    };
  }, []);

  // Simulate rate limiting updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRateLimitStatus(prev => ({
        ...prev,
        requests: Math.min(prev.requests + Math.floor(Math.random() * 3), prev.limit)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTimeRemaining = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAutoLogout = () => {
    toast({
      title: "Session Expired",
      description: "You have been logged out due to inactivity",
      variant: "destructive",
    });
    onLogout();
  };

  const handleManualLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
    onLogout();
  };

  const refreshSession = () => {
    setAutoLogoutTimer(1800);
    setSessionData(prev => ({ ...prev, lastActivity: new Date() }));
    toast({
      title: "Session Refreshed",
      description: "Your session has been extended",
    });
  };

  const getRateLimitColor = () => {
    const percentage = (rateLimitStatus.requests / rateLimitStatus.limit) * 100;
    if (percentage > 80) return 'text-red-600';
    if (percentage > 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Session Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-green-600" />
            <span>Session Status</span>
            <Badge className="bg-green-100 text-green-800">Active</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Duration:</span>
            <span className="font-mono">{formatDuration(sessionData.sessionDuration)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Last Activity:</span>
            <span className="text-sm">{sessionData.lastActivity.toLocaleTimeString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Device:</span>
            <span className="text-sm">{sessionData.device}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Location:</span>
            <span className="text-sm">{sessionData.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">IP Address:</span>
            <span className="text-sm font-mono">{sessionData.ipAddress}</span>
          </div>
        </CardContent>
      </Card>

      {/* Auto Logout Timer */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-orange-600" />
            <span>Auto Logout</span>
            {autoLogoutTimer < 300 && (
              <Badge className="bg-red-100 text-red-800">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Warning
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className={`text-2xl font-mono ${autoLogoutTimer < 300 ? 'text-red-600' : 'text-gray-900 dark:text-gray-100'}`}>
              {formatTimeRemaining(autoLogoutTimer)}
            </div>
            <p className="text-sm text-gray-600">Time remaining</p>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ${
                autoLogoutTimer < 300 ? 'bg-red-500' : 'bg-green-500'
              }`}
              style={{ width: `${(autoLogoutTimer / 1800) * 100}%` }}
            ></div>
          </div>

          <div className="space-y-2">
            <Button onClick={refreshSession} className="w-full" variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Extend Session
            </Button>
            <Button onClick={handleManualLogout} className="w-full" variant="destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Logout Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Rate Limiting */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <span>API Usage</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Requests Used:</span>
            <span className={`font-medium ${getRateLimitColor()}`}>
              {rateLimitStatus.requests}/{rateLimitStatus.limit}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                rateLimitStatus.requests / rateLimitStatus.limit > 0.8 ? 'bg-red-500' :
                rateLimitStatus.requests / rateLimitStatus.limit > 0.6 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${(rateLimitStatus.requests / rateLimitStatus.limit) * 100}%` }}
            ></div>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Resets at:</span>
            <span className="text-sm">{rateLimitStatus.resetTime.toLocaleTimeString()}</span>
          </div>

          <div className="text-xs text-gray-500 text-center">
            Rate limiting protects against abuse and ensures service availability
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionManager;
