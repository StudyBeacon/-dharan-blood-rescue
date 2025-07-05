
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Heart } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';

interface BloodRequestData {
  bloodGroup: string;
  urgency: string;
  location: string;
  contactPerson: string;
  contactNumber: string;
  additionalInfo: string;
  unitsNeeded: string;
}

interface BloodRequestFormProps {
  isVisible: boolean;
  isLoading: boolean;
  bloodRequest: BloodRequestData;
  onBloodRequestChange: (request: BloodRequestData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

const BloodRequestForm = ({ 
  isVisible, 
  isLoading, 
  bloodRequest, 
  onBloodRequestChange, 
  onSubmit, 
  onClose 
}: BloodRequestFormProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50 animate-fade-in">
      <Card className="w-full max-w-md max-h-[95vh] overflow-y-auto dark:bg-gray-800 m-2">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2 dark:text-white text-lg">
            <Heart className="h-5 w-5 text-red-600 fill-current" />
            <span>Request Blood</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="blood-group" className="dark:text-gray-200 text-sm">Blood Group Needed *</Label>
              <Select value={bloodRequest.bloodGroup} onValueChange={(value) => onBloodRequestChange({...bloodRequest, bloodGroup: value})} required>
                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 mobile-touch-target min-h-[44px]">
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
              <Label htmlFor="units-needed" className="dark:text-gray-200 text-sm">Units Needed</Label>
              <Select value={bloodRequest.unitsNeeded} onValueChange={(value) => onBloodRequestChange({...bloodRequest, unitsNeeded: value})}>
                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 mobile-touch-target min-h-[44px]">
                  <SelectValue placeholder="Select units" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Unit</SelectItem>
                  <SelectItem value="2">2 Units</SelectItem>
                  <SelectItem value="3">3 Units</SelectItem>
                  <SelectItem value="4">4 Units</SelectItem>
                  <SelectItem value="5+">5+ Units</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="urgency" className="dark:text-gray-200 text-sm">Urgency Level *</Label>
              <Select value={bloodRequest.urgency} onValueChange={(value) => onBloodRequestChange({...bloodRequest, urgency: value})} required>
                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 mobile-touch-target min-h-[44px]">
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
              <Label htmlFor="location" className="dark:text-gray-200 text-sm">Hospital/Location *</Label>
              <Input
                id="location"
                placeholder="Enter hospital or location"
                value={bloodRequest.location}
                onChange={(e) => onBloodRequestChange({...bloodRequest, location: e.target.value})}
                className="dark:bg-gray-700 dark:border-gray-600 mobile-touch-target min-h-[44px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-person" className="dark:text-gray-200 text-sm">Contact Person *</Label>
              <Input
                id="contact-person"
                placeholder="Enter contact person name"
                value={bloodRequest.contactPerson}
                onChange={(e) => onBloodRequestChange({...bloodRequest, contactPerson: e.target.value})}
                className="dark:bg-gray-700 dark:border-gray-600 mobile-touch-target min-h-[44px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-number" className="dark:text-gray-200 text-sm">Contact Number *</Label>
              <Input
                id="contact-number"
                type="tel"
                placeholder="Enter phone number"
                value={bloodRequest.contactNumber}
                onChange={(e) => onBloodRequestChange({...bloodRequest, contactNumber: e.target.value})}
                className="dark:bg-gray-700 dark:border-gray-600 mobile-touch-target min-h-[44px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="additional-info" className="dark:text-gray-200 text-sm">Additional Information</Label>
              <Textarea
                id="additional-info"
                placeholder="Any additional details..."
                value={bloodRequest.additionalInfo}
                onChange={(e) => onBloodRequestChange({...bloodRequest, additionalInfo: e.target.value})}
                className="dark:bg-gray-700 dark:border-gray-600 mobile-touch-target min-h-[88px]"
                rows={3}
              />
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose} 
                className="flex-1 mobile-touch-target min-h-[44px]"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-red-600 hover:bg-red-700 mobile-touch-target min-h-[44px]"
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner size="sm" /> : 'Submit Request'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BloodRequestForm;
