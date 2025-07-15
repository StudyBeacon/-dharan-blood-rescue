
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Truck, Plus } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface EmergencyActionsProps {
  onBloodRequest: () => void;
  onAmbulanceRequest: () => void;
  isLoading: boolean;
}

const EmergencyActions = ({ onBloodRequest, onAmbulanceRequest, isLoading }: EmergencyActionsProps) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
      <Card className="border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800 hover:shadow-lg transition-all duration-300 hover-scale">
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center space-x-2 text-red-700 dark:text-red-300 text-lg sm:text-xl">
            <Heart className="h-5 w-5 sm:h-6 sm:w-6 fill-current animate-pulse" />
            <span>{t('requestBlood')}</span>
          </CardTitle>
          <CardDescription className="dark:text-red-200 text-sm sm:text-base">
            {t('bloodRequestDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Button 
            onClick={onBloodRequest}
            className="w-full mobile-touch-target bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 transition-colors text-sm sm:text-base min-h-[44px]"
            disabled={isLoading}
          >
            <Plus className="h-4 w-4 mr-2" />
            {t('requestBlood')}
          </Button>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800 hover:shadow-lg transition-all duration-300 hover-scale">
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center space-x-2 text-blue-700 dark:text-blue-300 text-lg sm:text-xl">
            <Truck className="h-5 w-5 sm:h-6 sm:w-6" />
            <span>{t('requestAmbulance')}</span>
          </CardTitle>
          <CardDescription className="dark:text-blue-200 text-sm sm:text-base">
            {t('ambulanceRequestDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Button 
            onClick={onAmbulanceRequest}
            className="w-full mobile-touch-target bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors text-sm sm:text-base min-h-[44px]"
            disabled={isLoading}
          >
            <Plus className="h-4 w-4 mr-2" />
            {t('requestAmbulance')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyActions;
