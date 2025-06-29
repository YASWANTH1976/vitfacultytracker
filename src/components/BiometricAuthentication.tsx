import React, { useState, useEffect } from 'react';
import { Fingerprint, Eye, Shield, CheckCircle, AlertCircle } from 'lucide-react';

export default function BiometricAuthentication() {
  const [isSupported, setIsSupported] = useState(false);
  const [authMethod, setAuthMethod] = useState<'fingerprint' | 'face' | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authResult, setAuthResult] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    // Check if WebAuthn is supported
    if (window.PublicKeyCredential) {
      setIsSupported(true);
    }
  }, []);

  const authenticateWithBiometric = async (method: 'fingerprint' | 'face') => {
    setIsAuthenticating(true);
    setAuthMethod(method);

    try {
      // Simulate biometric authentication
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real implementation, this would use WebAuthn API
      const credential = await navigator.credentials.create({
        publicKey: {
          challenge: new Uint8Array(32),
          rp: { name: "VIT Faculty System" },
          user: {
            id: new Uint8Array(16),
            name: "faculty@vit.ac.in",
            displayName: "Faculty Member"
          },
          pubKeyCredParams: [{ alg: -7, type: "public-key" }],
          authenticatorSelection: {
            authenticatorAttachment: method === 'fingerprint' ? 'platform' : 'cross-platform',
            userVerification: 'required'
          }
        }
      });

      setAuthResult('success');
    } catch (error) {
      setAuthResult('error');
    } finally {
      setIsAuthenticating(false);
    }
  };

  if (!isSupported) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-yellow-600" />
          <span className="text-yellow-800">Biometric authentication not supported on this device</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Shield className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Biometric Authentication</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => authenticateWithBiometric('fingerprint')}
          disabled={isAuthenticating}
          className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors disabled:opacity-50"
        >
          <Fingerprint className="w-8 h-8 text-blue-600 mb-2" />
          <span className="font-medium text-gray-900">Fingerprint</span>
          <span className="text-sm text-gray-600">Touch sensor</span>
        </button>

        <button
          onClick={() => authenticateWithBiometric('face')}
          disabled={isAuthenticating}
          className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors disabled:opacity-50"
        >
          <Eye className="w-8 h-8 text-blue-600 mb-2" />
          <span className="font-medium text-gray-900">Face ID</span>
          <span className="text-sm text-gray-600">Look at camera</span>
        </button>
      </div>

      {isAuthenticating && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center space-x-2 text-blue-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span>Authenticating with {authMethod}...</span>
          </div>
        </div>
      )}

      {authResult === 'success' && (
        <div className="mt-4 flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
          <CheckCircle className="w-5 h-5" />
          <span>Authentication successful!</span>
        </div>
      )}

      {authResult === 'error' && (
        <div className="mt-4 flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <span>Authentication failed. Please try again.</span>
        </div>
      )}
    </div>
  );
}