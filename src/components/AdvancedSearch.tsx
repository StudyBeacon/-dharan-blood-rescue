
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MapPin, Clock, Heart, Star } from 'lucide-react';

interface SearchFilters {
  bloodGroup: string;
  location: string;
  distance: string;
  availability: string;
  rating: string;
  lastDonation: string;
  compatibility: boolean;
}

interface Donor {
  id: string;
  name: string;
  bloodGroup: string;
  location: string;
  distance: number;
  availability: string;
  rating: number;
  lastDonation: string;
  donations: number;
  compatible: boolean;
}

const AdvancedSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    bloodGroup: '',
    location: '',
    distance: '',
    availability: '',
    rating: '',
    lastDonation: '',
    compatibility: false
  });

  const [donors] = useState<Donor[]>([
    {
      id: '1',
      name: 'Ram Sharma',
      bloodGroup: 'O+',
      location: 'Dharan-5',
      distance: 2.5,
      availability: 'Available',
      rating: 4.8,
      lastDonation: '2 months ago',
      donations: 12,
      compatible: true
    },
    {
      id: '2',
      name: 'Sita Poudel',
      bloodGroup: 'A+',
      location: 'Dharan-7',
      distance: 1.2,
      availability: 'Available',
      rating: 4.9,
      lastDonation: '1 month ago',
      donations: 15,
      compatible: false
    },
    {
      id: '3',
      name: 'Krishna Thapa',
      bloodGroup: 'B-',
      location: 'Dharan-2',
      distance: 3.8,
      availability: 'Busy',
      rating: 4.6,
      lastDonation: '3 weeks ago',
      donations: 8,
      compatible: false
    },
    {
      id: '4',
      name: 'Maya Gurung',
      bloodGroup: 'O-',
      location: 'Dharan-1',
      distance: 0.8,
      availability: 'Available',
      rating: 5.0,
      lastDonation: '6 weeks ago',
      donations: 20,
      compatible: true
    }
  ]);

  const [filteredDonors, setFilteredDonors] = useState<Donor[]>(donors);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Blood compatibility matrix
  const getCompatibleBloodTypes = (patientBloodType: string): string[] => {
    const compatibility: { [key: string]: string[] } = {
      'A+': ['A+', 'A-', 'O+', 'O-'],
      'A-': ['A-', 'O-'],
      'B+': ['B+', 'B-', 'O+', 'O-'],
      'B-': ['B-', 'O-'],
      'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      'AB-': ['A-', 'B-', 'AB-', 'O-'],
      'O+': ['O+', 'O-'],
      'O-': ['O-']
    };
    return compatibility[patientBloodType] || [];
  };

  useEffect(() => {
    let filtered = donors.filter(donor => {
      const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           donor.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesBloodGroup = !filters.bloodGroup || donor.bloodGroup === filters.bloodGroup;
      const matchesLocation = !filters.location || donor.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesDistance = !filters.distance || donor.distance <= parseFloat(filters.distance);
      const matchesAvailability = !filters.availability || donor.availability === filters.availability;
      const matchesRating = !filters.rating || donor.rating >= parseFloat(filters.rating);
      
      const matchesCompatibility = !filters.compatibility || 
        getCompatibleBloodTypes('O+').includes(donor.bloodGroup); // Default patient blood type for demo

      return matchesSearch && matchesBloodGroup && matchesLocation && 
             matchesDistance && matchesAvailability && matchesRating && matchesCompatibility;
    });

    // Sort by distance and availability
    filtered = filtered.sort((a, b) => {
      if (a.availability === 'Available' && b.availability !== 'Available') return -1;
      if (b.availability === 'Available' && a.availability !== 'Available') return 1;
      return a.distance - b.distance;
    });

    setFilteredDonors(filtered);
  }, [searchTerm, filters, donors]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term && !searchHistory.includes(term)) {
      setSearchHistory(prev => [term, ...prev.slice(0, 4)]);
    }
  };

  const clearFilters = () => {
    setFilters({
      bloodGroup: '',
      location: '',
      distance: '',
      availability: '',
      rating: '',
      lastDonation: '',
      compatibility: false
    });
    setSearchTerm('');
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => 
      typeof value === 'boolean' ? value : value !== ''
    ).length;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search Bar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-blue-600" />
            <span>Advanced Donor Search</span>
            {getActiveFiltersCount() > 0 && (
              <Badge className="bg-blue-600 text-white">
                {getActiveFiltersCount()} filters
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search donors by name or location..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Search History */}
          {searchHistory.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">Recent:</span>
              {searchHistory.map((term, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchTerm(term)}
                  className="h-6 px-2 text-xs"
                >
                  {term}
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-green-600" />
              <span>Filters</span>
            </div>
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Blood Group</Label>
              <Select value={filters.bloodGroup} onValueChange={(value) => setFilters({...filters, bloodGroup: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Any blood group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any blood group</SelectItem>
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

            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                placeholder="Enter location"
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label>Max Distance (km)</Label>
              <Select value={filters.distance} onValueChange={(value) => setFilters({...filters, distance: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Any distance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any distance</SelectItem>
                  <SelectItem value="1">Within 1 km</SelectItem>
                  <SelectItem value="2">Within 2 km</SelectItem>
                  <SelectItem value="5">Within 5 km</SelectItem>
                  <SelectItem value="10">Within 10 km</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Availability</Label>
              <Select value={filters.availability} onValueChange={(value) => setFilters({...filters, availability: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Any availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any availability</SelectItem>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Busy">Busy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Minimum Rating</Label>
              <Select value={filters.rating} onValueChange={(value) => setFilters({...filters, rating: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Any rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any rating</SelectItem>
                  <SelectItem value="4">4+ stars</SelectItem>
                  <SelectItem value="4.5">4.5+ stars</SelectItem>
                  <SelectItem value="4.8">4.8+ stars</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="compatibility"
                  checked={filters.compatibility}
                  onCheckedChange={(checked) => setFilters({...filters, compatibility: checked as boolean})}
                />
                <Label htmlFor="compatibility">Only compatible donors</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      <Card>
        <CardHeader>
          <CardTitle>
            Search Results ({filteredDonors.length} donors found)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDonors.map((donor) => (
              <div key={donor.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{donor.name}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                      <MapPin className="h-3 w-3" />
                      <span>{donor.location}</span>
                      <span>•</span>
                      <span>{donor.distance} km</span>
                    </div>
                  </div>
                  <Badge variant={donor.availability === 'Available' ? 'default' : 'secondary'}>
                    {donor.availability}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Blood Group</span>
                    <Badge variant="destructive" className="font-bold">
                      {donor.bloodGroup}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-600 fill-current" />
                      <span className="text-sm font-medium">{donor.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Last Donation</span>
                    <span className="text-sm">{donor.lastDonation}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Total Donations</span>
                    <span className="text-sm font-medium">{donor.donations}</span>
                  </div>
                </div>

                <div className="flex space-x-2 mt-4">
                  <Button size="sm" className="flex-1 bg-red-600 hover:bg-red-700">
                    <Heart className="h-3 w-3 mr-1" />
                    Request
                  </Button>
                  <Button variant="outline" size="sm">
                    Call
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredDonors.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No donors found matching your criteria</p>
              <p className="text-sm">Try adjusting your filters</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedSearch;
