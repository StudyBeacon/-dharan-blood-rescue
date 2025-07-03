
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Heart, Truck, AlertTriangle, Calendar } from 'lucide-react';

const SmartAnalytics = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const bloodDemandData = [
    { month: 'Jan', 'O+': 45, 'A+': 35, 'B+': 28, 'AB+': 15, 'O-': 12, 'A-': 8, 'B-': 6, 'AB-': 3 },
    { month: 'Feb', 'O+': 52, 'A+': 41, 'B+': 33, 'AB+': 18, 'O-': 15, 'A-': 10, 'B-': 8, 'AB-': 4 },
    { month: 'Mar', 'O+': 48, 'A+': 38, 'B+': 31, 'AB+': 17, 'O-': 14, 'A-': 9, 'B-': 7, 'AB-': 3 },
    { month: 'Apr', 'O+': 55, 'A+': 43, 'B+': 35, 'AB+': 20, 'O-': 16, 'A-': 11, 'B-': 9, 'AB-': 5 },
    { month: 'May', 'O+': 61, 'A+': 47, 'B+': 38, 'AB+': 22, 'O-': 18, 'A-': 12, 'B-': 10, 'AB-': 6 },
    { month: 'Jun', 'O+': 58, 'A+': 45, 'B+': 36, 'AB+': 21, 'O-': 17, 'A-': 11, 'B-': 9, 'AB-': 5 }
  ];

  const responseTimeData = [
    { day: 'Mon', bloodRequests: 12, ambulanceRequests: 8, avgResponseTime: 15 },
    { day: 'Tue', bloodRequests: 15, ambulanceRequests: 6, avgResponseTime: 18 },
    { day: 'Wed', bloodRequests: 9, ambulanceRequests: 12, avgResponseTime: 12 },
    { day: 'Thu', bloodRequests: 18, ambulanceRequests: 10, avgResponseTime: 20 },
    { day: 'Fri', bloodRequests: 22, ambulanceRequests: 15, avgResponseTime: 25 },
    { day: 'Sat', bloodRequests: 25, ambulanceRequests: 18, avgResponseTime: 22 },
    { day: 'Sun', bloodRequests: 16, ambulanceRequests: 11, avgResponseTime: 16 }
  ];

  const userEngagementData = [
    { name: 'Active Donors', value: 340, color: '#ef4444' },
    { name: 'Drivers Available', value: 89, color: '#3b82f6' },
    { name: 'Patients Served', value: 156, color: '#10b981' },
    { name: 'Volunteers', value: 67, color: '#f59e0b' }
  ];

  const predictiveData = [
    { month: 'Jul', predicted: 65, actual: 61, confidence: 0.89 },
    { month: 'Aug', predicted: 70, actual: null, confidence: 0.85 },
    { month: 'Sep', predicted: 68, actual: null, confidence: 0.82 },
    { month: 'Oct', predicted: 72, actual: null, confidence: 0.78 },
    { month: 'Nov', predicted: 75, actual: null, confidence: 0.75 },
    { month: 'Dec', predicted: 78, actual: null, confidence: 0.73 }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-red-700 dark:text-red-300">342</p>
                <p className="text-sm text-red-600 dark:text-red-400">Blood Requests</p>
              </div>
              <Heart className="h-8 w-8 text-red-600" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600">+12%</span>
              <span className="text-gray-600 dark:text-gray-400 ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">89</p>
                <p className="text-sm text-blue-600 dark:text-blue-400">Ambulance Calls</p>
              </div>
              <Truck className="h-8 w-8 text-blue-600" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600">+8%</span>
              <span className="text-gray-600 dark:text-gray-400 ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">16.5</p>
                <p className="text-sm text-green-600 dark:text-green-400">Avg Response (min)</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-red-600 mr-1 rotate-180" />
              <span className="text-red-600">-5%</span>
              <span className="text-gray-600 dark:text-gray-400 ml-1">improvement</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">96.2%</p>
                <p className="text-sm text-purple-600 dark:text-purple-400">Success Rate</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600">+2.1%</span>
              <span className="text-gray-600 dark:text-gray-400 ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">7 Days</SelectItem>
            <SelectItem value="30d">30 Days</SelectItem>
            <SelectItem value="90d">90 Days</SelectItem>
            <SelectItem value="1y">1 Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="demand" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="demand">Blood Demand</TabsTrigger>
          <TabsTrigger value="response">Response Times</TabsTrigger>
          <TabsTrigger value="users">User Analytics</TabsTrigger>
          <TabsTrigger value="prediction">Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="demand" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Blood Group Demand Analysis</CardTitle>
              <CardDescription>Monthly demand patterns by blood type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bloodDemandData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="O+" fill="#ef4444" />
                    <Bar dataKey="A+" fill="#f97316" />
                    <Bar dataKey="B+" fill="#eab308" />
                    <Bar dataKey="AB+" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="response" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Response Time Analytics</CardTitle>
              <CardDescription>Daily response patterns and efficiency metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={responseTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="bloodRequests" stroke="#ef4444" strokeWidth={2} />
                    <Line type="monotone" dataKey="ambulanceRequests" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="avgResponseTime" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Engagement Distribution</CardTitle>
              <CardDescription>Active users by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={userEngagementData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {userEngagementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prediction" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Predictive Analytics</CardTitle>
              <CardDescription>AI-powered demand forecasting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={predictiveData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="actual" stroke="#ef4444" strokeWidth={3} />
                    <Line type="monotone" dataKey="predicted" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-700 dark:text-blue-300">AI Insights</span>
                </div>
                <ul className="mt-2 space-y-1 text-sm text-blue-600 dark:text-blue-400">
                  <li>• Predicted 15% increase in blood demand during festival season</li>
                  <li>• O+ and A+ types showing highest demand growth</li>
                  <li>• Recommend increasing donor outreach in September-October</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SmartAnalytics;
