
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Heart, Phone, MapPin, Star, Search, Filter, Users, Clock } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';

const DonorDirectory = () => {
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [bloodGroupFilter, setBloodGroupFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const { toast } = useToast();

  // Mock donor data
  useEffect(() => {
    const mockDonors = [
      {
        id: 1,
        name: 'Ram Bahadur Gurung',
        bloodGroup: 'O+',
        location: 'Dharan-1, Hospital Road',
        phone: '+977-9841234567',
        rewardPoints: 1250,
        totalDonations: 12,
        lastDonation: '45 days ago',
        isAvailable: true,
        distance: '0.5 km',
        rating: 4.8
      },
      {
        id: 2,
        name: 'Sita Devi Sharma',
        bloodGroup: 'A+',
        location: 'Dharan-5, Main Bazaar',
        phone: '+977-9841234568',
        rewardPoints: 890,
        totalDonations: 8,
        lastDonation: '60 days ago',
        isAvailable: true,
        distance: '1.2 km',
        rating: 4.9
      },
      {
        id: 3,
        name: 'Hari Prasad Rai',
        bloodGroup: 'B+',
        location: 'Dharan-3, College Road',
        phone: '+977-9841234569',
        rewardPoints: 1580,
        totalDonations: 15,
        lastDonation: '30 days ago',
        isAvailable: false,
        distance: '2.1 km',
        rating: 4.7
      },
      {
        id: 4,
        name: 'Maya Limbu',
        bloodGroup: 'O-',
        location: 'Dharan-2, Bus Park',
        phone: '+977-9841234570',
        rewardPoints: 2100,
        totalDonations: 20,
        lastDonation: '90 days ago',
        isAvailable: true,
        distance: '0.8 km',
        rating: 5.0
      },
      {
        id: 5,
        name: 'Krishna Thapa',
        bloodGroup: 'AB+',
        location: 'Dharan-4, New Market',
        phone: '+977-9841234571',
        rewardPoints: 450,
        totalDonations: 4,
        lastDonation: '20 days ago',
        isAvailable: true,
        distance: '1.5 km',
        rating: 4.6
      }
    ];

    setTimeout(() => {
      setDonors(mockDonors);
      setFilteredDonors(mockDonors);
      setIsLoading(false);
    }, 1500);
  }, []);

  // Filter donors based on search and filters
  useEffect(() => {
    let filtered = donors.filter(donor => {
      const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          donor.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBloodGroup = bloodGroupFilter === 'all' || donor.bloodGroup === bloodGroupFilter;
      const matchesLocation = locationFilter === 'all' || donor.location.includes(locationFilter);
      const matchesAvailability = availabilityFilter === 'all' || 
                                (availabilityFilter === 'available' && donor.isAvailable) ||
                                (availabilityFilter === 'unavailable' && !donor.isAvailable);
      
      return matchesSearch && matchesBloodGroup && matchesLocation && matchesAvailability;
    });

    setFilteredDonors(filtered);
  }, [donors, searchTerm, bloodGroupFilter, locationFilter, availabilityFilter]);

  const handleContactDonor = (donor) => {
    toast({
      title: "Contact Information",
      description: `You can reach ${donor.name} at ${donor.phone}`,
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setBloodGroupFilter('all');
    setLocationFilter('all');
    setAvailabilityFilter('all');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
        <span className="ml-3 text-gray-600 dark:text-gray-300">Loading donor directory...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search and Filters */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 dark:text-white">
            <Search className="h-5 w-5 text-blue-600" />
            <span>Find Blood Donors</span>
          </CardTitle>
          <CardDescription className="dark:text-gray-300">
            Search and filter donors by blood group, location, and availability
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={bloodGroupFilter} onValueChange={setBloodGroupFilter}>
              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                <SelectValue placeholder="Blood Group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Blood Groups</SelectItem>
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

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="Dharan-1">Dharan-1</SelectItem>
                <SelectItem value="Dharan-2">Dharan-2</SelectItem>
                <SelectItem value="Dharan-3">Dharan-3</SelectItem>
                <SelectItem value="Dharan-4">Dharan-4</SelectItem>
                <SelectItem value="Dharan-5">Dharan-5</SelectItem>
              </SelectContent>
            </Select>

            <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Donors</SelectItem>
                <SelectItem value="available">Available Now</SelectItem>
                <SelectItem value="unavailable">Recently Donated</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={clearFilters} className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Clear Filters</span>
            </Button>
          </div>

          {/* Results Summary */}
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{filteredDonors.length} donors found</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4 text-green-600" />
              <span>{filteredDonors.filter(d => d.isAvailable).length} available</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Donor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDonors.length > 0 ? (
          filteredDonors.map((donor) => (
            <Card key={donor.id} className={`hover:shadow-lg transition-all duration-300 hover-scale ${
              !donor.isAvailable ? 'opacity-75' : ''
            } dark:bg-gray-800 dark:border-gray-700`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg dark:text-white">{donor.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        className={`${
                          donor.bloodGroup.includes('O') ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                          donor.bloodGroup.includes('A') ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                          donor.bloodGroup.includes('B') ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        }`}
                      >
                        {donor.bloodGroup}
                      </Badge>
                      <Badge className={donor.isAvailable ? 
                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                        'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                      }>
                        {donor.isAvailable ? 'Available' : 'Recently Donated'}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium">{donor.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{donor.location}</span>
                    <Badge variant="outline" className="text-xs">
                      {donor.distance}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-red-600" />
                    <span>{donor.totalDonations} donations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>Last donation: {donor.lastDonation}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{donor.rewardPoints} reward points</span>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 flex items-center space-x-1"
                    onClick={() => handleContactDonor(donor)}
                  >
                    <Phone className="h-4 w-4" />
                    <span>Contact</span>
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 bg-red-600 hover:bg-red-700"
                    disabled={!donor.isAvailable}
                  >
                    Request Blood
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Users className="h-12 w-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No donors found</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button onClick={clearFilters} variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorDirectory;
