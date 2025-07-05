import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, Truck, Clock, MapPin, Phone, Navigation } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface BloodRequest {
  id: number;
  type: 'blood';
  bloodGroup: string;
  status: string;
  requestedAt: string;
  location: string;
  responses: number;
  urgency: string;
  progress: number;
  unitsNeeded?: string;
  contactPerson?: string;
  contactNumber?: string;
  additionalInfo?: string;
}

interface AmbulanceRequest {
  id: number;
  type: 'ambulance';
  status: string;
  requestedAt: string;
  pickupLocation: string;
  destination: string;
  driverName?: string;
  driverPhone?: string;
  estimatedTime?: string;
  progress: number;
  urgency?: string;
  contactPerson?: string;
  contactNumber?: string;
  patientCondition?: string;
  specialRequirements?: string;
}

type ActiveRequest = BloodRequest | AmbulanceRequest;

interface ActiveRequestsListProps {
  requests: ActiveRequest[];
}

const ActiveRequestsList = ({ requests }: ActiveRequestsListProps) => {
  const { t } = useTranslation();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'en route': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'dispatching': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 dark:text-white text-lg sm:text-xl">
          <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
          <span>{t('activeRequests')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {requests.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="border dark:border-gray-600 rounded-lg p-3 sm:p-4 bg-white dark:bg-gray-700 hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div className="space-y-2 flex-1 min-w-0">
                    <h3 className="font-semibold flex items-center space-x-2 dark:text-white text-sm sm:text-base">
                      {request.type === 'blood' ? (
                        <Heart className="h-4 w-4 text-red-600 fill-current flex-shrink-0" />
                      ) : (
                        <Truck className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      )}
                      <span className="truncate">
                        {request.type === 'blood' ? t('bloodRequest') : t('ambulanceRequest')}
                      </span>
                    </h3>
                    
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        {request.type === 'blood' && (
                          <span className="font-medium text-red-600 dark:text-red-400">{request.bloodGroup}</span>
                        )}
                        <span className="flex items-center space-x-1 min-w-0">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                          <span className="truncate">{request.type === 'blood' ? request.location : request.pickupLocation}</span>
                        </span>
                        <span className="whitespace-nowrap">{request.requestedAt}</span>
                      </div>
                      
                      {request.type === 'ambulance' && request.driverName && (
                        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                          <span><strong>Driver:</strong> {request.driverName}</span>
                          {request.estimatedTime && (
                            <span><strong>ETA:</strong> {request.estimatedTime}</span>
                          )}
                        </div>
                      )}
                      
                      <div className="mt-2">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{t('progress')}:</span>
                          <span className="text-xs sm:text-sm font-medium dark:text-white">{Math.round(request.progress)}%</span>
                        </div>
                        <Progress value={request.progress} className="h-2" />
                      </div>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(request.status)} ml-2 flex-shrink-0 text-xs`}>
                    {request.status}
                  </Badge>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-2 border-t dark:border-gray-600 gap-2">
                  {request.type === 'blood' ? (
                    <>
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        {request.responses} {t('responses')}
                      </span>
                      <Button variant="outline" size="sm" className="dark:border-gray-500 dark:text-gray-300 mobile-touch-target w-full sm:w-auto min-h-[44px] sm:min-h-[36px]">
                        {t('viewResponses')}
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        {request.driverPhone && (
                          <Button variant="outline" size="sm" className="flex items-center justify-center space-x-1 mobile-touch-target min-h-[44px] sm:min-h-[36px]">
                            <Phone className="h-4 w-4" />
                            <span>{t('callDriver')}</span>
                          </Button>
                        )}
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 mobile-touch-target min-h-[44px] sm:min-h-[36px] flex items-center justify-center">
                          <Navigation className="h-4 w-4 mr-1" />
                          {t('trackLive')}
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <p className="text-sm sm:text-base">{t('noActiveRequests')}</p>
            <p className="text-xs sm:text-sm">{t('emergencyRequestsAppear')}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActiveRequestsList;
