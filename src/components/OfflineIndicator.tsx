import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineMessage(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const retryConnection = () => {
    // Force a network check
    fetch('/favicon.ico', { method: 'HEAD', cache: 'no-cache' })
      .then(() => {
        setIsOnline(true);
        setShowOfflineMessage(false);
      })
      .catch(() => {
        setIsOnline(false);
      });
  };

  if (!showOfflineMessage && isOnline) {
    return null;
  }

  return (
    <>
      {/* Status indicator in header */}
      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
        isOnline ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
        <span>{isOnline ? 'Online' : 'Offline'}</span>
      </div>

      {/* Offline banner */}
      {!isOnline && (
        <div className="fixed top-16 left-0 right-0 bg-red-600 text-white p-3 z-50">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <WifiOff className="w-5 h-5" />
              <span className="font-medium">You're offline</span>
              <span className="text-red-200">Some features may be limited</span>
            </div>
            <button
              onClick={retryConnection}
              className="flex items-center space-x-1 px-3 py-1 bg-red-700 rounded hover:bg-red-800 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}