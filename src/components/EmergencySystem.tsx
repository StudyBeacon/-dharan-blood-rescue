
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Phone, MapPin, Clock, Users, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EmergencySystem = () => {
  const [emergencyLevel, setEmergencyLevel] = useState<'normal' | 'alert' | 'critical'>('normal');
  const [activeEmergencies, setActiveEmergencies] = useState<any[]>([]);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const { toast } = useToast();

  const emergencies = [
    {
      id: 1,
      type: 'mass_casualty',
      title: 'Traffic Accident - Multiple Casualties',
      location: 'Dharan-Itahari Highway',
      severity: 'critical',
      bloodNeeded: ['O+', 'A+', 'B+'],
      ambulancesNeeded: 3,
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      status: 'active'
    },
    {
      id: 2,
      type: 'blood_shortage',
      title: 'Critical Blood Shortage',
      location: 'BP Koirala Health Science',
      severity: 'high',
      bloodNeeded: ['O-', 'AB-'],
      ambulancesNeeded: 0,
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      status: 'responding'
    }
  ];

  useEffect(() => {
    // Simulate emergency detection
    const interval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance every 30 seconds
        const newEmergency = {
          id: Date.now(),
          type: 'blood_request',
          title: 'Emergency Blood Request',
          location: 'Local Hospital',
          severity: 'high',
          bloodNeeded: ['O+'],
          ambulancesNeeded: 1,
          timestamp: new Date(),
          status: 'active'
        };

        setActiveEmergencies(prev => [newEmergency, ...prev.slice(0, 2)]);
        setEmergencyLevel('alert');

        toast({
          title: "Emergency Alert",
          description: newEmergency.title,
          variant: "destructive",
        });
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [toast]);

  const declareEmergency = () => {
    setIsEmergencyMode(true);
    setEmergencyLevel('critical');
    setActiveEmergencies(emergencies);
    
    toast({
      title: "Emergency Mode Activated",
      description: "All available resources are being mobilized",
      variant: "destructive",
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-600 text-white';
      case 'high': return 'bg-orange-600 text-white';
      case 'medium': return 'bg-yellow-600 text-white';
      default: return 'bg-blue-600 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'responding': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Emergency Status Banner */}
      {emergencyLevel !== 'normal' && (
        <Alert className={`border-2 ${emergencyLevel === 'critical' ? 'border-red-600 bg-red-50 dark:bg-red-950' : 'border-orange-600 bg-orange-50 dark:bg-orange-950'} animate-pulse-glow`}>
          <AlertTriangle className="h-5 w-5" />
          <AlertDescription className="font-medium">
            {emergencyLevel === 'critical' ? 'CRITICAL EMERGENCY ACTIVE' : 'EMERGENCY ALERT'} - All available resources mobilized
          </AlertDescription>
        </Alert>
      )}

      {/* Emergency Control Panel */}
      <Card className="border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-red-600" />
              <span>Emergency Command Center</span>
            </div>
            <Badge className={`${isEmergencyMode ? 'bg-red-600' : 'bg-gray-600'} text-white`}>
              {isEmergencyMode ? 'EMERGENCY MODE' : 'NORMAL OPERATIONS'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-red-50 dark:bg-red-950 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{activeEmergencies.length}</div>
              <div className="text-sm text-red-600">Active Emergencies</div>
            </div>
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-blue-600">Available Ambulances</div>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
              <div className="text-2xl font-bold text-green-600">89</div>
              <div className="text-sm text-green-600">Standby Donors</div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button 
              onClick={declareEmergency}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={isEmergencyMode}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Declare Emergency
            </Button>
            <Button variant="outline">
              <Phone className="h-4 w-4 mr-2" />
              Emergency Contacts
            </Button>
            <Button variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Mobilize Resources
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Emergencies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <span>Active Emergencies</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeEmergencies.length > 0 ? (
            <div className="space-y-4">
              {activeEmergencies.map((emergency) => (
                <div key={emergency.id} className="border rounded-lg p-4 bg-white dark:bg-gray-800">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg">{emergency.title}</h3>
                        <Badge className={getSeverityColor(emergency.severity)}>
                          {emergency.severity.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(emergency.status)}>
                          {emergency.status.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{emergency.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{emergency.timestamp.toLocaleString()}</span>
                        </div>
                        {emergency.bloodNeeded.length > 0 && (
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">Blood needed:</span>
                            <div className="flex space-x-1">
                              {emergency.bloodNeeded.map((type: string) => (
                                <Badge key={type} variant="outline" className="text-red-600 border-red-600">
                                  {type}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        {emergency.ambulancesNeeded > 0 && (
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">Ambulances needed:</span>
                            <Badge variant="outline" className="text-blue-600 border-blue-600">
                              {emergency.ambulancesNeeded}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 pt-3 border-t">
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      Respond
                    </Button>
                    <Button size="sm" variant="outline">
                      Assign Resources
                    </Button>
                    <Button size="sm" variant="outline">
                      Update Status
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <p>No active emergencies</p>
              <p className="text-sm">Emergency alerts will appear here</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Emergency Resources Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Available Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-950 rounded">
              <span>Ambulances Ready</span>
              <Badge className="bg-blue-600">12/15</Badge>
            </div>
            <div className="flex justify-between items-center p-2 bg-red-50 dark:bg-red-950 rounded">
              <span>Blood Units Available</span>
              <Badge className="bg-red-600">156</Badge>
            </div>
            <div className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-950 rounded">
              <span>Donors on Standby</span>
              <Badge className="bg-green-600">89</Badge>
            </div>
            <div className="flex justify-between items-center p-2 bg-yellow-50 dark:bg-yellow-950 rounded">
              <span>Volunteers Available</span>
              <Badge className="bg-yellow-600">34</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Emergency Contacts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Police (Emergency)</span>
              <Button size="sm" variant="outline">
                <Phone className="h-4 w-4 mr-1" />
                100
              </Button>
            </div>
            <div className="flex justify-between items-center">
              <span>Fire Service</span>
              <Button size="sm" variant="outline">
                <Phone className="h-4 w-4 mr-1" />
                101
              </Button>
            </div>
            <div className="flex justify-between items-center">
              <span>Ambulance Service</span>
              <Button size="sm" variant="outline">
                <Phone className="h-4 w-4 mr-1" />
                102
              </Button>
            </div>
            <div className="flex justify-between items-center">
              <span>Hospital Emergency</span>
              <Button size="sm" variant="outline">
                <Phone className="h-4 w-4 mr-1" />
                +977-25-123456
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmergencySystem;
