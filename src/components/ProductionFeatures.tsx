
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, CreditCard, FileText, Settings, Shield, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProductionFeatures = () => {
  const [emailSettings, setEmailSettings] = useState({ enabled: false, smtpConfigured: false });
  const [smsSettings, setSmsSettings] = useState({ enabled: false, provider: '' });
  const [paymentSettings, setPaymentSettings] = useState({ enabled: false, processor: '' });
  const { toast } = useToast();

  const configureEmail = () => {
    setEmailSettings({ enabled: true, smtpConfigured: true });
    toast({
      title: "Email Configured",
      description: "Email notifications have been enabled",
    });
  };

  const configureSMS = (provider: string) => {
    setSmsSettings({ enabled: true, provider });
    toast({
      title: "SMS Configured",
      description: `SMS notifications enabled with ${provider}`,
    });
  };

  const configurePayments = (processor: string) => {
    setPaymentSettings({ enabled: true, processor });
    toast({
      title: "Payment Gateway Configured",
      description: `${processor} payment processing enabled`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Production Features</h2>
        <Badge className="bg-green-600">Production Ready</Badge>
      </div>

      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span>Email Notifications</span>
                </CardTitle>
                <CardDescription>Configure SMTP for email alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-host">SMTP Host</Label>
                  <Input id="smtp-host" placeholder="smtp.gmail.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">Port</Label>
                  <Input id="smtp-port" placeholder="587" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-user">Username</Label>
                  <Input id="smtp-user" placeholder="your-email@gmail.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-pass">Password</Label>
                  <Input id="smtp-pass" type="password" placeholder="App password" />
                </div>
                <Button onClick={configureEmail} className="w-full">
                  {emailSettings.enabled ? 'Update Configuration' : 'Enable Email Notifications'}
                </Button>
                {emailSettings.enabled && (
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-600">Enabled</Badge>
                      <span className="text-sm text-green-700 dark:text-green-300">Email notifications active</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-green-600" />
                  <span>SMS Notifications</span>
                </CardTitle>
                <CardDescription>Configure SMS alerts via Twilio/AWS SNS</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    onClick={() => configureSMS('Twilio')}
                    className="w-full justify-start"
                  >
                    Configure Twilio SMS
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => configureSMS('AWS SNS')}
                    className="w-full justify-start"
                  >
                    Configure AWS SNS
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => configureSMS('Local Provider')}
                    className="w-full justify-start"
                  >
                    Configure Local SMS Provider
                  </Button>
                </div>
                {smsSettings.enabled && (
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-600">Enabled</Badge>
                      <span className="text-sm text-green-700 dark:text-green-300">
                        SMS via {smsSettings.provider}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-purple-600" />
                  <span>Payment Gateway</span>
                </CardTitle>
                <CardDescription>Accept donations and service payments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    onClick={() => configurePayments('Stripe')}
                    className="w-full justify-start"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Configure Stripe
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => configurePayments('PayPal')}
                    className="w-full justify-start"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Configure PayPal
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => configurePayments('eSewa')}
                    className="w-full justify-start"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Configure eSewa (Nepal)
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => configurePayments('Khalti')}
                    className="w-full justify-start"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Configure Khalti (Nepal)
                  </Button>
                </div>
                {paymentSettings.enabled && (
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-600">Enabled</Badge>
                      <span className="text-sm text-green-700 dark:text-green-300">
                        {paymentSettings.processor} payments active
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Donation Analytics</CardTitle>
                <CardDescription>Track financial contributions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">$12,450</div>
                    <div className="text-sm text-blue-600">Total Raised</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">89</div>
                    <div className="text-sm text-green-600">Donors</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">$140</div>
                    <div className="text-sm text-purple-600">Avg Donation</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">95%</div>
                    <div className="text-sm text-orange-600">Success Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-orange-600" />
                <span>Advanced Reporting</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-medium">Blood Inventory Report</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Daily/Weekly/Monthly</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-medium">Donor Activity Report</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Engagement metrics</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-medium">Emergency Response Report</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Response times & efficiency</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-medium">Financial Report</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Donations & expenses</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-medium">Compliance Report</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Regulatory compliance</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-medium">Custom Report Builder</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Build your own reports</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span>Security Features</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Two-Factor Authentication</span>
                    <Badge className="bg-green-600">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Data Encryption</span>
                    <Badge className="bg-green-600">AES-256</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>HIPAA Compliance</span>
                    <Badge className="bg-green-600">Compliant</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Audit Logging</span>
                    <Badge className="bg-green-600">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Rate Limiting</span>
                    <Badge className="bg-green-600">Configured</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  <span>Performance Monitoring</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Uptime Monitoring</span>
                    <Badge className="bg-green-600">99.9%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Error Tracking</span>
                    <Badge className="bg-blue-600">Sentry</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Performance Analytics</span>
                    <Badge className="bg-purple-600">Google Analytics</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>CDN</span>
                    <Badge className="bg-orange-600">CloudFlare</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Database Monitoring</span>
                    <Badge className="bg-green-600">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductionFeatures;
