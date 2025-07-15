
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Truck, Clock, MapPin, Phone, Navigation, CheckCircle } from 'lucide-react';

const DriverDashboard = () => {
  const [activeTrips] = useState([
    {
      id: 1,
      patientName: 'Hari Prasad',
      pickup: 'Dharan-5, Chatara Road',
      destination: 'BP Koirala Health Science',
      distance: '2.5 km',
      eta: '8 minutes',
      status: 'En Route to Patient',
      contact: '+977-9841234567',
      priority: 'Emergency'
    }
  ]);

  const [completedTrips] = useState(12);
  const [todayTrips] = useState(3);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Trips</CardTitle>
            <Truck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayTrips}</div>
            <p className="text-xs text-muted-foreground">Active: {activeTrips.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTrips}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Active</div>
            <p className="text-xs text-muted-foreground">Available for dispatch</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Ambulance Trips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Truck className="h-5 w-5 text-blue-600" />
            <span>Active Ambulance Trips</span>
          </CardTitle>
          <CardDescription>
            Current emergency response assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activeTrips.length > 0 ? (
            <div className="space-y-4">
              {activeTrips.map((trip) => (
                <div key={trip.id} className="border rounded-lg p-4 space-y-4 bg-blue-50">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{trip.patientName}</h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-green-600" />
                          <span><strong>Pickup:</strong> {trip.pickup}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-red-600" />
                          <span><strong>Destination:</strong> {trip.destination}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center space-x-1">
                            <Navigation className="h-4 w-4" />
                            <span>{trip.distance}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>ETA: {trip.eta}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-red-100 text-red-800 border-red-200">
                      {trip.priority}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">
                        {trip.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="flex items-center space-x-1">
                        <Phone className="h-4 w-4" />
                        <span>Call Patient</span>
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Navigation className="h-4 w-4 mr-1" />
                        Navigate
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Truck className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No active trips</p>
              <p className="text-sm">You're available for new emergency calls</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <span>Mark Available</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1">
              <Clock className="h-6 w-6 text-yellow-600" />
              <span>Take Break</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverDashboard;
