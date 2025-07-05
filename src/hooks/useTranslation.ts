
import { useState, useEffect } from 'react';

type TranslationKey = 
  // Navigation & Auth
  | 'welcome' | 'login' | 'logout' | 'dashboard' | 'directory' | 'profile' | 'help' | 'analytics' | 'emergency' | 'settings' | 'map'
  // User roles
  | 'donor' | 'driver' | 'patient'
  // Common actions
  | 'submit' | 'cancel' | 'save' | 'edit' | 'delete' | 'view' | 'search' | 'filter' | 'call' | 'navigate'
  // Emergency actions
  | 'requestBlood' | 'requestAmbulance' | 'emergencyActions' | 'activeRequests'
  // Blood request
  | 'bloodGroup' | 'urgency' | 'location' | 'contactPerson' | 'contactNumber' | 'unitsNeeded' | 'additionalInfo'
  | 'critical' | 'urgent' | 'moderate' | 'bloodRequest' | 'findDonors'
  // Ambulance request  
  | 'pickupLocation' | 'destination' | 'patientCondition' | 'specialRequirements' | 'ambulanceRequest'
  | 'emergencyUrgency' | 'scheduled' | 'dispatching' | 'enRoute'
  // Status & Progress
  | 'active' | 'completed' | 'pending' | 'progress' | 'responses' | 'estimatedTime'
  // Forms
  | 'required' | 'optional' | 'selectBloodGroup' | 'selectUrgency' | 'enterLocation' | 'enterName' | 'enterPhone'
  // Messages
  | 'bloodRequestSubmitted' | 'ambulanceRequested' | 'requestSubmitted' | 'helpOnWay'
  // Dashboard titles
  | 'patientDashboard' | 'donorDashboard' | 'driverDashboard' | 'donorDirectory'
  // Common phrases
  | 'noActiveRequests' | 'emergencyRequestsAppear' | 'trackLive' | 'callDriver' | 'viewResponses'
  // Additional form fields
  | 'enterDestination' | 'describeCondition' | 'anySpecialRequirements' | 'lifeThreatening' | 'immediateCare'
  | 'scheduledTransport' | 'bloodRequestDescription' | 'ambulanceRequestDescription';

