
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Heart, Truck, Clock, Target } from 'lucide-react';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const bloodRequestData = [
    { month: 'Jan', requests: 45, fulfilled: 38 },
    { month: 'Feb', requests: 52, fulfilled: 44 },
    { month: 'Mar', requests: 48, fulfilled: 41 },
    { month: 'Apr', requests: 61, fulfilled: 55 },
    { month: 'May', requests: 55, fulfilled: 48 },
    { month: 'Jun', requests: 67, fulfilled: 59 }
  ];

  const ambulanceData = [
    { day: 'Mon', requests: 12, completed: 11 },
    { day: 'Tue', requests: 15, completed: 14 },
    { day: 'Wed', requests: 8, completed: 8 },
    { day: 'Thu', requests: 18, completed: 16 },
    { day: 'Fri', requests: 22, completed: 20 },
    { day: 'Sat', requests: 14, completed: 13 },
    { day: 'Sun', requests: 10, completed: 9 }
  ];

  const bloodTypeDistribution = [
    { type: 'O+', value: 35, color: '#ef4444' },
    { type: 'A+', value: 25, color: '#f97316' },
    { type: 'B+', value: 20, color: '#eab308' },
    { type: 'AB+', value: 8, color: '#22c55e' },
    { type: 'O-', value: 6, color: '#3b82f6' },
    { type: 'A-', value: 3, color: '#8b5cf6' },
    { type: 'B-', value: 2, color: '#ec4899' },
    { type: 'AB-', value: 1, color: '#6b7280' }
  ];

  const responseTimeData = [
    { hour: '00:00', avgTime: 8.5 },
    { hour: '04:00', avgTime: 6.2 },
    { hour: '08:00', avgTime: 12.1 },
    { hour: '12:00', avgTime: 15.3 },
    { hour: '16:00', avgTime: 18.7 },
    { hour: '20:00', avgTime: 14.2 }
  ];

  const stats = [
    {
      title: 'Total Requests',
      value: '1,234',
      change: '+12%',
      icon: Target,
      color: 'text-blue-600'
    },
    {
      title: 'Active Donors',
      value: '856',
      change: '+8%',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Blood Donations',
      value: '492',
      change: '+15%',
      icon: Heart,
      color: 'text-red-600'
    },
    {
      title: 'Ambulance Rides',
      value: '203',
      change: '+5%',
      icon: Truck,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-300">Emergency response system insights</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 3 months</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change} from last period</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Blood Requests Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-red-600" />
              <span>Blood Requests Trend</span>
            </CardTitle>
            <CardDescription>Monthly blood requests vs fulfillment</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bloodRequestData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="requests" fill="#ef4444" name="Requests" />
                <Bar dataKey="fulfilled" fill="#22c55e" name="Fulfilled" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Blood Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Blood Type Distribution</CardTitle>
            <CardDescription>Requests by blood type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={bloodTypeDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ type, value }) => `${type}: ${value}%`}
                >
                  {bloodTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ambulance Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-blue-600" />
              <span>Weekly Ambulance Requests</span>
            </CardTitle>
            <CardDescription>Daily ambulance requests and completion</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ambulanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="requests" 
                  stroke="#3b82f6" 
                  strokeWidth={2} 
                  name="Requests"
                />
                <Line 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="#22c55e" 
                  strokeWidth={2} 
                  name="Completed"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Response Time Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <span>Average Response Time</span>
            </CardTitle>
            <CardDescription>Response time by hour of day (minutes)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="avgTime" 
                  stroke="#f97316" 
                  strokeWidth={2} 
                  name="Avg Time (min)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span>Performance Metrics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">94.2%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">12.5 min</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Avg Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">4.8⭐</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">User Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">87%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">User Satisfaction</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
