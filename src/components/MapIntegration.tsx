
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Navigation, Truck, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MapIntegrationProps {
  ambulanceRequests?: any[];
  bloodRequests?: any[];
  showControls?: boolean;
}

const MapIntegration = ({ ambulanceRequests = [], bloodRequests = [], showControls = true }: MapIntegrationProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapboxToken, setMapboxToken] = useState(localStorage.getItem('mapbox_token') || '');
  const [isTokenSet, setIsTokenSet] = useState(!!localStorage.getItem('mapbox_token'));
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied:', error);
          // Default to Dharan, Nepal
          setUserLocation({ lat: 26.8105, lng: 87.2824 });
        }
      );
    }
  }, []);

  const handleTokenSave = () => {
    if (mapboxToken.trim()) {
      localStorage.setItem('mapbox_token', mapboxToken);
      setIsTokenSet(true);
      toast({
        title: "Token Saved",
        description: "Mapbox token saved successfully",
      });
    }
  };

  const initializeMap = () => {
    if (!mapRef.current || !isTokenSet) return;

    // This would integrate with actual Mapbox API
    // For now, we'll show a enhanced mock map
    mapRef.current.innerHTML = `
      <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); position: relative; border-radius: 8px;">
        <div style="position: absolute; top: 10px; left: 10px; background: white; padding: 8px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <div style="font-size: 12px; font-weight: bold;">Live Tracking Active</div>
          <div style="font-size: 10px; color: #666;">Dharan, Nepal</div>
        </div>
      </div>
    `;
  };

  useEffect(() => {
    initializeMap();
  }, [isTokenSet, userLocation]);

  if (!isTokenSet) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            <span>Map Setup Required</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Enter your Mapbox public token to enable real-time tracking and navigation features.
          </p>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter Mapbox public token"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleTokenSave}>
              Save Token
            </Button>
          </div>
          <p className="text-xs text-gray-500">
            Get your token from <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">mapbox.com</a>
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Navigation className="h-5 w-5 text-blue-600" />
          <span>Live Tracking Map</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={mapRef} className="w-full h-64 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4"></div>
        
        {showControls && (
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline">
              <MapPin className="h-4 w-4 mr-1" />
              Center on Me
            </Button>
            <Button size="sm" variant="outline">
              <Truck className="h-4 w-4 mr-1" />
              Track Ambulances ({ambulanceRequests.length})
            </Button>
            <Button size="sm" variant="outline">
              <Heart className="h-4 w-4 mr-1" />
              Show Donors ({bloodRequests.length})
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MapIntegration;
