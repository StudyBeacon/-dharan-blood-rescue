
import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

interface WebSocketMessage {
  type: string;
  data: any;
  timestamp: Date;
}

export const useWebSocket = (url?: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const wsRef = useRef<WebSocket | null>(null);
  const { toast } = useToast();

  // Simulate WebSocket connection since we don't have a real WebSocket server
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (url || isConnected) {
      // Simulate connection
      setIsConnected(true);
      
      // Simulate periodic messages
      interval = setInterval(() => {
        const messageTypes = [
          { type: 'blood_request', data: { bloodType: 'O+', urgency: 'high', location: 'Dharan Hospital' }},
          { type: 'ambulance_update', data: { requestId: '123', status: 'en_route', eta: '5 minutes' }},
          { type: 'donor_response', data: { donorId: '456', bloodType: 'A+', available: true }},
          { type: 'emergency_alert', data: { level: 'critical', message: 'Mass casualty event' }}
        ];

        if (Math.random() < 0.3) { // 30% chance every 5 seconds
          const randomMessage = messageTypes[Math.floor(Math.random() * messageTypes.length)];
          const newMessage: WebSocketMessage = {
            ...randomMessage,
            timestamp: new Date()
          };

          setMessages(prev => [newMessage, ...prev.slice(0, 9)]);

          // Show toast for important messages
          if (randomMessage.type === 'emergency_alert' || randomMessage.type === 'blood_request') {
            toast({
              title: "Live Update",
              description: randomMessage.data.message || `${randomMessage.type.replace('_', ' ')} received`,
              variant: randomMessage.type === 'emergency_alert' ? 'destructive' : 'default',
            });
          }
        }
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [url, isConnected, toast]);

  const connect = () => {
    setIsConnected(true);
    setReconnectAttempts(0);
    toast({
      title: "Connected",
      description: "Real-time updates enabled",
    });
  };

  const disconnect = () => {
    setIsConnected(false);
    toast({
      title: "Disconnected",
      description: "Real-time updates disabled",
    });
  };

  const sendMessage = (message: any) => {
    if (isConnected) {
      // Simulate sending message
      console.log('Sending message:', message);
      toast({
        title: "Message Sent",
        description: "Your message has been sent",
      });
    } else {
      toast({
        title: "Not Connected",
        description: "Please connect to send messages",
        variant: "destructive",
      });
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return {
    isConnected,
    messages,
    reconnectAttempts,
    connect,
    disconnect,
    sendMessage,
    clearMessages
  };
};
