
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, Clock, Star, Phone, MapPin, Calendar } from 'lucide-react';

const DonorDashboard = () => {
  const [rewardPoints] = useState(1250);
  const [totalDonations] = useState(8);
  const [requests] = useState([
    {
      id: 1,
      patientName: 'Ram Bahadur',
      bloodGroup: 'O+',
      location: 'Dharan Hospital',
      urgency: 'Critical',
      requestedAt: '2 hours ago',
      contact: '+977-9841234567'
    },
    {
      id: 2,
      patientName: 'Sita Devi',
      bloodGroup: 'O+',
      location: 'BP Koirala Health Science',
      urgency: 'Moderate',
      requestedAt: '5 hours ago',
      contact: '+977-9841234568'
    }
  ]);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <Heart className="h-4 w-4 text-red-600 fill-current" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDonations}</div>
            <p className="text-xs text-muted-foreground">Lives saved: ~{totalDonations * 3}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reward Points</CardTitle>
            <Star className="h-4 w-4 text-yellow-600 fill-current" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rewardPoints}</div>
            <p className="text-xs text-muted-foreground">Next reward at 1500 pts</p>
            <Progress value={(rewardPoints / 1500) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Eligible</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">days remaining</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Blood Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-red-600" />
            <span>Active Blood Requests</span>
          </CardTitle>
          <CardDescription>
            Help save lives by responding to urgent blood requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">{request.patientName}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <Heart className="h-4 w-4 text-red-600 fill-current" />
                        <span className="font-medium">{request.bloodGroup}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{request.location}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{request.requestedAt}</span>
                      </span>
                    </div>
                  </div>
                  <Badge className={`${getUrgencyColor(request.urgency)} border`}>
                    {request.urgency}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <Button variant="outline" size="sm" className="flex items-center space-x-1">
                    <Phone className="h-4 w-4" />
                    <span>Call</span>
                  </Button>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">
                    Respond to Request
                  </Button>
                </div>
              </div>
            ))}
          </div>
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
              <Heart className="h-6 w-6 text-red-600" />
              <span>Schedule Donation</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1">
              <Star className="h-6 w-6 text-yellow-600" />
              <span>Redeem Points</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonorDashboard;
