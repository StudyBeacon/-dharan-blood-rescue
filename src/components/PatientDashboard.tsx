import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation";
import AmbulanceTracker from "@/components/AmbulanceTracker";
import EmergencyActions from "@/components/EmergencyActions";
import ActiveRequestsList from "@/components/ActiveRequestsList";
import BloodRequestForm from "@/components/BloodRequestForm";
import AmbulanceRequestForm from "@/components/AmbulanceRequestForm";
import axios from "@/api/api"; // assuming this points to Axios instance
import Header from "./Header";
import BottomNavigation from "./BottomNavigation";

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
  type: "blood";
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
  type: "ambulance";
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
  const { t } = useTranslation();

  const [activeRequests, setActiveRequests] = useState<ActiveRequest[]>([]);
  const [bloodRequest, setBloodRequest] = useState({
    bloodGroup: "",
    urgency: "",
    location: "",
    contactPerson: "",
    contactNumber: "",
    additionalInfo: "",
    unitsNeeded: "1",
  });

  const [ambulanceRequest, setAmbulanceRequest] = useState({
    pickupLocation: "",
    destination: "",
    urgency: "",
    contactPerson: "",
    contactNumber: "",
    patientCondition: "",
    specialRequirements: "",
  });

  // Transform frontend ambulance form into backend schema
  const formatAmbulancePayload = (form: typeof ambulanceRequest) => ({
    pickupLocation: {
      type: "Point",
      coordinates: [87.2731, 26.8121], // Stubbed — replace with map/geolocation
      address: form.pickupLocation,
    },
    destination: {
      type: "Point",
      coordinates: [87.2702, 26.8105],
      address: form.destination,
    },
    reason: `${form.urgency.toUpperCase()} - ${form.patientCondition}`,
    notes: `Contact: ${form.contactPerson} (${form.contactNumber}). Special: ${
      form.specialRequirements || "None"
    }`,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRequests((prev) =>
        prev.map((request) => ({
          ...request,
          progress: Math.min(request.progress + Math.random() * 5, 100),
        }))
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleBloodRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Replace with real API

      const newRequest: BloodRequest = {
        id: Date.now(),
        type: "blood",
        bloodGroup: bloodRequest.bloodGroup,
        urgency: bloodRequest.urgency,
        location: bloodRequest.location,
        contactPerson: bloodRequest.contactPerson,
        contactNumber: bloodRequest.contactNumber,
        additionalInfo: bloodRequest.additionalInfo,
        unitsNeeded: bloodRequest.unitsNeeded,
        status: "Active",
        requestedAt: "Just now",
        responses: 0,
        progress: 0,
      };

      setActiveRequests((prev) => [newRequest, ...prev]);
      setShowBloodForm(false);
      setBloodRequest({
        bloodGroup: "",
        urgency: "",
        location: "",
        contactPerson: "",
        contactNumber: "",
        additionalInfo: "",
        unitsNeeded: "1",
      });

      toast({
        title: t("bloodRequestSubmitted"),
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
      const payload = formatAmbulancePayload(ambulanceRequest);
      await axios.post("/patient/ambulance-request", payload);

      const newRequest: AmbulanceRequest = {
        id: Date.now(),
        type: "ambulance",
        pickupLocation: payload.pickupLocation.address,
        destination: payload.destination.address,
        urgency: ambulanceRequest.urgency,
        contactPerson: ambulanceRequest.contactPerson,
        contactNumber: ambulanceRequest.contactNumber,
        patientCondition: ambulanceRequest.patientCondition,
        specialRequirements: ambulanceRequest.specialRequirements,
        status: "Dispatching",
        requestedAt: "Just now",
        driverName: "Assigning...",
        driverPhone: "",
        estimatedTime: "Calculating...",
        progress: 0,
      };

      setActiveRequests((prev) => [newRequest, ...prev]);
      setShowAmbulanceForm(false);
      setAmbulanceRequest({
        pickupLocation: "",
        destination: "",
        urgency: "",
        contactPerson: "",
        contactNumber: "",
        patientCondition: "",
        specialRequirements: "",
      });

      toast({
        title: t("ambulanceRequested"),
        description: t("helpOnWay"),
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
    <>
      <Header
        // user={user}
        onLogout={() => console.log("Logout")}
        onLanguageChange={(lang) => console.log("Language changed to", lang)}
        currentLanguage="en"
        activeTab="dashboard"
        onTabChange={(tab) => console.log("Tab changed to", tab)}
      />
      <div className="space-y-4 sm:space-y-6 animate-fade-in">
        <EmergencyActions
          onBloodRequest={() => setShowBloodForm(true)}
          onAmbulanceRequest={() => setShowAmbulanceForm(true)}
          isLoading={isLoading}
        />

        <ActiveRequestsList requests={activeRequests} />

        {activeRequests.some((r) => r.type === "ambulance") && (
          <AmbulanceTracker
            activeAmbulanceRequests={
              activeRequests.filter(
                (r) => r.type === "ambulance"
              ) as AmbulanceRequest[]
            }
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

      <BottomNavigation
        activeTab="dashboard"
        onTabChange={() => {}}
        userRole="donor"
      />
    </>
  );
};

export default PatientDashboard;
