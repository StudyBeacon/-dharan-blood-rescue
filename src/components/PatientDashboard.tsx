
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import AmbulanceTracker from '@/components/AmbulanceTracker';
import EmergencyActions from '@/components/EmergencyActions';
import ActiveRequestsList from '@/components/ActiveRequestsList';
import BloodRequestForm from '@/components/BloodRequestForm';
import AmbulanceRequestForm from '@/components/AmbulanceRequestForm';

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

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <EmergencyActions
        onBloodRequest={() => setShowBloodForm(true)}
        onAmbulanceRequest={() => setShowAmbulanceForm(true)}
        isLoading={isLoading}
      />

      <ActiveRequestsList requests={activeRequests} />

      {/* Real-time Ambulance Tracker */}
      {activeRequests.some(r => r.type === 'ambulance') && (
        <AmbulanceTracker 
          activeAmbulanceRequests={activeRequests.filter(r => r.type === 'ambulance') as AmbulanceRequest[]} 
        />
      )}

      <BloodRequestForm
        isVisible={showBloodForm}
        isLoading={isLoading}
        bloodRequest={bloodRequest}
        onBloodRequestChange={setBloodRequest}
        onSubmit={handleBloodRequest}
        onClose={() => setShowBloodForm(false)}
      />

      <AmbulanceRequestForm
        isVisible={showAmbulanceForm}
        isLoading={isLoading}
        ambulanceRequest={ambulanceRequest}
        onAmbulanceRequestChange={setAmbulanceRequest}
        onSubmit={handleAmbulanceRequest}
        onClose={() => setShowAmbulanceForm(false)}
      />
    </div>
  );
};

export default PatientDashboard;
