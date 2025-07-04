
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navigation, MapPin, Clock, Phone, AlertTriangle } from 'lucide-react';

interface AmbulanceTrackerProps {
  activeAmbulanceRequests: any[];
}

const AmbulanceTracker = ({ activeAmbulanceRequests }: AmbulanceTrackerProps) => {
  const [selectedRequest, setSelectedRequest] = useState(activeAmbulanceRequests[0]?.id);
  const [liveLocation, setLiveLocation] = useState({
    lat: 26.8105,
    lng: 87.2824,
    heading: 0
  });

  // Simulate real-time location updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveLocation(prev => ({
        ...prev,
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
        heading: (prev.heading + Math.random() * 10) % 360
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 dark:text-white text-lg sm:text-xl">
          <Navigation className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          <span>Live Ambulance Tracking</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Mock Map View - Mobile Responsive */}
        <div className="relative bg-gray-100 dark:bg-gray-700 rounded-lg h-48 sm:h-64 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 dark:from-gray-600 dark:to-gray-800">
            {/* Ambulance marker */}
            <div 
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000"
              style={{ 
                left: '60%', 
                top: '40%',
                transform: `translate(-50%, -50%) rotate(${liveLocation.heading}deg)`
              }}
            >
              <div className="bg-red-600 text-white p-2 rounded-full shadow-lg animate-pulse">
                <Navigation className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>
            </div>
            
            {/* Pickup marker */}
            <div className="absolute left-1/4 top-3/4 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-green-600 text-white p-2 rounded-full shadow-lg">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>
            </div>
            
            {/* Destination marker */}
            <div className="absolute right-1/4 top-1/4 transform translate-x-1/2 -translate-y-1/2">
              <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>
            </div>
            
            {/* Route line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path
                d="M 25% 75% Q 50% 50% 75% 25%"
                stroke="#3B82F6"
                strokeWidth="2"
                strokeDasharray="8,4"
                fill="none"
                className="animate-pulse"
              />
            </svg>
          </div>
          
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-white dark:bg-gray-800 rounded-lg p-2 shadow-lg">
            <div className="text-xs sm:text-sm font-medium dark:text-white">Live Location</div>
            <div className="text-xs text-gray-600 dark:text-gray-300">
              {liveLocation.lat.toFixed(4)}, {liveLocation.lng.toFixed(4)}
            </div>
          </div>
        </div>

        {/* Request Details - Mobile Optimized */}
        {activeAmbulanceRequests.map((request) => (
          <div key={request.id} className="border dark:border-gray-600 rounded-lg p-3 sm:p-4 bg-white dark:bg-gray-700">
            <div className="flex items-start justify-between mb-3">
              <div className="space-y-2 flex-1 min-w-0">
                <h4 className="font-semibold dark:text-white text-sm sm:text-base">Request #{request.id}</h4>
                <div className="space-y-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                    <span className="break-words"><strong>From:</strong> {request.pickupLocation}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0" />
                    <span className="break-words"><strong>To:</strong> {request.destination}</span>
                  </div>
                  {request.driverName && (
                    <div className="flex items-center space-x-2">
                      <span><strong>Driver:</strong> {request.driverName}</span>
                    </div>
                  )}
                  {request.estimatedTime && (
                    <div className="flex items-center space-x-2">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span><strong>ETA:</strong> {request.estimatedTime}</span>
                    </div>
                  )}
                </div>
              </div>
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 ml-2 flex-shrink-0 text-xs">
                {request.status}
              </Badge>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-2 border-t dark:border-gray-600 gap-2">
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                {request.driverPhone && (
                  <Button variant="outline" size="sm" className="flex items-center justify-center space-x-1 mobile-touch-target min-h-[44px] sm:min-h-[36px]">
                    <Phone className="h-4 w-4" />
                    <span>Call Driver</span>
                  </Button>
                )}
                <Button variant="outline" size="sm" className="flex items-center justify-center space-x-1 mobile-touch-target min-h-[44px] sm:min-h-[36px]">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Emergency</span>
                </Button>
              </div>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 mobile-touch-target min-h-[44px] sm:min-h-[36px] w-full sm:w-auto">
                Share Location
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AmbulanceTracker;
