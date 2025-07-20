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
import { Truck, MapPin, Clock, Phone, Navigation } from "lucide-react";
import Header from "./Header";
import BottomNavigation from "./BottomNavigation";

interface DriverDashboardProps {
  user: {
    name: string;
    email: string;
    role: string;
    id: string;
  };
}

const DriverDashboard = ({ user }: DriverDashboardProps) => {
  const [activeTrips] = useState([
    {
      id: 1,
      patientName: "John Doe",
      pickupLocation: "Dharan-5, Main Road",
      destination: "BP Koirala Health Science",
      urgency: "Emergency",
      contactNumber: "+977-9841234567",
      estimatedTime: "12 minutes",
      status: "En Route",
    },
  ]);

  const [stats] = useState({
    totalTrips: 45,
    completedToday: 3,
    avgRating: 4.8,
    earnings: "Rs. 12,500",
  });

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
      <div className="space-y-6 animate-fade-in">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Truck className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Total Trips
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {stats.totalTrips}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Clock className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Completed Today
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {stats.completedToday}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Average Rating
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.avgRating}⭐
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Monthly Earnings
                </p>
                <p className="text-xl font-bold text-green-600">
                  {stats.earnings}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Trips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-blue-600" />
              <span>Active Trips</span>
            </CardTitle>
            <CardDescription>Current ambulance assignments</CardDescription>
          </CardHeader>
          <CardContent>
            {activeTrips.length > 0 ? (
              <div className="space-y-4">
                {activeTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-2">
                          <Badge variant="destructive">{trip.urgency}</Badge>
                          <Badge variant="outline">{trip.status}</Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium">
                            Patient: {trip.patientName}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                            <span className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>From: {trip.pickupLocation}</span>
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                            <span className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>To: {trip.destination}</span>
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                            <span className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>ETA: {trip.estimatedTime}</span>
                            </span>
                            <span>Contact: {trip.contactNumber}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Navigation className="h-4 w-4 mr-1" />
                        Navigate
                      </Button>
                      <Button variant="outline">
                        <Phone className="h-4 w-4 mr-1" />
                        Call Patient
                      </Button>
                      <Button variant="outline">Update Status</Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Truck className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No active trips</p>
                <p className="text-sm">
                  You'll be notified when a trip is assigned
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* <BottomNavigation
        activeTab="dashboard"
        onTabChange={() => {}}
        userRole="donor"
      /> */}
    </>
  );
};

export default DriverDashboard;
