
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  Book, 
  Video, 
  FileText, 
  Star,
  Heart,
  Truck,
  Users,
  Shield,
  Clock,
  MapPin
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HelpSupport = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const faqs = [
    {
      category: 'blood',
      question: 'How do I request blood in an emergency?',
      answer: 'Go to your dashboard and click "Request Blood". Fill out the urgent request form with blood type, location, and contact details. The system will immediately notify nearby compatible donors.'
    },
    {
      category: 'blood',
      question: 'Who can donate blood to whom?',
      answer: 'Blood compatibility is important: O- is universal donor, AB+ is universal recipient. O+ can donate to A+, B+, AB+, O+. A+ can donate to A+, AB+. B+ can donate to B+, AB+. AB+ can only donate to AB+.'
    },
    {
      category: 'ambulance',
      question: 'How quickly will an ambulance arrive?',
      answer: 'Our average response time is 8-15 minutes depending on location and traffic. Emergency cases are prioritized. You can track your ambulance in real-time once dispatched.'
    },
    {
      category: 'ambulance',
      question: 'What information do I need to request an ambulance?',
      answer: 'You need: pickup location, destination hospital, patient condition, contact person details, and any special medical requirements. The more details you provide, the better we can help.'
    },
    {
      category: 'general',
      question: 'How do I become a blood donor?',
      answer: 'Sign up as a donor, complete your profile with blood type and medical history. You must be 18-65 years old, weigh at least 50kg, and be in good health. Regular health checks are required.'
    },
    {
      category: 'general',
      question: 'Is my personal information safe?',
      answer: 'Yes, we use encryption and follow medical privacy standards. Your information is only shared with verified medical professionals and donors/drivers when you make a request.'
    },
    {
      category: 'rewards',
      question: 'How do I earn reward points?',
      answer: 'Earn points by: donating blood (100 points), responding to emergency requests (50 points), completing profile (25 points), and referring friends (75 points).'
    },
    {
      category: 'technical',
      question: 'The app is not working properly, what should I do?',
      answer: 'Try refreshing the page, check your internet connection, clear browser cache, or restart the app. If issues persist, contact our support team with details about the problem.'
    }
  ];

  const tutorials = [
    {
      title: 'How to Request Blood',
      description: 'Step-by-step guide to requesting blood in emergency situations',
      duration: '3 min',
      type: 'video',
      icon: Heart
    },
    {
      title: 'Using the Ambulance Service',
      description: 'Complete guide to requesting and tracking ambulance services',
      duration: '5 min',
      type: 'video',
      icon: Truck
    },
    {
      title: 'Becoming a Blood Donor',
      description: 'Everything you need to know about blood donation process',
      duration: '4 min',
      type: 'article',
      icon: Users
    },
    {
      title: 'Safety and Privacy',
      description: 'Understanding how we protect your personal information',
      duration: '2 min',
      type: 'article',
      icon: Shield
    }
  ];

  const emergencyContacts = [
    {
      name: 'Emergency Helpline',
      number: '100',
      description: 'National emergency number',
      available: '24/7'
    },
    {
      name: 'Blood Bank Dharan',
      number: '+977-25-520045',
      description: 'Dharan Blood Bank direct line',
      available: '24/7'
    },
    {
      name: 'BP Koirala Hospital',
      number: '+977-25-525555',
      description: 'Main hospital emergency',
      available: '24/7'
    },
    {
      name: 'BloodConnect Support',
      number: '+977-25-520100',
      description: 'Technical support and help',
      available: '9 AM - 6 PM'
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Message Sent",
      description: "We'll get back to you within 24 hours.",
    });
    
    // Reset form
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: '',
      category: 'general'
    });
  };

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Quick Help Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Phone className="h-8 w-8 text-red-600 mx-auto mb-3" />
            <h3 className="font-medium mb-2">Emergency Call</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Call 100 for immediate help</p>
            <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">
              Call Now
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-medium mb-2">Live Chat</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Chat with our support team</p>
            <Button size="sm" variant="outline" className="w-full">
              Start Chat
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Video className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-medium mb-2">Video Tutorials</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Learn how to use the app</p>
            <Button size="sm" variant="outline" className="w-full">
              Watch Now
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Book className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-medium mb-2">User Guide</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Complete documentation</p>
            <Button size="sm" variant="outline" className="w-full">
              Read Guide
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Help Content */}
      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="emergency">Emergency</TabsTrigger>
        </TabsList>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <HelpCircle className="h-5 w-5 text-blue-600" />
                <span>Frequently Asked Questions</span>
              </CardTitle>
              <CardDescription>
                Find answers to common questions about BloodConnect
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search FAQs */}
              <div className="relative">
                <Input
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
                <HelpCircle className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              </div>

              {/* FAQ Categories */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">All</Badge>
                <Badge variant="outline">Blood Donation</Badge>
                <Badge variant="outline">Ambulance</Badge>
                <Badge variant="outline">General</Badge>
                <Badge variant="outline">Technical</Badge>
              </div>

              {/* FAQ List */}
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs">
                          {faq.category}
                        </Badge>
                        <span>{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tutorials Tab */}
        <TabsContent value="tutorials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Video className="h-5 w-5 text-green-600" />
                <span>Video Tutorials & Guides</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tutorials.map((tutorial, index) => {
                  const Icon = tutorial.icon;
                  return (
                    <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-3">
                        <Icon className="h-8 w-8 text-blue-600 mt-1" />
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{tutorial.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                            {tutorial.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">
                                {tutorial.type}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {tutorial.duration}
                              </span>
                            </div>
                            <Button size="sm">
                              {tutorial.type === 'video' ? 'Watch' : 'Read'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-purple-600" />
                  <span>Send us a Message</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  Other ways to reach our support team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">support@bloodconnect.np</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">+977-25-520100</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="font-medium">Office Address</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      BloodConnect Nepal<br />
                      Dharan-8, Sunsari<br />
                      Nepal
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium">Support Hours</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Mon-Fri: 9 AM - 6 PM<br />
                      Emergency: 24/7
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Emergency Tab */}
        <TabsContent value="emergency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-600">
                <Phone className="h-5 w-5" />
                <span>Emergency Contacts</span>
              </CardTitle>
              <CardDescription>
                Important numbers for emergency situations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{contact.name}</h4>
                      <Badge variant="outline">{contact.available}</Badge>
                    </div>
                    <p className="text-2xl font-bold text-red-600 mb-2">{contact.number}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {contact.description}
                    </p>
                    <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emergency Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Emergency Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-medium text-red-600">Medical Emergency</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Call 100 immediately. If conscious, note symptoms, allergies, and current medications. 
                    Stay calm and provide exact location.
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-medium text-orange-600">Blood Emergency</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Use the app to request blood immediately. Contact blood bank directly if life-threatening. 
                    Know the patient's blood type and location.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-blue-600">Ambulance Needed</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Request through app or call directly. Provide exact pickup location, destination, 
                    and patient condition. Clear the path for ambulance arrival.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HelpSupport;
