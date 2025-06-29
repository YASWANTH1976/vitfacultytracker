import React, { useState, useRef, useEffect } from 'react';
import { Navigation, Camera, MapPin, Route, Compass } from 'lucide-react';

export default function ARCampusNavigation() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isARActive, setIsARActive] = useState(false);
  const [destination, setDestination] = useState('');
  const [directions, setDirections] = useState<string[]>([]);

  const startAR = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsARActive(true);
        
        // Simulate AR overlay rendering
        renderAROverlay();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopAR = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
    setIsARActive(false);
  };

  const renderAROverlay = () => {
    // Simulate AR navigation overlay
    setDirections([
      'Walk straight for 50 meters',
      'Turn right at the main building',
      'Faculty cabin TT-101 will be on your left'
    ]);
  };

  const navigateToFaculty = (facultyLocation: string) => {
    setDestination(facultyLocation);
    if (isARActive) {
      renderAROverlay();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Navigation className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">AR Campus Navigation</h3>
        </div>
        <button
          onClick={isARActive ? stopAR : startAR}
          className={`px-4 py-2 rounded-lg transition-colors ${
            isARActive 
              ? 'bg-red-600 text-white hover:bg-red-700' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <Camera className="w-4 h-4 inline mr-2" />
          {isARActive ? 'Stop AR' : 'Start AR Navigation'}
        </button>
      </div>

      {isARActive ? (
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-64 bg-black rounded-lg"
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-64 pointer-events-none"
          />
          
          {/* AR Overlay */}
          <div className="absolute top-4 left-4 right-4">
            <div className="bg-black bg-opacity-70 text-white p-3 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Compass className="w-4 h-4" />
                <span className="font-medium">Navigating to: {destination}</span>
              </div>
              <div className="space-y-1">
                {directions.map((direction, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <Route className="w-3 h-3" />
                    <span>{direction}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="font-medium text-gray-900 mb-2">AR Navigation</h4>
          <p className="text-gray-600 mb-4">
            Use your camera to get real-time directions to faculty cabins
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => navigateToFaculty('TT-101')}
              className="flex items-center justify-center space-x-2 p-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              <span>TT-101</span>
            </button>
            <button
              onClick={() => navigateToFaculty('TT-205')}
              className="flex items-center justify-center space-x-2 p-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              <span>TT-205</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}