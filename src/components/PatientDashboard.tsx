
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Heart, Truck, Plus, Clock, MapPin, Phone } from 'lucide-react';

const PatientDashboard = () => {
  const [showBloodForm, setShowBloodForm] = useState(false);
  const [showAmbulanceForm, setShowAmbulanceForm] = useState(false);
  
  const [activeRequests] = useState([
    {
      id: 1,
      type: 'blood',
      bloodGroup: 'O+',
      status: 'Active',
      requestedAt: '30 minutes ago',
      location: 'Dharan Hospital',
      responses: 3
    }
  ]);

  const [bloodRequest, setBloodRequest] = useState({
    bloodGroup: '',
    urgency: '',
    location: '',
    contactPerson: '',
    contactNumber: '',
    additionalInfo: ''
  });

  const [ambulanceRequest, setAmbulanceRequest] = useState({
    pickupLocation: '',
    destination: '',
    urgency: '',
    contactPerson: '',
    contactNumber: '',
    patientCondition: ''
  });

  const handleBloodRequest = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Blood request submitted:', bloodRequest);
    setShowBloodForm(false);
    // Reset form
    setBloodRequest({
      bloodGroup: '',
      urgency: '',
      location: '',
      contactPerson: '',
      contactNumber: '',
      additionalInfo: ''
    });
  };

  const handleAmbulanceRequest = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Ambulance request submitted:', ambulanceRequest);
    setShowAmbulanceForm(false);
    // Reset form
    setAmbulanceRequest({
      pickupLocation: '',
      destination: '',
      urgency: '',
      contactPerson: '',
      contactNumber: '',
      patientCondition: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Emergency Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-700">
              <Heart className="h-5 w-5 fill-current" />
              <span>Request Blood</span>
            </CardTitle>
            <CardDescription>
              Find blood donors in your area quickly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setShowBloodForm(true)}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Request Blood
            </Button>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-700">
              <Truck className="h-5 w-5" />
              <span>Request Ambulance</span>
            </CardTitle>
            <CardDescription>
              Get emergency medical transport
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setShowAmbulanceForm(true)}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Request Ambulance
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Active Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-orange-600" />
            <span>Active Requests</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeRequests.length > 0 ? (
            <div className="space-y-4">
              {activeRequests.map((request) => (
                <div key={request.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="space-y-1">
                      <h3 className="font-semibold flex items-center space-x-2">
                        {request.type === 'blood' ? (
                          <Heart className="h-4 w-4 text-red-600 fill-current" />
                        ) : (
                          <Truck className="h-4 w-4 text-blue-600" />
                        )}
                        <span>
                          {request.type === 'blood' ? 'Blood Request' : 'Ambulance Request'}
                        </span>
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        {request.bloodGroup && (
                          <span className="font-medium">{request.bloodGroup}</span>
                        )}
                        <span className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{request.location}</span>
                        </span>
                        <span>{request.requestedAt}</span>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {request.status}
                    </Badge>
                  </div>
                  
                  {request.type === 'blood' && (
                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-sm text-gray-600">
                        {request.responses} donors responded
                      </span>
                      <Button variant="outline" size="sm">
                        View Responses
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No active requests</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Blood Request Form Modal */}
      {showBloodForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-600 fill-current" />
                <span>Request Blood</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBloodRequest} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="blood-group">Blood Group Needed</Label>
                  <Select value={bloodRequest.bloodGroup} onValueChange={(value) => setBloodRequest({...bloodRequest, bloodGroup: value})}>
                    <SelectTrigger>
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
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <Select value={bloodRequest.urgency} onValueChange={(value) => setBloodRequest({...bloodRequest, urgency: value})}>
                    <SelectTrigger>
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
                  <Label htmlFor="location">Hospital/Location</Label>
                  <Input
                    id="location"
                    placeholder="Enter hospital or location"
                    value={bloodRequest.location}
                    onChange={(e) => setBloodRequest({...bloodRequest, location: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-person">Contact Person</Label>
                  <Input
                    id="contact-person"
                    placeholder="Enter contact person name"
                    value={bloodRequest.contactPerson}
                    onChange={(e) => setBloodRequest({...bloodRequest, contactPerson: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-number">Contact Number</Label>
                  <Input
                    id="contact-number"
                    type="tel"
                    placeholder="Enter phone number"
                    value={bloodRequest.contactNumber}
                    onChange={(e) => setBloodRequest({...bloodRequest, contactNumber: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additional-info">Additional Information</Label>
                  <Textarea
                    id="additional-info"
                    placeholder="Any additional details..."
                    value={bloodRequest.additionalInfo}
                    onChange={(e) => setBloodRequest({...bloodRequest, additionalInfo: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setShowBloodForm(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700">
                    Submit Request
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Ambulance Request Form Modal */}
      {showAmbulanceForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-blue-600" />
                <span>Request Ambulance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAmbulanceRequest} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pickup-location">Pickup Location</Label>
                  <Input
                    id="pickup-location"
                    placeholder="Enter pickup address"
                    value={ambulanceRequest.pickupLocation}
                    onChange={(e) => setAmbulanceRequest({...ambulanceRequest, pickupLocation: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination">Destination Hospital</Label>
                  <Input
                    id="destination"
                    placeholder="Enter destination hospital"
                    value={ambulanceRequest.destination}
                    onChange={(e) => setAmbulanceRequest({...ambulanceRequest, destination: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ambulance-urgency">Urgency Level</Label>
                  <Select value={ambulanceRequest.urgency} onValueChange={(value) => setAmbulanceRequest({...ambulanceRequest, urgency: value})}>
                    <SelectTrigger>
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
                  <Label htmlFor="ambulance-contact-person">Contact Person</Label>
                  <Input
                    id="ambulance-contact-person"
                    placeholder="Enter contact person name"
                    value={ambulanceRequest.contactPerson}
                    onChange={(e) => setAmbulanceRequest({...ambulanceRequest, contactPerson: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ambulance-contact-number">Contact Number</Label>
                  <Input
                    id="ambulance-contact-number"
                    type="tel"
                    placeholder="Enter phone number"
                    value={ambulanceRequest.contactNumber}
                    onChange={(e) => setAmbulanceRequest({...ambulanceRequest, contactNumber: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="patient-condition">Patient Condition</Label>
                  <Textarea
                    id="patient-condition"
                    placeholder="Describe the patient's condition..."
                    value={ambulanceRequest.patientCondition}
                    onChange={(e) => setAmbulanceRequest({...ambulanceRequest, patientCondition: e.target.value})}
                    rows={3}
                    required
                  />
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setShowAmbulanceForm(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Submit Request
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
