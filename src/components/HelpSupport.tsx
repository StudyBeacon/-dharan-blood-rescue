
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { 
  HelpCircle, MessageCircle, Phone, Mail, FileText, 
  AlertTriangle, Heart, Truck, Star, Users, Send,
  ExternalLink, Book, Video
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import LoadingSpinner from '@/components/LoadingSpinner';

const HelpSupport = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [supportForm, setSupportForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const { toast } = useToast();

  const faqData = [
    {
      category: 'Blood Donation',
      questions: [
        {
          question: 'How often can I donate blood?',
          answer: 'You can donate blood every 56 days (8 weeks). This allows your body time to replenish the donated blood cells.'
        },
        {
          question: 'What are the requirements to donate blood?',
          answer: 'You must be 18-65 years old, weigh at least 45kg, be in good health, and not have donated blood in the last 56 days.'
        },
        {
          question: 'How do I request blood from donors?',
          answer: 'Use the "Request Blood" feature in your patient dashboard. Fill out the form with your requirements and urgency level.'
        }
      ]
    },
    {
      category: 'Ambulance Services',
      questions: [
        {
          question: 'How quickly will an ambulance arrive?',
          answer: 'Response times vary based on location and traffic, but emergency ambulances typically arrive within 8-15 minutes in Dharan city.'
        },
        {
          question: 'What information should I provide when requesting an ambulance?',
          answer: 'Provide exact pickup location, destination hospital, patient condition, contact number, and any special requirements.'
        },
        {
          question: 'Can I track the ambulance in real-time?',
          answer: 'Yes, once dispatched, you can track the ambulance location and estimated arrival time through the app.'
        }
      ]
    },
    {
      category: 'Rewards & Points',
      questions: [
        {
          question: 'How do I earn reward points?',
          answer: 'Earn points by donating blood (100 points), responding to emergency requests (50 points), and helping other users (25 points).'
        },
        {
          question: 'What can I redeem with my points?',
          answer: 'Points can be redeemed for health checkups, medical consultations, priority ambulance services, and gift vouchers.'
        },
        {
          question: 'Do reward points expire?',
          answer: 'Points are valid for 2 years from the date of earning. Use them before they expire!'
        }
      ]
    },
    {
      category: 'Account & Privacy',
      questions: [
        {
          question: 'How do I update my profile information?',
          answer: 'Go to Profile & Settings from the navigation menu. Click "Edit Profile" to update your information.'
        },
        {
          question: 'Is my personal information secure?',
          answer: 'Yes, we use advanced encryption and follow medical data privacy standards to protect your information.'
        },
        {
          question: 'Can I control who sees my information?',
          answer: 'Yes, use Privacy Settings to control visibility of your profile, location, phone number, and donation history.'
        }
      ]
    }
  ];

  const emergencyContacts = [
    {
      name: 'Emergency Ambulance',
      number: '102',
      description: 'National emergency ambulance service'
    },
    {
      name: 'Police Emergency',
      number: '100',
      description: 'Police emergency hotline'
    },
    {
      name: 'Fire Service',
      number: '101',
      description: 'Fire and rescue services'
    },
    {
      name: 'BP Koirala Health Science',
      number: '025-525555',
      description: 'Main hospital emergency department'
    },
    {
      name: 'Dharan Hospital',
      number: '025-520982',
      description: 'City hospital emergency services'
    }
  ];

  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Support Request Sent",
        description: "We'll get back to you within 24 hours.",
      });

      setSupportForm({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send support request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Emergency Contacts */}
      <Card className="border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-700 dark:text-red-300">
            <AlertTriangle className="h-5 w-5" />
            <span>Emergency Contacts</span>
          </CardTitle>
          <CardDescription className="dark:text-red-200">
            Quick access to emergency services in Dharan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                <h4 className="font-semibold dark:text-white">{contact.name}</h4>
                <div className="flex items-center space-x-2 mt-2">
                  <Phone className="h-4 w-4 text-red-600" />
                  <span className="font-mono text-lg text-red-600 dark:text-red-400">{contact.number}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{contact.description}</p>
                <Button size="sm" className="mt-3 w-full bg-red-600 hover:bg-red-700">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-all duration-300 hover-scale dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-6 text-center">
            <Book className="h-8 w-8 mx-auto mb-3 text-blue-600" />
            <h3 className="font-semibold dark:text-white">User Guide</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Learn how to use the app</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover-scale dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-6 text-center">
            <Video className="h-8 w-8 mx-auto mb-3 text-green-600" />
            <h3 className="font-semibold dark:text-white">Video Tutorials</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Watch step-by-step guides</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover-scale dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-6 text-center">
            <MessageCircle className="h-8 w-8 mx-auto mb-3 text-purple-600" />
            <h3 className="font-semibold dark:text-white">Live Chat</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Chat with support team</p>
            <Badge className="mt-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Online
            </Badge>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover-scale dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-6 text-center">
            <ExternalLink className="h-8 w-8 mx-auto mb-3 text-orange-600" />
            <h3 className="font-semibold dark:text-white">Community</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Join our user community</p>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 dark:text-white">
            <HelpCircle className="h-5 w-5 text-blue-600" />
            <span>Frequently Asked Questions</span>
          </CardTitle>
          <CardDescription className="dark:text-gray-300">
            Find answers to common questions about BloodConnect
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-6">
                <h3 className="font-semibold text-lg mb-3 dark:text-white flex items-center space-x-2">
                  {category.category === 'Blood Donation' && <Heart className="h-5 w-5 text-red-600" />}
                  {category.category === 'Ambulance Services' && <Truck className="h-5 w-5 text-blue-600" />}
                  {category.category === 'Rewards & Points' && <Star className="h-5 w-5 text-yellow-600" />}
                  {category.category === 'Account & Privacy' && <Users className="h-5 w-5 text-green-600" />}
                  <span>{category.category}</span>
                </h3>
                {category.questions.map((faq, faqIndex) => (
                  <AccordionItem key={`${categoryIndex}-${faqIndex}`} value={`${categoryIndex}-${faqIndex}`}>
                    <AccordionTrigger className="dark:text-gray-200">{faq.question}</AccordionTrigger>
                    <AccordionContent className="dark:text-gray-300">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </div>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 dark:text-white">
            <MessageCircle className="h-5 w-5 text-green-600" />
            <span>Contact Support</span>
          </CardTitle>
          <CardDescription className="dark:text-gray-300">
            Can't find what you're looking for? Send us a message
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSupportSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="support-name" className="dark:text-gray-200">Name</Label>
                <Input
                  id="support-name"
                  value={supportForm.name}
                  onChange={(e) => setSupportForm({...supportForm, name: e.target.value})}
                  placeholder="Enter your name"
                  className="dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="support-email" className="dark:text-gray-200">Email</Label>
                <Input
                  id="support-email"
                  type="email"
                  value={supportForm.email}
                  onChange={(e) => setSupportForm({...supportForm, email: e.target.value})}
                  placeholder="Enter your email"
                  className="dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="support-subject" className="dark:text-gray-200">Subject</Label>
              <Input
                id="support-subject"
                value={supportForm.subject}
                onChange={(e) => setSupportForm({...supportForm, subject: e.target.value})}
                placeholder="Brief description of your issue"
                className="dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="support-message" className="dark:text-gray-200">Message</Label>
              <Textarea
                id="support-message"
                value={supportForm.message}
                onChange={(e) => setSupportForm({...supportForm, message: e.target.value})}
                placeholder="Describe your issue in detail..."
                className="dark:bg-gray-700 dark:border-gray-600"
                rows={5}
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner size="sm" /> : <Send className="h-4 w-4 mr-2" />}
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* App Information */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 dark:text-white">
            <FileText className="h-5 w-5 text-gray-600" />
            <span>App Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">v1.0.0</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Version</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">24/7</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Support</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">1000+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">4.8★</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Rating</div>
            </div>
          </div>

          <div className="pt-4 border-t dark:border-gray-600">
            <p className="text-center text-sm text-gray-600 dark:text-gray-300">
              BloodConnect Dharan Emergency System © 2024
            </p>
            <div className="flex justify-center space-x-4 mt-2">
              <Button variant="link" size="sm" className="text-blue-600 dark:text-blue-400">
                Privacy Policy
              </Button>
              <Button variant="link" size="sm" className="text-blue-600 dark:text-blue-400">
                Terms of Service
              </Button>
              <Button variant="link" size="sm" className="text-blue-600 dark:text-blue-400">
                About Us
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpSupport;
