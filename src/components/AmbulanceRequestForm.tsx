
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Truck } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useTranslation } from '@/hooks/useTranslation';

interface AmbulanceRequestData {
  pickupLocation: string;
  destination: string;
  urgency: string;
  contactPerson: string;
  contactNumber: string;
  patientCondition: string;
  specialRequirements: string;
}

interface AmbulanceRequestFormProps {
  isVisible: boolean;
  isLoading: boolean;
  ambulanceRequest: AmbulanceRequestData;
  onAmbulanceRequestChange: (request: AmbulanceRequestData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

const AmbulanceRequestForm = ({ 
  isVisible, 
  isLoading, 
  ambulanceRequest, 
  onAmbulanceRequestChange, 
  onSubmit, 
  onClose 
}: AmbulanceRequestFormProps) => {
  const { t } = useTranslation();

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50 animate-fade-in">
      <Card className="w-full max-w-md max-h-[95vh] overflow-y-auto dark:bg-gray-800 m-2">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2 dark:text-white text-lg">
            <Truck className="h-5 w-5 text-blue-600" />
            <span>{t('requestAmbulance')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pickup-location" className="dark:text-gray-200 text-sm">{t('pickupLocation')} *</Label>
              <Input
                id="pickup-location"
                placeholder={t('enterLocation')}
                value={ambulanceRequest.pickupLocation}
                onChange={(e) => onAmbulanceRequestChange({...ambulanceRequest, pickupLocation: e.target.value})}
                className="dark:bg-gray-700 dark:border-gray-600 mobile-touch-target min-h-[44px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination" className="dark:text-gray-200 text-sm">{t('destination')} *</Label>
              <Input
                id="destination"
                placeholder={t('enterDestination')}
                value={ambulanceRequest.destination}
                onChange={(e) => onAmbulanceRequestChange({...ambulanceRequest, destination: e.target.value})}
                className="dark:bg-gray-700 dark:border-gray-600 mobile-touch-target min-h-[44px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ambulance-urgency" className="dark:text-gray-200 text-sm">{t('urgency')} *</Label>
              <Select value={ambulanceRequest.urgency} onValueChange={(value) => onAmbulanceRequestChange({...ambulanceRequest, urgency: value})} required>
                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 mobile-touch-target min-h-[44px]">
                  <SelectValue placeholder={t('selectUrgency')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emergency">{t('emergencyUrgency')} ({t('lifeThreatening')})</SelectItem>
                  <SelectItem value="urgent">{t('urgent')} ({t('immediateCare')})</SelectItem>
                  <SelectItem value="scheduled">{t('scheduledTransport')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ambulance-contact-person" className="dark:text-gray-200 text-sm">{t('contactPerson')} *</Label>
              <Input
                id="ambulance-contact-person"
                placeholder={t('enterName')}
                value={ambulanceRequest.contactPerson}
                onChange={(e) => onAmbulanceRequestChange({...ambulanceRequest, contactPerson: e.target.value})}
                className="dark:bg-gray-700 dark:border-gray-600 mobile-touch-target min-h-[44px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ambulance-contact-number" className="dark:text-gray-200 text-sm">{t('contactNumber')} *</Label>
              <Input
                id="ambulance-contact-number"
                type="tel"
                placeholder={t('enterPhone')}
                value={ambulanceRequest.contactNumber}
                onChange={(e) => onAmbulanceRequestChange({...ambulanceRequest, contactNumber: e.target.value})}
                className="dark:bg-gray-700 dark:border-gray-600 mobile-touch-target min-h-[44px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="patient-condition" className="dark:text-gray-200 text-sm">{t('patientCondition')} *</Label>
              <Textarea
                id="patient-condition"
                placeholder={t('describeCondition')}
                value={ambulanceRequest.patientCondition}
                onChange={(e) => onAmbulanceRequestChange({...ambulanceRequest, patientCondition: e.target.value})}
                className="dark:bg-gray-700 dark:border-gray-600 mobile-touch-target min-h-[88px]"
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="special-requirements" className="dark:text-gray-200 text-sm">{t('specialRequirements')}</Label>
              <Textarea
                id="special-requirements"
                placeholder={t('anySpecialRequirements')}
                value={ambulanceRequest.specialRequirements}
                onChange={(e) => onAmbulanceRequestChange({...ambulanceRequest, specialRequirements: e.target.value})}
                className="dark:bg-gray-700 dark:border-gray-600 mobile-touch-target min-h-[66px]"
                rows={2}
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
                {t('cancel')}
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-blue-600 hover:bg-blue-700 mobile-touch-target min-h-[44px]"
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner size="sm" /> : t('submit')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AmbulanceRequestForm;
