import React, { useState } from 'react';
import { QrCode, Download, Share2, Copy, Check } from 'lucide-react';

interface QRCodeGeneratorProps {
  url?: string;
  facultyId?: string;
  size?: number;
}

export default function QRCodeGenerator({ url, facultyId, size = 200 }: QRCodeGeneratorProps) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const qrUrl = url || `${window.location.origin}/student${facultyId ? `?faculty=${facultyId}` : ''}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrUrl)}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(qrUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `vit-faculty-tracker-qr${facultyId ? `-${facultyId}` : ''}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareQR = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'VIT Faculty Tracker',
          text: 'Check faculty availability in real-time',
          url: qrUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowQR(!showQR)}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <QrCode className="w-4 h-4" />
        <span>QR Code</span>
      </button>

      {showQR && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-6 z-50 min-w-64">
          <div className="text-center mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">Quick Access QR Code</h3>
            <p className="text-sm text-gray-600">Scan to open faculty tracker</p>
          </div>

          <div className="flex justify-center mb-4">
            <img
              src={qrCodeUrl}
              alt="QR Code for VIT Faculty Tracker"
              className="border border-gray-200 rounded-lg"
              width={size}
              height={size}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs text-gray-500 bg-gray-50 p-2 rounded">
              <span className="truncate flex-1">{qrUrl}</span>
              <button
                onClick={copyToClipboard}
                className="text-blue-600 hover:text-blue-800"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={downloadQR}
                className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
              >
                <Download className="w-3 h-3" />
                <span>Download</span>
              </button>
              <button
                onClick={shareQR}
                className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
              >
                <Share2 className="w-3 h-3" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}