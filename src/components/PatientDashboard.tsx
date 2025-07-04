
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Heart, Truck, Plus, Clock, MapPin, Phone, Navigation, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AmbulanceTracker from '@/components/AmbulanceTracker';
import LoadingSpinner from '@/components/LoadingSpinner';

interface PatientDashboardProps {
  user: {
    name: string;
    email: string;
    role: string;
    id: string;
  };
}

interface BloodRequest {
  id: number;
  type: 'blood';
  bloodGroup: string;
  status: string;
  requestedAt: string;
  location: string;
  responses: number;
  urgency: string;
  progress: number;
  unitsNeeded?: string;
  contactPerson?: string;
  contactNumber?: string;
  additionalInfo?: string;
}

interface AmbulanceRequest {
  id: number;
  type: 'ambulance';
  status: string;
  requestedAt: string;
  pickupLocation: string;
  destination: string;
  driverName?: string;
  driverPhone?: string;
  estimatedTime?: string;
  progress: number;
  urgency?: string;
  contactPerson?: string;
  contactNumber?: string;
  patientCondition?: string;
  specialRequirements?: string;
}

type ActiveRequest = BloodRequest | AmbulanceRequest;

const PatientDashboard = ({ user }: PatientDashboardProps) => {
  const [showBloodForm, setShowBloodForm] = useState(false);
  const [showAmbulanceForm, setShowAmbulanceForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const [activeRequests, setActiveRequests] = useState<ActiveRequest[]>([
    {
      id: 1,
      type: 'blood',
      bloodGroup: 'O+',
      status: 'Active',
      requestedAt: '30 minutes ago',
      location: 'Dharan Hospital',
      responses: 3,
      urgency: 'Critical',
      progress: 60
    },
    {
      id: 2,
      type: 'ambulance',
      status: 'En Route',
      requestedAt: '15 minutes ago',
      pickupLocation: 'Dharan-5, Main Road',
      destination: 'BP Koirala Health Science',
      driverName: 'Ramesh Gurung',
      driverPhone: '+977-9841234567',
      estimatedTime: '8 minutes',
      progress: 75
    }
  ]);

  const [bloodRequest, setBloodRequest] = useState({
    bloodGroup: '',
    urgency: '',
    location: '',
    contactPerson: '',
    contactNumber: '',
    additionalInfo: '',
    unitsNeeded: '1'
  });

  const [ambulanceRequest, setAmbulanceRequest] = useState({
    pickupLocation: '',
    destination: '',
    urgency: '',
    contactPerson: '',
    contactNumber: '',
    patientCondition: '',
    specialRequirements: ''
  });

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRequests(prev => prev.map(request => ({
        ...request,
        progress: Math.min(request.progress + Math.random() * 5, 100)
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleBloodRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newRequest: BloodRequest = {
        id: Date.now(),
        type: 'blood',
        bloodGroup: bloodRequest.bloodGroup,
        urgency: bloodRequest.urgency,
        location: bloodRequest.location,
        contactPerson: bloodRequest.contactPerson,
        contactNumber: bloodRequest.contactNumber,
        additionalInfo: bloodRequest.additionalInfo,
        unitsNeeded: bloodRequest.unitsNeeded,
        status: 'Active',
        requestedAt: 'Just now',
        responses: 0,
        progress: 0
      };
      
      setActiveRequests(prev => [newRequest, ...prev]);
      setShowBloodForm(false);
      
      // Reset form
      setBloodRequest({
        bloodGroup: '',
        urgency: '',
        location: '',
        contactPerson: '',
        contactNumber: '',
        additionalInfo: '',
        unitsNeeded: '1'
      });

      toast({
        title: "Blood Request Submitted",
        description: "Your blood request has been sent to nearby donors.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit blood request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAmbulanceRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newRequest: AmbulanceRequest = {
        id: Date.now(),
        type: 'ambulance',
        pickupLocation: ambulanceRequest.pickupLocation,
        destination: ambulanceRequest.destination,
        urgency: ambulanceRequest.urgency,
        contactPerson: ambulanceRequest.contactPerson,
        contactNumber: ambulanceRequest.contactNumber,
        patientCondition: ambulanceRequest.patientCondition,
        specialRequirements: ambulanceRequest.specialRequirements,
        status: 'Dispatching',
        requestedAt: 'Just now',
        driverName: 'Assigning...',
        driverPhone: '',
        estimatedTime: 'Calculating...',
        progress: 0
      };
      
      setActiveRequests(prev => [newRequest, ...prev]);
      setShowAmbulanceForm(false);
      
      // Reset form
      setAmbulanceRequest({
        pickupLocation: '',
        destination: '',
        urgency: '',
        contactPerson: '',
        contactNumber: '',
        patientCondition: '',
        specialRequirements: ''
      });

      toast({
        title: "Ambulance Requested",
        description: "Emergency dispatch has been notified. Help is on the way.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to request ambulance. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'en route': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'dispatching': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Emergency Actions - Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <Card className="border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800 hover:shadow-lg transition-all duration-300 hover-scale">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center space-x-2 text-red-700 dark:text-red-300 text-lg sm:text-xl">
              <Heart className="h-5 w-5 sm:h-6 sm:w-6 fill-current animate-pulse" />
              <span>Request Blood</span>
            </CardTitle>
            <CardDescription className="dark:text-red-200 text-sm sm:text-base">
              Find blood donors in your area quickly
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button 
              onClick={() => setShowBloodForm(true)}
              className="w-full mobile-touch-target bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 transition-colors text-sm sm:text-base min-h-[44px]"
              disabled={isLoading}
            >
              <Plus className="h-4 w-4 mr-2" />
              Request Blood
            </Button>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800 hover:shadow-lg transition-all duration-300 hover-scale">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center space-x-2 text-blue-700 dark:text-blue-300 text-lg sm:text-xl">
              <Truck className="h-5 w-5 sm:h-6 sm:w-6" />
              <span>Request Ambulance</span>
            </CardTitle>
            <CardDescription className="dark:text-blue-200 text-sm sm:text-base">
              Get emergency medical transport
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button 
              onClick={() => setShowAmbulanceForm(true)}
              className="w-full mobile-touch-target bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors text-sm sm:text-base min-h-[44px]"
              disabled={isLoading}
            >
              <Plus className="h-4 w-4 mr-2" />
              Request Ambulance
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Active Requests - Mobile Optimized */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 dark:text-white text-lg sm:text-xl">
            <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
            <span>Active Requests</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeRequests.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              {activeRequests.map((request) => (
                <div key={request.id} className="border dark:border-gray-600 rounded-lg p-3 sm:p-4 bg-white dark:bg-gray-700 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div className="space-y-2 flex-1 min-w-0">
                      <h3 className="font-semibold flex items-center space-x-2 dark:text-white text-sm sm:text-base">
                        {request.type === 'blood' ? (
                          <Heart className="h-4 w-4 text-red-600 fill-current flex-shrink-0" />
                        ) : (
                          <Truck className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        )}
                        <span className="truncate">
                          {request.type === 'blood' ? 'Blood Request' : 'Ambulance Request'}
                        </span>
                      </h3>
                      
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                          {request.type === 'blood' && (
                            <span className="font-medium text-red-600 dark:text-red-400">{request.bloodGroup}</span>
                          )}
                          <span className="flex items-center space-x-1 min-w-0">
                            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span className="truncate">{request.type === 'blood' ? request.location : request.pickupLocation}</span>
                          </span>
                          <span className="whitespace-nowrap">{request.requestedAt}</span>
                        </div>
                        
                        {request.type === 'ambulance' && request.driverName && (
                          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                            <span><strong>Driver:</strong> {request.driverName}</span>
                            {request.estimatedTime && (
                              <span><strong>ETA:</strong> {request.estimatedTime}</span>
                            )}
                          </div>
                        )}
                        
                        <div className="mt-2">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Progress:</span>
                            <span className="text-xs sm:text-sm font-medium dark:text-white">{Math.round(request.progress)}%</span>
                          </div>
                          <Progress value={request.progress} className="h-2" />
                        </div>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(request.status)} ml-2 flex-shrink-0 text-xs`}>
                      {request.status}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-2 border-t dark:border-gray-600 gap-2">
                    {request.type === 'blood' ? (
                      <>
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                          {request.responses} donors responded
                        </span>
                        <Button variant="outline" size="sm" className="dark:border-gray-500 dark:text-gray-300 mobile-touch-target w-full sm:w-auto min-h-[44px] sm:min-h-[36px]">
                          View Responses
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                          {request.driverPhone && (
                            <Button variant="outline" size="sm" className="flex items-center justify-center space-x-1 mobile-touch-target min-h-[44px] sm:min-h-[36px]">
                              <Phone className="h-4 w-4" />
                              <span>Call Driver</span>
                            </Button>
                          )}
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 mobile-touch-target min-h-[44px] sm:min-h-[36px] flex items-center justify-center">
                            <Navigation className="h-4 w-4 mr-1" />
                            Track Live
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <p className="text-sm sm:text-base">No active requests</p>
              <p className="text-xs sm:text-sm">Your emergency requests will appear here</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Real-time Ambulance Tracker */}
      {activeRequests.some(r => r.type === 'ambulance') && (
        <AmbulanceTracker 
          activeAmbulanceRequests={activeRequests.filter(r => r.type === 'ambulance') as AmbulanceRequest[]} 
        />
      )}

      {/* Blood Request Form Modal - Mobile Optimized */}
      {showBloodForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50 animate-fade-in">
          <Card className="w-full max-w-md max-h-[95vh] overflow-y-auto dark:bg-gray-800 m-2">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 dark:text-white text-lg">
                <Heart className="h-5 w-5 text-red-600 fill-current" />
                <span>Request Blood</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBloodRequest} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="blood-group" className="dark:text-gray-200 text-sm">Blood Group Needed *</Label>
                  <Select value={bloodRequest.bloodGroup} onValueChange={(value) => setBloodRequest({...bloodRequest, bloodGroup: value})} required>
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 mobile-touch-target min-h-[44px]">
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
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
                  <Label htmlFor="units-needed" className="dark:text-gray-200 text-sm">Units Needed</Label>
                  <Select value={bloodRequest.unitsNeeded} onValueChange={(value) => setBloodRequest({...bloodRequest, unitsNeeded: value})}>
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 mobile-touch-target min-h-[44px]">
                      <SelectValue placeholder="Select units" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Unit</SelectItem>
                      <SelectItem value="2">2 Units</SelectItem>
                      <SelectItem value="3">3 Units</SelectItem>
                      <SelectItem value="4">4 Units</SelectItem>
                      <SelectItem value="5+">5+ Units</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency" className="dark:text-gray-200 text-sm">Urgency Level *</Label>
                  <Select value={bloodRequest.urgency} onValueChange={(value) => setBloodRequest({...bloodRequest, urgency: value})} required>
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 mobile-touch-target min-h-[44px]">
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Critical (within 1 hour)</SelectItem>
                      <SelectItem value="urgent">Urgent (within 6 hours)</SelectItem>
                      <SelectItem value="moderate">Moderate (within 24 hours)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="dark:text-gray-200 text-sm">Hospital/Location *</Label>
                  <Input
                    id="location"
                    placeholder="Enter hospital or location"
                    value={bloodRequest.location}
                    onChange={(e) => setBloodRequest({...bloodRequest, location: e.target.value})}
                    className="dark:bg-gray-700 dark:border-gray-600 mobile-touch-target min-h-[44px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-person" className="dark:text-gray-200 text-sm">Contact Person *</Label>
                  <Input
                    id="contact-person"
                    placeholder="Enter contact person name"
                    value={bloodRequest.contactPerson}
                    onChange={(e) => setBloodRequest({...bloodRequest, contactPerson: e.target.value})}
                    className="dark:bg-gray-700 dark:border-gray-600 mobile-touch-target min-h-[44px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-number" className="dark:text-gray-200 text-sm">Contact Number *</Label>
                  <Input
                    id="contact-number"
                    type="tel"
                    placeholder="Enter phone number"
                    value={bloodRequest.contactNumber}
                    onChange={(e) => setBloodRequest({...bloodRequest, contactNumber: e.target.value})}
                    className="dark:bg-gray-700 dark:border-gray-600 mobile-touch-target min-h-[44px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additional-info" className="dark:text-gray-200 text-sm">Additional Information</Label>
                  <Textarea
                    id="additional-info"
                    placeholder="Any additional details..."
                    value={bloodRequest.additionalInfo}
                    onChange={(e) => setBloodRequest({...bloodRequest, additionalInfo: e.target.value})}
                    className="dark:bg-gray-700 dark:border-gray-600 mobile-touch-target min-h-[88px]"
                    rows={3}
                  />
                </div>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowBloodForm(false)} 
                    className="flex-1 mobile-touch-target min-h-[44px]"
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 bg-red-600 hover:bg-red-700 mobile-touch-target min-h-[44px]"
                    disabled={isLoading}
                  >
                    {isLoading ? <LoadingSpinner size="sm" /> : 'Submit Request'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Ambulance Request Form Modal - Mobile Optimized */}
      {showAmbulanceForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50 animate-fade-in">
          <Card className="w-full max-w-md max-h-[95vh] overflow-y-auto dark:bg-gray-800 m-2">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 dark:text-white text-lg">
                <Truck className="h-5 w-5 text-blue-600" />
                <span>Request Ambulance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAmbulanceRequest} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pickup-location" className="dark:text-gray-200 text-sm">Pickup Location *</Label>
                  <Input
                    id="pickup-location"
                    placeholder="Enter pickup address"
                    value={ambulanceRequest.pickupLocation}
                    onChange={(e) => setAmbulanceRequest({...ambulanceRequest, pickupLocation: e.target.value})}
                    className="dark:bg-gray-700 dark:border-gray-600 mobile-touch-target min-h-[44px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination" className="dark:text-gray-200 text-sm">Destination Hospital *</Label>
                  <Input
                    id="destination"
                    placeholder="Enter destination hospital"
                    value={ambulanceRequest.destination}
                    onChange={(e) => setAmbulanceRequest({...ambulanceRequest, destination: e.target.value})}
                    className="dark:bg-gray-700 dark:border-gray-600 mobile-touch-target min-h-[44px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ambulance-urgency" className="dark:text-gray-200 text-sm">Urgency Level *</Label>
                  <Select value={ambulanceRequest.urgency} onValueChange={(value) => setAmbulanceRequest({...ambulanceRequest, urgency: value})} required>
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 mobile-touch-target min-h-[44px]">
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emergency">Emergency (Life-threatening)</SelectItem>
                      <SelectItem value="urgent">Urgent (Immediate care needed)</SelectItem>
                      <SelectItem value="scheduled">Scheduled Transport</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ambulance-contact-person" className="dark:text-gray-200 text-sm">Contact Person *</Label>
                  <Input
                    id="ambulance-contact-person"
                    placeholder="Enter contact person name"
                    value={ambulanceRequest.contactPerson}
                    onChange={(e) => setAmbulanceRequest({...ambulanceRequest, contactPerson: e.target.value})}
                    className="dark:bg-gray-700 dark:border-gray-600 mobile-touch-target min-h-[44px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ambulance-contact-number" className="dark:text-gray-200 text-sm">Contact Number *</Label>
                  <Input
                    id="ambulance-contact-number"
                    type="tel"
                    placeholder="Enter phone number"
                    value={ambulanceRequest.contactNumber}
                    onChange={(e) => setAmbulanceRequest({...ambulanceRequest, contactNumber: e.target.value})}
                    className="dark:bg-gray-700 dark:border-gray-600 mobile-touch-target min-h-[44px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="patient-condition" className="dark:text-gray-200 text-sm">Patient Condition *</Label>
                  <Textarea
                    id="patient-condition"
                    placeholder="Describe the patient's condition..."
                    value={ambulanceRequest.patientCondition}
                    onChange={(e) => setAmbulanceRequest({...ambulanceRequest, patientCondition: e.target.value})}
                    className="dark:bg-gray-700 dark:border-gray-600 mobile-touch-target min-h-[88px]"
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="special-requirements" className="dark:text-gray-200 text-sm">Special Requirements</Label>
                  <Textarea
                    id="special-requirements"
                    placeholder="Any special medical equipment or requirements..."
                    value={ambulanceRequest.specialRequirements}
                    onChange={(e) => setAmbulanceRequest({...ambulanceRequest, specialRequirements: e.target.value})}
                    className="dark:bg-gray-700 dark:border-gray-600 mobile-touch-target min-h-[66px]"
                    rows={2}
                  />
                </div>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowAmbulanceForm(false)} 
                    className="flex-1 mobile-touch-target min-h-[44px]"
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 mobile-touch-target min-h-[44px]"
                    disabled={isLoading}
                  >
                    {isLoading ? <LoadingSpinner size="sm" /> : 'Submit Request'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
