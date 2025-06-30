
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, MessageSquare, Phone, Send } from 'lucide-react';

const HelpSupport = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Support request submitted:', contactForm);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Quick Help */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="p-6">
            <Phone className="h-8 w-8 mx-auto mb-4 text-red-600" />
            <h3 className="font-semibold mb-2">Emergency Hotline</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              24/7 emergency support
            </p>
            <Button className="bg-red-600 hover:bg-red-700">
              Call +977-025-520000
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <MessageSquare className="h-8 w-8 mx-auto mb-4 text-blue-600" />
            <h3 className="font-semibold mb-2">Live Chat</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Chat with our support team
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Start Chat
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <HelpCircle className="h-8 w-8 mx-auto mb-4 text-green-600" />
            <h3 className="font-semibold mb-2">FAQ</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Find answers to common questions
            </p>
            <Button className="bg-green-600 hover:bg-green-700">
              View FAQ
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>
            Find answers to common questions about BloodConnect
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I register as a blood donor?</AccordionTrigger>
              <AccordionContent>
                To register as a blood donor, create an account and select "Blood Donor" as your role. 
                You'll need to provide your blood group and contact information. Once verified, 
                you'll start receiving notifications about blood requests in your area.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>How do I request blood or an ambulance?</AccordionTrigger>
              <AccordionContent>
                Patients can request blood or ambulance services through their dashboard. 
                Fill out the emergency request form with details about the urgency, location, 
                and contact information. Our system will immediately notify nearby donors or drivers.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>How do reward points work?</AccordionTrigger>
              <AccordionContent>
                Blood donors earn reward points for each successful donation. Points can be 
                redeemed for healthcare benefits, gift vouchers, or donated to charity. 
                The more you donate, the more points you earn and the higher your status becomes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>How is my privacy protected?</AccordionTrigger>
              <AccordionContent>
                We take privacy seriously. Your personal information is encrypted and only 
                shared with relevant parties during emergencies. You can control your 
                notification preferences and data sharing settings in your profile.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>What should I do in case of a medical emergency?</AccordionTrigger>
              <AccordionContent>
                For life-threatening emergencies, always call 102 (Nepal Emergency Number) first. 
                Use BloodConnect for non-critical blood requests and ambulance services. 
                Our emergency hotline +977-025-520000 is available 24/7 for urgent assistance.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
          <CardDescription>
            Send us a message and we'll get back to you as soon as possible
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="support-name">Name</Label>
                <Input
                  id="support-name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="support-email">Email</Label>
                <Input
                  id="support-email"
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="support-subject">Subject</Label>
              <Input
                id="support-subject"
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="support-message">Message</Label>
              <Textarea
                id="support-message"
                rows={5}
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpSupport;
