import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, AlertCircle } from 'lucide-react';

interface VoiceSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function VoiceSearch({ onSearch, placeholder = "Try saying 'Find Dr. Rajesh Kumar' or 'Show available faculty'" }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);
  }, []);

  const startListening = async () => {
    if (!isSupported) return;

    // Clear any previous permission errors
    setPermissionError(null);

    // Check for microphone permission first
    try {
      if (navigator.permissions) {
        const permission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
        if (permission.state === 'denied') {
          setPermissionError('Microphone access is denied. Please enable microphone access in your browser settings.');
          return;
        }
      }
    } catch (error) {
      // Permission API might not be supported, continue with speech recognition
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setPermissionError(null);
    };

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      setTranscript(transcript);

      if (event.results[current].isFinal) {
        onSearch(transcript);
        setTranscript('');
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      
      // Handle specific error types
      switch (event.error) {
        case 'not-allowed':
          setPermissionError('Microphone access is required for voice search. Please click the microphone icon in your browser\'s address bar and allow access.');
          break;
        case 'no-speech':
          setPermissionError('No speech detected. Please try again.');
          break;
        case 'network':
          setPermissionError('Network error occurred. Please check your internet connection.');
          break;
        case 'service-not-allowed':
          setPermissionError('Speech recognition service is not available. Please try again later.');
          break;
        default:
          setPermissionError('An error occurred with voice recognition. Please try again.');
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      setPermissionError('Failed to start voice recognition. Please try again.');
      setIsListening(false);
    }
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const dismissError = () => {
    setPermissionError(null);
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={isListening ? stopListening : startListening}
        className={`p-3 rounded-full transition-all duration-200 ${
          isListening 
            ? 'bg-red-100 text-red-600 animate-pulse' 
            : permissionError
            ? 'bg-orange-100 text-orange-600 hover:bg-orange-200'
            : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
        }`}
        title={isListening ? 'Stop listening' : 'Start voice search'}
      >
        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
      </button>

      {/* Permission Error Message */}
      {permissionError && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-orange-200 p-4 min-w-80 z-10">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-orange-800 mb-1">Microphone Access Required</h4>
              <p className="text-sm text-orange-700 mb-3">{permissionError}</p>
              <div className="flex space-x-2">
                <button
                  onClick={startListening}
                  className="px-3 py-1 bg-orange-600 text-white text-xs rounded hover:bg-orange-700 transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={dismissError}
                  className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Listening State */}
      {isListening && !permissionError && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-64 z-10">
          <div className="flex items-center space-x-2 mb-2">
            <Volume2 className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-900">Listening...</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{placeholder}</p>
          {transcript && (
            <div className="bg-blue-50 rounded p-2">
              <p className="text-sm text-blue-800">{transcript}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}