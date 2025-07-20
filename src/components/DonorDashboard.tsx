import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Clock, Award, MapPin, Phone } from "lucide-react";
import Header from "./Header";
import BottomNavigation from "./BottomNavigation";

interface DonorDashboardProps {
  user: {
    name: string;
    email: string;
    role: string;
    id: string;
    bloodGroup?: string;
  };
}

const DonorDashboard = ({ user }: DonorDashboardProps) => {
  const [stats] = useState({
    totalDonations: 12,
    rewardPoints: 450,
    nextReward: 550,
    lastDonation: "2 weeks ago",
  });

  const [activeRequests] = useState([
    {
      id: 1,
      bloodGroup: "O+",
      location: "Dharan Hospital",
      urgency: "Critical",
      distance: "2.5 km",
      contactPerson: "Dr. Ram Sharma",
      contactNumber: "+977-9841234567",
      requestedAt: "30 minutes ago",
    },
  ]);

  return (
    <>
      <Header
        // user={user}
        onLogout={() => console.log("Logout")}
        onLanguageChange={(lang) => console.log("Language changed to", lang)}
        currentLanguage="en"
        activeTab="dashboard"
        onTabChange={(tab) => console.log("Tab changed to", tab)}
      />
      <div className="max-w-7xl mx-auto min-h-screen p-4 bg-background text-foreground space-y-6 animate-fade-in">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Heart className="h-8 w-8 text-red-600 fill-current" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Donations
                  </p>
                  <p className="text-2xl font-bold text-red-600">
                    {stats.totalDonations}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Award className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Reward Points</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {stats.rewardPoints}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Clock className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Last Donation</p>
                  <p className="text-lg font-semibold text-blue-600">
                    {stats.lastDonation}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground">Blood Group</p>
              <p className="text-2xl font-bold text-red-600">
                {user.bloodGroup || "Not Set"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Active Blood Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-red-600" />
              <span>Nearby Blood Requests</span>
            </CardTitle>
            <CardDescription>
              Emergency requests matching your blood group
            </CardDescription>
          </CardHeader>
          <CardContent>
            {activeRequests.length > 0 ? (
              <div className="space-y-4">
                {activeRequests.map((request) => (
                  <div
                    key={request.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant="destructive">
                            {request.bloodGroup}
                          </Badge>
                          <Badge variant="outline">{request.urgency}</Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{request.location}</span>
                          </span>
                          <span>{request.distance}</span>
                          <span>{request.requestedAt}</span>
                        </div>
                        <div className="text-sm">
                          <p>
                            <strong>Contact:</strong> {request.contactPerson}
                          </p>
                          <p>
                            <strong>Phone:</strong> {request.contactNumber}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button className="bg-red-600 hover:bg-red-700">
                        Accept Request
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Heart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No active blood requests</p>
                <p className="text-sm">
                  We'll notify you when someone needs your blood type
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        userRole={user.role} */}
      {/* /> */}
    </>
  );
};

export default DonorDashboard;
