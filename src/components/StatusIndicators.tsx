
import React from 'react';

interface StatusIndicatorsProps {
  isOnline: boolean;
  pendingOperations: number;
  wsConnected: boolean;
}

const StatusIndicators = ({ isOnline, pendingOperations, wsConnected }: StatusIndicatorsProps) => {
  return (
    <>
      {/* Offline indicator */}
      {!isOnline && (
        <div className="bg-orange-600 text-white text-center py-2 text-sm">
          ⚠️ You're offline. {pendingOperations} operations pending sync.
        </div>
      )}
      
      {/* WebSocket status */}
      {!wsConnected && isOnline && (
        <div className="bg-blue-600 text-white text-center py-1 text-xs">
          📡 Connecting to live updates...
        </div>
      )}
    </>
  );
};

export default StatusIndicators;
