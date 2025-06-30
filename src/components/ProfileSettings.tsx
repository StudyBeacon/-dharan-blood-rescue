
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  User, Phone, Mail, MapPin, Heart, Bell, Moon, Sun, 
  Shield, Download, Upload, Save, Edit, Star 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import LoadingSpinner from '@/components/LoadingSpinner';

interface ProfileSettingsProps {
  user: any;
  onUpdate: (user: any) => void;
  onDarkModeToggle: () => void;
  darkMode: boolean;
}

const ProfileSettings = ({ user, onUpdate, onDarkModeToggle, darkMode }: ProfileSettingsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    bloodGroup: user.bloodGroup || '',
    location: user.location || '',
    bio: user.bio || '',
    emergencyContact: user.emergencyContact || '',
    medicalConditions: user.medicalConditions || ''
  });

  const [notifications, setNotifications] = useState({
    bloodRequests: true,
    ambulanceAlerts: true,
    rewardUpdates: true,
    systemNotifications: true,
    emailNotifications: false,
    smsNotifications: true
  });

  const [privacy, setPrivacy] = useState({
    showProfile: true,
    showLocation: true,
    showPhone: false,
    showDonationHistory: true
  });

  const { toast } = useToast();

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const updatedUser = { ...user, ...formData };
      onUpdate(updatedUser);
      localStorage.setItem('bloodconnect_user', JSON.stringify(updatedUser));
      
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportData = () => {
    const data = {
      profile: formData,
      notifications,
      privacy,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bloodconnect-profile-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Data Exported",
      description: "Your profile data has been downloaded.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Profile Header */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <CardTitle className="dark:text-white">{user.name}</CardTitle>
                <CardDescription className="dark:text-gray-300">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)} • {user.email}
                </CardDescription>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                    {user.bloodGroup || 'Not specified'}
                  </Badge>
                  {user.role === 'donor' && (
                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      <Star className="h-3 w-3 mr-1" />
                      1250 Points
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Edit className="h-4 w-4" />
              <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Personal Information */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 dark:text-white">
            <User className="h-5 w-5 text-blue-600" />
            <span>Personal Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="dark:text-gray-200">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                disabled={!isEditing}
                className="dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="dark:text-gray-200">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                disabled={!isEditing}
                className="dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="dark:text-gray-200">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                disabled={!isEditing}
                className="dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="blood-group" className="dark:text-gray-200">Blood Group</Label>
              <Select
                value={formData.bloodGroup}
                onValueChange={(value) => setFormData({...formData, bloodGroup: value})}
                disabled={!isEditing}
              >
                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="dark:text-gray-200">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              disabled={!isEditing}
              placeholder="Your current location"
              className="dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="dark:text-gray-200">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              disabled={!isEditing}
              placeholder="Tell us about yourself..."
              className="dark:bg-gray-700 dark:border-gray-600"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="emergency-contact" className="dark:text-gray-200">Emergency Contact</Label>
              <Input
                id="emergency-contact"
                value={formData.emergencyContact}
                onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                disabled={!isEditing}
                placeholder="Emergency contact number"
                className="dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medical-conditions" className="dark:text-gray-200">Medical Conditions</Label>
              <Input
                id="medical-conditions"
                value={formData.medicalConditions}
                onChange={(e) => setFormData({...formData, medicalConditions: e.target.value})}
                disabled={!isEditing}
                placeholder="Any medical conditions"
                className="dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex space-x-2 pt-4">
              <Button 
                onClick={handleSave} 
                className="flex items-center space-x-2"
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner size="sm" /> : <Save className="h-4 w-4" />}
                <span>Save Changes</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 dark:text-white">
            <Bell className="h-5 w-5 text-green-600" />
            <span>Notification Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base dark:text-gray-200">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </Label>
              </div>
              <Switch
                checked={value}
                onCheckedChange={(checked) => 
                  setNotifications({...notifications, [key]: checked})
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 dark:text-white">
            <Shield className="h-5 w-5 text-purple-600" />
            <span>Privacy Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(privacy).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base dark:text-gray-200">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </Label>
              </div>
              <Switch
                checked={value}
                onCheckedChange={(checked) => 
                  setPrivacy({...privacy, [key]: checked})
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Appearance & Data */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 dark:text-white">
            {darkMode ? <Moon className="h-5 w-5 text-blue-600" /> : <Sun className="h-5 w-5 text-yellow-600" />}
            <span>Appearance & Data</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base dark:text-gray-200">Dark Mode</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">Toggle dark theme</p>
            </div>
            <Switch
              checked={darkMode}
              onCheckedChange={onDarkModeToggle}
            />
          </div>

          <div className="flex space-x-2 pt-4">
            <Button variant="outline" onClick={handleExportData} className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Data</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Import Data</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettings;
