
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin, Phone, Search, Users } from 'lucide-react';

const DonorDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBloodGroup, setFilterBloodGroup] = useState('');
  
  const [donors] = useState([
    {
      id: 1,
      name: 'Ram Sharma',
      bloodGroup: 'O+',
      location: 'Dharan-5',
      phone: '+977-9841234567',
      lastDonation: '2 months ago',
      rewardPoints: 450,
      availability: 'Available'
    },
    {
      id: 2,
      name: 'Sita Gurung',
      bloodGroup: 'A+',
      location: 'Dharan-7',
      phone: '+977-9851234567',
      lastDonation: '1 month ago',
      rewardPoints: 320,
      availability: 'Available'
    },
    {
      id: 3,
      name: 'Krishna Thapa',
      bloodGroup: 'B-',
      location: 'Dharan-2',
      phone: '+977-9861234567',
      lastDonation: '3 weeks ago',
      rewardPoints: 780,
      availability: 'Not Available'
    }
  ]);

  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donor.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBloodGroup = !filterBloodGroup || donor.bloodGroup === filterBloodGroup;
    return matchesSearch && matchesBloodGroup;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-red-600" />
            <span>Blood Donor Directory</span>
          </CardTitle>
          <CardDescription>
            Find and connect with blood donors in your area
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterBloodGroup} onValueChange={setFilterBloodGroup}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by blood group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Blood Groups</SelectItem>
                <SelectItem value="A+">A+</SelectItem>
                <SelectItem value="A-">A-</SelectItem>
                <SelectItem value="B+">B+</SelectItem>
                <SelectItem value="B-">B-</SelectItem>
                <SelectItem value="AB+">AB+</SelectItem>
                <SelectItem value="AB-">AB-</SelectItem>
                <SelectItem value="O+">O+</SelectItem>
                <SelectItem value="O-">O-</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Donor List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDonors.map((donor) => (
          <Card key={donor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{donor.name}</CardTitle>
                <Badge variant={donor.availability === 'Available' ? 'default' : 'secondary'}>
                  {donor.availability}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Blood Group</span>
                <Badge variant="destructive" className="text-lg px-3 py-1">
                  {donor.bloodGroup}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>{donor.location}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <Phone className="h-4 w-4" />
                <span>{donor.phone}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">Last Donation</span>
                <span>{donor.lastDonation}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">Reward Points</span>
                <span className="font-medium text-yellow-600">{donor.rewardPoints}</span>
              </div>
              
              <div className="flex space-x-2 pt-2">
                <Button 
                  size="sm" 
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  disabled={donor.availability !== 'Available'}
                >
                  <Heart className="h-4 w-4 mr-1" />
                  Request
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-1" />
                  Call
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredDonors.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 dark:text-gray-400">No donors found</p>
            <p className="text-sm text-gray-400">Try adjusting your search criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DonorDirectory;