const translations: Record<'en' | 'ne', Record<TranslationKey, string>> = {
  en: {
    // Navigation & Auth
    welcome: 'Welcome',
    login: 'Login',
    logout: 'Logout',
    dashboard: 'Dashboard',
    directory: 'Directory',
    profile: 'Profile',
    help: 'Help',
    analytics: 'Analytics',
    emergency: 'Emergency',
    settings: 'Settings',
    map: 'Map',
    
    // User roles
    donor: 'Donor',
    driver: 'Driver',
    patient: 'Patient',
    
    // Common actions
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    search: 'Search',
    filter: 'Filter',
    call: 'Call',
    navigate: 'Navigate',
    
    // Emergency actions
    requestBlood: 'Request Blood',
    requestAmbulance: 'Request Ambulance',
    emergencyActions: 'Emergency Actions',
    activeRequests: 'Active Requests',
    
    // Blood request
    bloodGroup: 'Blood Group',
    urgency: 'Urgency',
    location: 'Location',
    contactPerson: 'Contact Person',
    contactNumber: 'Contact Number',
    unitsNeeded: 'Units Needed',
    additionalInfo: 'Additional Information',
    critical: 'Critical',
    urgent: 'Urgent',
    moderate: 'Moderate',
    bloodRequest: 'Blood Request',
    findDonors: 'Find blood donors in your area quickly',
    
    // Ambulance request
    pickupLocation: 'Pickup Location',
    destination: 'Destination',
    patientCondition: 'Patient Condition',
    specialRequirements: 'Special Requirements',
    ambulanceRequest: 'Ambulance Request',
    emergencyUrgency: 'Emergency',
    scheduled: 'Scheduled',
    dispatching: 'Dispatching',
    enRoute: 'En Route',
    
    // Status & Progress
    active: 'Active',
    completed: 'Completed',
    pending: 'Pending',
    progress: 'Progress',
    responses: 'responses',
    estimatedTime: 'Estimated Time',
    
    // Forms
    required: 'Required',
    optional: 'Optional',
    selectBloodGroup: 'Select blood group',
    selectUrgency: 'Select urgency',
    enterLocation: 'Enter location',
    enterName: 'Enter name',
    enterPhone: 'Enter phone number',
    
    // Messages
    bloodRequestSubmitted: 'Blood Request Submitted',
    ambulanceRequested: 'Ambulance Requested',
    requestSubmitted: 'Your request has been submitted',
    helpOnWay: 'Help is on the way',
    
    // Dashboard titles
    patientDashboard: 'Patient Dashboard',
    donorDashboard: 'Donor Dashboard',
    driverDashboard: 'Driver Dashboard',
    donorDirectory: 'Donor Directory',
    
    // Common phrases
    noActiveRequests: 'No active requests',
    emergencyRequestsAppear: 'Your emergency requests will appear here',
    trackLive: 'Track Live',
    callDriver: 'Call Driver',
    viewResponses: 'View Responses',
    
    // Additional form fields
    enterDestination: 'Enter destination hospital',
    describeCondition: 'Describe the patient\'s condition...',
    anySpecialRequirements: 'Any special medical equipment or requirements...',
    lifeThreatening: 'Life-threatening',
    immediateCare: 'Immediate care needed',
    scheduledTransport: 'Scheduled Transport',
    bloodRequestDescription: 'Find blood donors in your area quickly',
    ambulanceRequestDescription: 'Get emergency medical transport'
  },
  ne: {
    // Navigation & Auth
    welcome: 'स्वागतम्',
    login: 'लगइन',
    logout: 'लगआउट',
    dashboard: 'ड्यासबोर्ड',
    directory: 'डाइरेक्टरी',
    profile: 'प्रोफाइल',
    help: 'सहायता',
    analytics: 'एनालिटिक्स',
    emergency: 'आपातकाल',
    settings: 'सेटिङ्गहरू',
    map: 'नक्सा',
    
    // User roles
    donor: 'दाता',
    driver: 'चालक',
    patient: 'बिरामी',
    
    // Common actions
    submit: 'पेश गर्नुहोस्',
    cancel: 'रद्द गर्नुहोस्',
    save: 'सेभ गर्नुहोस्',
    edit: 'सम्पादन गर्नुहोस्',
    delete: 'मेटाउनुहोस्',
    view: 'हेर्नुहोस्',
    search: 'खोज्नुहोस्',
    filter: 'फिल्टर गर्नुहोस्',
    call: 'फोन गर्नुहोस्',
    navigate: 'नेभिगेट गर्नुहोस्',
    
    // Emergency actions
    requestBlood: 'रगत माग्नुहोस्',
    requestAmbulance: 'एम्बुलेन्स माग्नुहोस्',
    emergencyActions: 'आपातकालीन कार्यहरू',
    activeRequests: 'सक्रिय अनुरोधहरू',
    
    // Blood request
    bloodGroup: 'रगत समूह',
    urgency: 'जरुरीता',
    location: 'स्थान',
    contactPerson: 'सम्पर्क व्यक्ति',
    contactNumber: 'सम्पर्क नम्बर',
    unitsNeeded: 'आवश्यक एकाइ',
    additionalInfo: 'थप जानकारी',
    critical: 'गम्भीर',
    urgent: 'जरुरी',
    moderate: 'मध्यम',
    bloodRequest: 'रगत अनुरोध',
    findDonors: 'तपाईंको क्षेत्रमा रगत दाताहरू छिट्टै फेला पार्नुहोस्',
    
    // Ambulance request
    pickupLocation: 'उठाउने स्थान',
    destination: 'गन्तव्य',
    patientCondition: 'बिरामीको अवस्था',
    specialRequirements: 'विशेष आवश्यकताहरू',
    ambulanceRequest: 'एम्बुलेन्स अनुरोध',
    emergencyUrgency: 'आपातकाल',
    scheduled: 'तालिकाबद्ध',
    dispatching: 'पठाउँदै',
    enRoute: 'बाटोमा',
    
    // Status & Progress
    active: 'सक्रिय',
    completed: 'पूरा भएको',
    pending: 'बाँकी',
    progress: 'प्रगति',
    responses: 'जवाफहरू',
    estimatedTime: 'अनुमानित समय',
    
    // Forms
    required: 'आवश्यक',
    optional: 'वैकल्पिक',
    selectBloodGroup: 'रगत समूह छान्नुहोस्',
    selectUrgency: 'जरुरीता छान्नुहोस्',
    enterLocation: 'स्थान प्रविष्ट गर्नुहोस्',
    enterName: 'नाम प्रविष्ट गर्नुहोस्',
    enterPhone: 'फोन नम्बर प्रविष्ट गर्नुहोस्',
    
    // Messages
    bloodRequestSubmitted: 'रगत अनुरोध पेश गरियो',
    ambulanceRequested: 'एम्बुलेन्स अनुरोध गरियो',
    requestSubmitted: 'तपाईंको अनुरोध पेश गरियो',
    helpOnWay: 'सहायता आउँदैछ',
    
    // Dashboard titles
    patientDashboard: 'बिरामी ड्यासबोर्ड',
    donorDashboard: 'दाता ड्यासबोर्ड',
    driverDashboard: 'चालक ड्यासबोर्ड',
    donorDirectory: 'दाता डाइरेक्टरी',
    
    // Common phrases
    noActiveRequests: 'कुनै सक्रिय अनुरोधहरू छैनन्',
    emergencyRequestsAppear: 'तपाईंका आपातकालीन अनुरोधहरू यहाँ देखा पर्नेछन्',
    trackLive: 'लाइभ ट्र्याक गर्नुहोस्',
    callDriver: 'चालकलाई फोन गर्नुहोस्',
    viewResponses: 'जवाफहरू हेर्नुहोस्',
    
    // Additional form fields
    enterDestination: 'गन्तव्य अस्पताल प्रविष्ट गर्नुहोस्',
    describeCondition: 'बिरामीको अवस्थाको वर्णन गर्नुहोस्...',
    anySpecialRequirements: 'कुनै विशेष चिकित्सा उपकरण वा आवश्यकताहरू...',
    lifeThreatening: 'जीवनलाई खतरा',
    immediateCare: 'तुरुन्त हेरचाह आवश्यक',
    scheduledTransport: 'तालिकाबद्ध यातायात',
    bloodRequestDescription: 'तपाईंको क्षेत्रमा रगत दाताहरू छिट्टै फेला पार्नुहोस्',
    ambulanceRequestDescription: 'आपातकालीन चिकित्सा यातायात प्राप्त गर्नुहोस्'
  }
};

export const useTranslation = () => {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ne'>(() => {
    const saved = localStorage.getItem('bloodconnect_language');
    return (saved as 'en' | 'ne') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('bloodconnect_language', currentLanguage);
  }, [currentLanguage]);

  const t = (key: TranslationKey): string => {
    return translations[currentLanguage][key] || key;
  };

  const changeLanguage = (lang: 'en' | 'ne') => {
    setCurrentLanguage(lang);
  };

  return {
    t,
    currentLanguage,
    changeLanguage
  };
};
