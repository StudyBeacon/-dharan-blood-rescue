
import { useState, useEffect } from 'react';

interface Translations {
  [key: string]: {
    en: string;
    ne: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.dashboard': {
    en: 'Dashboard',
    ne: 'ड्यासबोर्ड'
  },
  'nav.directory': {
    en: 'Donor Directory',
    ne: 'दाता निर्देशिका'
  },
  'nav.profile': {
    en: 'Profile',
    ne: 'प्रोफाइल'
  },
  'nav.help': {
    en: 'Help',
    ne: 'सहायता'
  },
  'nav.rewards': {
    en: 'Rewards',
    ne: 'पुरस्कार'
  },

  // Common actions
  'common.login': {
    en: 'Login',
    ne: 'लगइन'
  },
  'common.signup': {
    en: 'Sign Up',
    ne: 'साइन अप'
  },
  'common.logout': {
    en: 'Logout',
    ne: 'लगआउट'
  },
  'common.save': {
    en: 'Save',
    ne: 'सुरक्षित गर्नुहोस्'
  },
  'common.cancel': {
    en: 'Cancel',
    ne: 'रद्द गर्नुहोस्'
  },
  'common.submit': {
    en: 'Submit',
    ne: 'पेश गर्नुहोस्'
  },
  'common.search': {
    en: 'Search',
    ne: 'खोज्नुहोस्'
  },
  'common.filter': {
    en: 'Filter',
    ne: 'फिल्टर'
  },

  // Blood donation
  'blood.request': {
    en: 'Request Blood',
    ne: 'रगत माग्नुहोस्'
  },
  'blood.donate': {
    en: 'Donate Blood',
    ne: 'रगत दान गर्नुहोस्'
  },
  'blood.group': {
    en: 'Blood Group',
    ne: 'रगत समूह'
  },
  'blood.urgent': {
    en: 'Urgent',
    ne: 'जरुरी'
  },
  'blood.critical': {
    en: 'Critical',
    ne: 'अति जरुरी'
  },

  // Ambulance
  'ambulance.request': {
    en: 'Request Ambulance',
    ne: 'एम्बुलेन्स माग्नुहोस्'
  },
  'ambulance.emergency': {
    en: 'Emergency',
    ne: 'आकस्मिक'
  },
  'ambulance.pickup': {
    en: 'Pickup Location',
    ne: 'उठाउने ठाउँ'
  },
  'ambulance.destination': {
    en: 'Destination',
    ne: 'गन्तव्य'
  },

  // User roles
  'role.donor': {
    en: 'Blood Donor',
    ne: 'रक्तदाता'
  },
  'role.driver': {
    en: 'Ambulance Driver',
    ne: 'एम्बुलेन्स ड्राइभर'
  },
  'role.patient': {
    en: 'Patient',
    ne: 'बिरामी'
  },

  // Forms
  'form.name': {
    en: 'Full Name',
    ne: 'पूरा नाम'
  },
  'form.email': {
    en: 'Email',
    ne: 'इमेल'
  },
  'form.phone': {
    en: 'Phone Number',
    ne: 'फोन नम्बर'
  },
  'form.password': {
    en: 'Password',
    ne: 'पासवर्ड'
  },
  'form.address': {
    en: 'Address',
    ne: 'ठेगाना'
  },

  // Status
  'status.available': {
    en: 'Available',
    ne: 'उपलब्ध'
  },
  'status.busy': {
    en: 'Busy',
    ne: 'व्यस्त'
  },
  'status.active': {
    en: 'Active',
    ne: 'सक्रिय'
  },
  'status.completed': {
    en: 'Completed',
    ne: 'सम्पन्न'
  },

  // Notifications
  'notification.new_request': {
    en: 'New blood request received',
    ne: 'नयाँ रगत अनुरोध प्राप्त भयो'
  },
  'notification.request_accepted': {
    en: 'Your request has been accepted',
    ne: 'तपाईंको अनुरोध स्वीकार गरिएको छ'
  },
  'notification.ambulance_dispatched': {
    en: 'Ambulance has been dispatched',
    ne: 'एम्बुलेन्स पठाइएको छ'
  },

  // Welcome messages
  'welcome.donor': {
    en: 'Welcome back, Hero!',
    ne: 'फिर्ता स्वागत छ, नायक!'
  },
  'welcome.driver': {
    en: 'Ready to save lives today?',
    ne: 'आज जीवन बचाउन तयार हुनुहुन्छ?'
  },
  'welcome.patient': {
    en: 'We are here to help you',
    ne: 'हामी तपाईंलाई मद्दत गर्न यहाँ छौं'
  }
};

export const useTranslation = () => {
  const [language, setLanguage] = useState<'en' | 'ne'>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('bloodconnect_language') as 'en' | 'ne';
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const t = (key: string): string => {
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  const changeLanguage = (newLanguage: 'en' | 'ne') => {
    setLanguage(newLanguage);
    localStorage.setItem('bloodconnect_language', newLanguage);
  };

  return {
    t,
    language,
    changeLanguage,
    isNepali: language === 'ne'
  };
};
