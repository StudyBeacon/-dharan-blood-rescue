
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Users, Phone, Video } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  sender: string;
  message: string;
  timestamp: Date;
  type: 'sent' | 'received' | 'system';
  senderRole?: 'donor' | 'driver' | 'patient' | 'admin';
}

interface LiveChatSystemProps {
  user: any;
}

const LiveChatSystem = ({ user }: LiveChatSystemProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<string>('general');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Simulate online users and messages
  useEffect(() => {
    const simulatedUsers = [
      { id: '1', name: 'Dr. Smith', role: 'admin', status: 'online' },
      { id: '2', name: 'Ambulance Unit 1', role: 'driver', status: 'online' },
      { id: '3', name: 'Blood Center', role: 'admin', status: 'away' },
      { id: '4', name: 'Emergency Coordinator', role: 'admin', status: 'online' }
    ];
    setOnlineUsers(simulatedUsers);

    // Simulate initial messages
    const initialMessages: Message[] = [
      {
        id: '1',
        sender: 'Emergency Coordinator',
        message: 'Welcome to the emergency chat system. How can we assist you today?',
        timestamp: new Date(Date.now() - 300000),
        type: 'received',
        senderRole: 'admin'
      },
      {
        id: '2',
        sender: 'System',
        message: 'All emergency responders are online and ready to help.',
        timestamp: new Date(Date.now() - 240000),
        type: 'system'
      }
    ];
    setMessages(initialMessages);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate typing indicator
  useEffect(() => {
    let typingTimeout: NodeJS.Timeout;
    if (newMessage.length > 0) {
      setIsTyping(true);
      typingTimeout = setTimeout(() => setIsTyping(false), 2000);
    }
    return () => clearTimeout(typingTimeout);
  }, [newMessage]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: user.name,
      message: newMessage,
      timestamp: new Date(),
      type: 'sent',
      senderRole: user.role
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate response after 2-3 seconds
    setTimeout(() => {
      const responses = [
        'Thank you for your message. We\'re processing your request.',
        'Emergency team has been notified. Please standby.',
        'We\'ve received your location. Help is on the way.',
        'Medical team is preparing for your arrival.'
      ];

      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'Emergency Coordinator',
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        type: 'received',
        senderRole: 'admin'
      };

      setMessages(prev => [...prev, responseMessage]);
    }, 2000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startVoiceCall = () => {
    toast({
      title: "Voice Call",
      description: "Connecting to emergency coordinator...",
    });
  };

  const startVideoCall = () => {
    toast({
      title: "Video Call",
      description: "Connecting to emergency coordinator...",
    });
  };

  const getRoleColor = (role?: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'driver': return 'bg-blue-100 text-blue-800';
      case 'donor': return 'bg-green-100 text-green-800';
      case 'patient': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
      {/* Online Users Sidebar */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-green-600" />
            <span>Online Support</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {onlineUsers.map((user) => (
              <div key={user.id} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className={`w-3 h-3 rounded-full ${user.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{user.name}</p>
                  <Badge className={getRoleColor(user.role)} variant="secondary">
                    {user.role}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 space-y-2">
            <Button onClick={startVoiceCall} className="w-full" variant="outline">
              <Phone className="h-4 w-4 mr-2" />
              Voice Call
            </Button>
            <Button onClick={startVideoCall} className="w-full" variant="outline">
              <Video className="h-4 w-4 mr-2" />
              Video Call
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="lg:col-span-3 flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-blue-600" />
            <span>Emergency Chat - {selectedChat}</span>
            <Badge className="bg-green-100 text-green-800">Live</Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto space-y-3 mb-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'sent' ? 'justify-end' : message.type === 'system' ? 'justify-center' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'sent'
                      ? 'bg-blue-600 text-white'
                      : message.type === 'system'
                      ? 'bg-yellow-100 text-yellow-800 text-sm'
                      : 'bg-white dark:bg-gray-800 shadow-md'
                  }`}
                >
                  {message.type !== 'system' && (
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs font-medium">
                        {message.sender}
                      </span>
                      {message.senderRole && (
                        <Badge className={getRoleColor(message.senderRole)} variant="secondary">
                          {message.senderRole}
                        </Badge>
                      )}
                    </div>
                  )}
                  <p className={message.type === 'system' ? 'text-center' : ''}>{message.message}</p>
                  <p className={`text-xs mt-1 ${message.type === 'sent' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="flex space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your emergency message..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveChatSystem;
